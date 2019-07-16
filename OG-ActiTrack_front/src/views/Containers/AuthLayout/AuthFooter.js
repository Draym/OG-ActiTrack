import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AuthFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="ml-auto"><a href="http://draymlab.fr" target="draymlab.fr">OG-ActiTrack</a> &copy; 2019 draymlab</span>
      </React.Fragment>
    );
  }
}

AuthFooter.propTypes = propTypes;
AuthFooter.defaultProps = defaultProps;

export default AuthFooter;
