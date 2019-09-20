import React, {Component} from 'react';
import {Button} from "reactstrap";

import PropTypes from 'prop-types';

const propTypes = {
  onSelect: PropTypes.func,
  row: PropTypes.object,
  rowIndex: PropTypes.number,
  inactive: PropTypes.bool
};
const defaultProps ={
  inactive: false
};

class CTableSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: this.props.row.isSelected
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const selected = !this.state.isSelected;
    this.props.onSelect(this.props.row, this.props.rowIndex, selected, function() {
      this.setState({isSelected: selected});
    }.bind(this));
  }

  render() {
    return (
      <Button
        className={"pop-btn pop-btn-left table-btn-select " + (this.state.isSelected ? "table-btn-select-active" : "table-btn-select-inactive")}
        disabled={this.props.inactive} onClick={this.onClick}>
        {this.state.isSelected && <i className="icon-check font-1x2"/>}
      </Button>
    )
  }
}

CTableSelection.propTypes = propTypes;
CTableSelection.defaultProps = defaultProps;

export default CTableSelection;
