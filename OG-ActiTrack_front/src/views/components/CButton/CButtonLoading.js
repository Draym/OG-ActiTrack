import React, {Component} from 'react';
import {Button} from "reactstrap";

import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  ...Button.propTypes
};

const defaultProps = {
  loading: false,
  text: undefined,
  loadingText: "Loading.."
};

class CButtonLoading extends Component {

  render() {
    const {text, loading, loadingText, disabled, ...attributes} = this.props;
    return (
      <Button type="submit" {...attributes} disabled={loading || disabled}>
        {!loading && <span>{text}</span>}
        {loading && <span>{loadingText}</span>}
        {loading && <i className="fa fa-refresh fa-spin" style={{marginLeft: 10 + 'px'}}/>}
      </Button>
    );
  }
}

CButtonLoading.defaultProps = defaultProps;
CButtonLoading.propTypes = propTypes;

export default CButtonLoading;
