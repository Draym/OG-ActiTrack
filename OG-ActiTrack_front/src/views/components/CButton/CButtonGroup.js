import React, {Component} from 'react';
import {ButtonToolbar} from "reactstrap";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TChildControl from "../../../utils/TChildControl";

const propTypes = {
  className: PropTypes.string,
  defaultBtn: PropTypes.number, //btn id
  onClick: PropTypes.func,
  color: PropTypes.string
};

const defaultProps = {
  color: "outline-primary"
};

class CButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultBtn
    };
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick(id, value) {
    this.setState({selected: id});
    if (this.props.onClick) {
      this.props.onClick(value);
    }
  }

  render() {
    const {selected} = this.state;
    const {className, children, color} = this.props;
    return (
      <ButtonToolbar className={classNames("btn-group-ctn", className)}>
          {React.Children.map(children, child => {
            if (!TChildControl.validate(child, "CButtonGroup", "CButtonGroupItem")) {
              return null;
            }
            return React.cloneElement(child, {isActive: child.props.id === selected, onClick: this.onBtnClick, color: color});
          })}
      </ButtonToolbar>
    );
  }
}

CButtonGroup.defaultProps = defaultProps;
CButtonGroup.propTypes = propTypes;

export default CButtonGroup;
