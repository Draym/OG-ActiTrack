import React, {Component} from 'react';
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from "reactstrap/es/Button";
import TLogs from "../../../../utils/TLogs";

class CTablePagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationOption: {
        showTotal: false,
        hideSizePerPage: true,
        totalSize: this.props.data.length,
        hidePageListOnlyOnePage: true
      }
    };
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.state.paginationOption.totalSize = nextProps.data.length;
  }

  render() {
    const {data, dataColumns, tableKey, bordered, selectRow, bootstrap4, countPerPage, countRight, onAddBtn, addBtnTitle, classes} = this.props;
    TLogs.p("Props: ", this.props);
    return (
      <PaginationProvider
        pagination={paginationFactory(this.state.paginationOption)}
      >
        {
          ({
             paginationProps,
             paginationTableProps
           }) => (
            <div>
              {countPerPage && <SizePerPageDropdownStandalone
                className={countRight ? "float-right" : "float-left"} {...paginationProps}/>}
              {onAddBtn && <Button color="info" className={"float-right"} onClick={onAddBtn}>{addBtnTitle}</Button>}
              <BootstrapTable keyField={tableKey}
                              classes={classes}
                              bootstrap4={bootstrap4}
                              bordered={bordered}
                              selectRow={selectRow}
                              data={data}
                              columns={dataColumns}
                              {...paginationTableProps}/>
            </div>
          )
        }
      </PaginationProvider>
    )
  }
}


export default CTablePagination;
