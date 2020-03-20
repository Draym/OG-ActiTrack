import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import CTableSearchPagination from "./tables/CTableSearchPagination";
import CTableSearch from "./tables/CTableSearch";
import CTablePagination from "./tables/CTablePagination";
import CComponent from "../CComponent";
import CTableControls from "./controls/CTableControls";
import PropTypes from 'prop-types';
import Button from "reactstrap/es/Button";
import CTableSelection from "./controls/CTableSelection";
import CBlockTitle from "../CBlockTitle/CBlockTitle";
import TLogs from "../../../utils/TLogs";

const propTypes = {
  // search
  hasSearch: PropTypes.bool,
  searchKey: PropTypes.string,
  searchTitle: PropTypes.string,
  searchRight: PropTypes.bool,
  // pagination
  hasPagination: PropTypes.bool,
  countPerPage: PropTypes.number,
  countRight: PropTypes.bool,
  // controls
  addBtnTitle: PropTypes.string,
  onAddBtn: PropTypes.func,
  onDetailBtn: PropTypes.func,
  onLaunchBtn: PropTypes.func,
  onEditBtn: PropTypes.func,
  onDeleteBtn: PropTypes.func,
  colControlsTitle: PropTypes.string,
  onSelectionBtn: PropTypes.func, // remember selected rows
  colSelectionTitle: PropTypes.string, //title of the selection column
  onSelectionBtnRestricted: PropTypes.bool, // non automatic tick change, receive callback to execute if change in onSelectionBtn parameter
  onSelectionBtnInactive: PropTypes.bool, // button disabled
  onSelectRow: PropTypes.func, // when click on row, current focus
  multipleSelect: PropTypes.bool,
  confirmDelete: PropTypes.bool,
  //style
  title: PropTypes.string,
  advertEmpty: PropTypes.string,
  bordered: PropTypes.bool,
  formatter: PropTypes.func,
  bootstrap4: PropTypes.bool,
  className: PropTypes.string,
  // mandatory
  tableKey: PropTypes.string,
  data: PropTypes.array,
  dataColumns: PropTypes.array
};
const defaultProps = {
  // search
  hasSearch: false,
  searchKey: 'id',
  searchTitle: 'Search',
  searchRight: false,
  // pagination
  hasPagination: false,
  countPerPage: undefined,
  countRight: false,
  // controls
  addBtnTitle: 'New value',
  onAddBtn: undefined,
  onLaunchBtn: undefined,
  onDetailBtn: undefined,
  onEditBtn: undefined,
  onDeleteBtn: undefined,
  colControlsTitle: '',
  onSelectionBtn: undefined,
  colSelectionTitle: '',
  onSelectionBtnRestricted: false,
  onSelectionBtnInactive: false,
  onSelectRow: undefined,
  multipleSelect: false,
  confirmDelete: false,
  //style
  title: undefined,
  advertEmpty: "There is no data.",
  bordered: false,
  bootstrap4: true,
  formatter: undefined,
  className: '',
  // mandatory
  tableKey: 'id',
  data: [],
  dataColumns: []
};

class CTable extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      formatter: this.props.formatter ? this.props.formatter : (row) => {
        return row ? row[this.props.tableKey] : null
      }
    };
    this.onDeleteBtn = this.onDeleteBtn.bind(this);
    this.onEditBtn = this.onEditBtn.bind(this);
    this.onSelectionBtn = this.onSelectionBtn.bind(this);

    if (this.props.onSelectRow) {
      TLogs.p("Add clickable");
      this.state.classes = "table-row-clickable";
    }
    this.state.dataColumns = [...this.props.dataColumns];
    // create controls column
    if (this.props.onDeleteBtn || this.props.onEditBtn || this.props.onLaunchBtn || this.props.onDetailBtn) {
      let width = 60;
      if (this.props.onDeleteBtn) width += 25;
      if (this.props.onEditBtn) width += 25;
      if (this.props.onLaunchBtn) width += 25;
      if (this.props.onDetailBtn) width += 25;
      this.state.dataColumns.push({
        dataField: 'controls',
        text: this.props.colControlsTitle,
        isDummyField: true,
        csvExport: false,
        formatter: (cell, row, rowIndex) => <CTableControls id={row.id} row={row} rowIndex={rowIndex}
                                                            confirmDelete={this.props.confirmDelete}
                                                            formatter={this.state.formatter}
                                                            onLaunch={this.props.onLaunchBtn}
                                                            onDetail={this.props.onDetailBtn}
                                                            onEdit={this.props.onEditBtn}
                                                            onDelete={this.props.onDeleteBtn}/>,
        headerAttrs: this.props.colControlsTitle ? {width: width} : {width: width, className: "table-ctrl-head"},
        attrs: {className: "table-ctrl-body"}
      });
    }
    // create selection column
    if (this.props.onSelectionBtn) {
      this.state.dataColumns.push({
        dataField: 'actions',
        text: this.props.colSelectionTitle,
        isDummyField: true,
        csvExport: false,
        formatter: (cell, row, rowIndex) => <CTableSelection id={row.id} row={row} rowIndex={rowIndex}
                                                             restricted={this.props.onSelectionBtnRestricted}
                                                             inactive={this.props.onSelectionBtnInactive}
                                                             onSelectRow={this.props.onSelectionBtn ? this.onSelectionBtn : null}/>,
        headerAttrs: this.props.colSelectionTitle ? {width: 100} : {width: 60, className: "table-ctrl-head"},
        attrs: {className: "table-ctrl-select"}
      });
    }
    // Attach select action to the table
    if (this.props.onSelectRow && typeof this.props.onSelectRow === "function") {
      this.state.selectRow = {
        mode: (this.props.multipleSelect ? 'checkbox' : 'radio'),
        classes: 'table-row-focus',
        hideSelectColumn: true,
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
          this.props.onSelectRow(row, isSelect, rowIndex, e);
        }
      };
    }
  }

  updateRow(row, index) {
    if (this.state.data.length < index)
      return;
    let rows = this.state.data;
    rows[index] = row;
    this.setState({data: rows, key: JSON.stringify(row)});
  }

  onSelectionBtn(row, rowIndex, selected, successCb) {
    if (this.props.onSelectionBtn) {
      row.isSelected = selected;
      let rows = this.state.data;
      rows[rowIndex] = row;
      this.props.onSelectionBtn(rows, row, rowIndex, selected, function () {
        this.setState({data: rows});
        if (successCb)
          successCb();
      }.bind(this));
    }
  }

  onDeleteBtn(row, rowIndex) {
    if (this.props.onDeleteBtn) {
      this.props.onDeleteBtn(row, rowIndex, function () {
        let data = this.state.data;
        data.splice(rowIndex, 1);
        this.setState({data: data});
      }.bind(this));
    }
  }

  onEditBtn(row, rowIndex) {
    if (this.props.onEditBtn) {
      this.props.onEditBtn(row, rowIndex);
    }
  }

  render() {
    let drawBasicTable = function () {
      return (
        <div>
          {this.props.onAddBtn && <Button color="info" className={"float-right"}
                                          onClick={this.props.onAddBtn}>{this.props.addBtnTitle}</Button>}
          <BootstrapTable keyField={this.props.tableKey}
                          classes={this.state.classes}
                          columns={this.state.dataColumns}
                          {...this.props}
                          {...this.state}/>
        </div>
      );
    }.bind(this);
    let drawTable = function () {
      if (this.props.hasSearch && this.props.hasPagination) {
        return <CTableSearchPagination {...this.props} {...this.state}/>;
      } else if (this.props.hasSearch) {
        return <CTableSearch {...this.props} {...this.state}/>;
      } else if (this.props.hasPagination) {
        return <CTablePagination {...this.props} {...this.state}/>;
      } else {
        return drawBasicTable();
      }
    }.bind(this);
    return (
      <div>
        {this.state.data && this.state.data.length > 0 && drawTable()}
        {this.props.advertEmpty && (!this.state.data || this.state.data.length === 0) &&
        <CBlockTitle text={this.props.advertEmpty}/>}
      </div>
    )
  }
}

CTable.defaultProps = defaultProps;
CTable.propTypes = propTypes;

export default CTable;
