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
  onEditBtn: PropTypes.func,
  onDeleteBtn: PropTypes.func,
  onSelectedBtn: PropTypes.func, // remember selected rows
  onSelectedBtnRestricted: PropTypes.bool, // non automatic tick change, receive callback to execute if change in onSelectedBtn parameter
  onSelectedBtnInactive: PropTypes.bool, // button disabled
  onSelect: PropTypes.func, // when click on row, current focus
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
  onEditBtn: undefined,
  onDeleteBtn: undefined,
  onSelectedBtn: undefined,
  onSelectedBtnRestricted: false,
  onSelectedBtnInactive: false,
  onSelect: undefined,
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
    this.onSelectedBtn = this.onSelectedBtn.bind(this);

    if (this.props.onSelect) {
      console.log("Add clickable");
      this.state.classes = "table-row-clickable";
    }
    // create controls column
    if (this.props.onDeleteBtn || this.props.onEditBtn) {
      this.state.dataColumns = [...this.props.dataColumns];
      this.state.dataColumns.push({
        dataField: 'actions',
        text: '',
        isDummyField: true,
        csvExport: false,
        formatter: (cell, row, rowIndex) => <CTableControls id={row.id} row={row} rowIndex={rowIndex}
                                                            confirmDelete={this.props.confirmDelete}
                                                            formatter={this.state.formatter}
                                                            onEdit={this.props.onEditBtn ? this.onEditBtn : null}
                                                            onDelete={this.props.onDeleteBtn ? this.onDeleteBtn : null}/>,
        headerAttrs: {width: (this.props.onDeleteBtn && this.props.onEditBtn ? 90 : 60), className: "table-ctrl-head"},
        attrs: {width: (this.props.onDeleteBtn && this.props.onEditBtn ? 90 : 60), className: "table-ctrl-body"}
      });
    }
    // create selection column
    if (this.props.onSelectedBtn) {
      this.state.dataColumns = [...this.props.dataColumns];
      this.state.dataColumns.push({
        dataField: 'actions',
        text: '',
        isDummyField: true,
        csvExport: false,
        formatter: (cell, row, rowIndex) => <CTableSelection id={row.id} row={row} rowIndex={rowIndex}
                                                             restricted={this.props.onSelectedBtnRestricted}
                                                             inactive={this.props.onSelectedBtnInactive}
                                                             onSelect={this.props.onSelectedBtn ? this.onSelectedBtn : null}/>,
        headerAttrs: {width: 60, className: "table-ctrl-head"},
        attrs: {width: 60, className: "table-ctrl-select"}
      });
    }
    // Attach select action to the table
    if (this.props.onSelect && typeof this.props.onSelect === "function") {
      this.state.selectRow = {
        mode: (this.props.multipleSelect ? 'checkbox' : 'radio'),
        classes: 'table-row-focus',
        hideSelectColumn: true,
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
          this.props.onSelect(row, isSelect, rowIndex, e);
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

  onSelectedBtn(row, rowIndex, selected, successCb) {
    if (this.props.onSelectedBtn) {
      row.isSelected = selected;
      let rows = this.state.data;
      rows[rowIndex] = row;
      this.props.onSelectedBtn(rows, row, rowIndex, selected, function () {
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
                          columns={this.state.dataColumns ? this.state.dataColumns : this.props.dataColumns}
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
        {this.props.advertEmpty && (!this.state.data || this.state.data.length === 0) && <CBlockTitle text={this.props.advertEmpty}/>}
      </div>
    )
  }
}

CTable.defaultProps = defaultProps;
CTable.propTypes = propTypes;

export default CTable;
