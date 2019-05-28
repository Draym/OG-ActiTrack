import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class MinimalFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="ml-auto"><a href="http://draymlab.fr" target="draymlab.fr">OG-ActiTrack</a> &copy; 2019 draymlab</span>
      </React.Fragment>
    );
  }
}

MinimalFooter.propTypes = propTypes;
MinimalFooter.defaultProps = defaultProps;

export default MinimalFooter;
