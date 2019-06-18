import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CLanguageCtrl from "../../Components/CLanguageCtrl";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="ml-auto"><a href="http://draymlab.fr" target="draymlab.fr">OG-ActiTrack</a> &copy; 2019 draymlab</span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
