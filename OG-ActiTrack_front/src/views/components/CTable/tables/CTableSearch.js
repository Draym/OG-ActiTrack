import React, {Component} from 'react';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from "reactstrap/es/Button";

class CTableSearch extends Component {

  render() {
    const {SearchBar} = Search;
    const {searchKey, searchTitle, data, dataColumns, tableKey, bordered, selectRow, bootstrap4, onAddBtn, addBtnTitle, classes} = this.props;
    return (
      <ToolkitProvider
        key={data.length}
        keyField={searchKey}
        data={data}
        columns={dataColumns}
        search
      >
        {
          props => (
            <div>
              <div className={this.props.searchRight ? "float-right" : "float-left"}>
                <span>{searchTitle} : </span>
                <SearchBar {...props.searchProps} />
              </div>
              {onAddBtn && <Button color="info" className={"float-right"} onClick={onAddBtn}>{addBtnTitle}</Button>}
              <BootstrapTable keyField={tableKey}
                              classes={classes}
                              bootstrap4={bootstrap4}
                              bordered={bordered}
                              selectRow={selectRow}
                              {...props.baseProps}/>
            </div>
          )
        }
      </ToolkitProvider>
    )
  }
}


export default CTableSearch;
