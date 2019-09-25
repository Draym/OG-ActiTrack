import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  independent: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  multiple: PropTypes.bool
};

const defaultProps = {
  multiple: false,
  independent: false,
  color: "grey"
};

class CAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(key) {
    let data = this.state;
    if (!this.props.multiple) {
      for (let it in data) {
        if (it !== key) {
          data[it] = false;
        }
      }
    }
    data[key] = data[key] != null && data[key] !== undefined ? !data[key] : true;
    this.setState(data);
  }

  render() {
    const {children, color} = this.props;
    return (
      <div className={"accordion accordion-" + color}>
        {children.map((child, key) => {
          return (
            <div key={key}>
              {React.cloneElement(child, {opened:this.state[key], onClick: this.onClick, index: key})}
            </div>
          )
        })}
      </div>
    );
  }
}

CAccordion.defaultProps = defaultProps;
CAccordion.propTypes = propTypes;

export default CAccordion;
