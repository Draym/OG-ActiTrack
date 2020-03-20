import React, {Component} from 'react';
import {Button} from "reactstrap";
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number,
  isActive: PropTypes.bool,
  color: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.any,
  onClick: PropTypes.func
};

const defaultProps = {
};

class CButtonGroupItem extends Component {
  constructor(props) {
    super(props);
    if (props.id === undefined) {
      throw new TypeError("CButtonGroupItem should contains an id");
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.id, this.props.value);
    }
  }

  render() {
    const {color, text, isActive} = this.props;
    return (
      <Button className="btn-group-item" color={color}
              onClick={this.onClick}
              active={isActive}>{text}</Button>
    );
  }
}

CButtonGroupItem.defaultProps = defaultProps;
CButtonGroupItem.propTypes = propTypes;

export default CButtonGroupItem;
