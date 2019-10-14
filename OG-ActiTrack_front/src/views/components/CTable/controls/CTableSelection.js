import React, {Component} from 'react';
import {Button} from "reactstrap";

import PropTypes from 'prop-types';

const propTypes = {
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  rowIndex: PropTypes.number,
  inactive: PropTypes.bool,
  restricted: PropTypes.bool
};
const defaultProps ={
  inactive: false
};

class CTableSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: this.props.row.isSelected,
      isUnmount: false
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillUnmount() {
    this.state.isUnmount = true;
  }

  onClick() {
    const selected = !this.state.isSelected;
    if (!this.props.restricted) {
      this.setState({isSelected: selected});
      this.props.onSelectRow(this.props.row, this.props.rowIndex, selected);
    } else {
      this.props.onSelectRow(this.props.row, this.props.rowIndex, selected, function () {
        if (!this.state.isUnmount) {
          this.setState({isSelected: selected});
        }
      }.bind(this));
    }
  }

  render() {
    return (
      <Button
        className={"pop-btn pop-btn-left table-btn-select " + (this.state.isSelected ? "table-btn-select-active" : "table-btn-select-inactive")}
        disabled={this.props.inactive} onClick={this.onClick}>
        {this.state.isSelected && <i className="icon-check font-md"/>}
      </Button>
    )
  }
}

CTableSelection.propTypes = propTypes;
CTableSelection.defaultProps = defaultProps;

export default CTableSelection;
