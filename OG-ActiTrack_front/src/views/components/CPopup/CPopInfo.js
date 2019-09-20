import React from 'react';
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import CPopup from "./CPopup";
import PropTypes from 'prop-types';

import i18next from 'i18next';

const propTypes = {
  // mandatory
  id: PropTypes.string,
  // style
  className: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string
};

const defaultProps = {
};

class CPopInfo extends CPopup {
  render() {
    return (
      <div className={this.props.className}
           ref={node => {
             this.state.parentNode = node;
           }}>
        <button className="btn pop-btn pop-info" id={this.props.id}><i className="icon-info"/></button>
        <Popover placement={this.props.position} isOpen={this.state.popoverOpen} target={this.props.id}
                 toggle={this.handleClick}>
          {this.props.title && <PopoverHeader>{i18next.t(this.props.title)}</PopoverHeader>}
          {this.props.body && <PopoverBody>{i18next.t(this.props.body)}</PopoverBody>}
        </Popover>
      </div>
    );
  }
}

CPopInfo.defaultProps = defaultProps;
CPopInfo.propTypes = propTypes;

export default CPopInfo;
