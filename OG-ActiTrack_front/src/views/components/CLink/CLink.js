import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  goTo: PropTypes.string,
  shift: PropTypes.bool,
  external: PropTypes.bool,
  button: PropTypes.bool
};

const defaultProps = {
  button: false,
  shift: false,
  external: false
};

class CLink extends Component {
  constructor(props) {
    super(props);
    console.log("clink", props)
    this.goTo = this.goTo.bind(this);
  }

  goTo(e) {
    e.preventDefault();
    if (this.props.external) {
      window.open(this.props.goTo, "_blank")
    } else {
      this.props.history.push(this.props.goTo);
    }
  }

  render() {
    const {children, className, button, shift} = this.props;
    return (
      <a href="#0" className={[className, shift ? " ml-sm-1 ml-md-1" : "", button ? " btn-link" : ""].join(" ")} onClick={this.goTo}>{children}</a>
    );
  }
}

CLink.propTypes = propTypes;
CLink.defaultProps = defaultProps;

export default  withRouter(CLink);
