import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {mapToCssModules} from 'reactstrap/lib/utils';
import CBlockTitle from "../CBlockTitle/CBlockTitle";

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  // value
  value: PropTypes.number,
  max: PropTypes.number,
  // style
  drawValue: PropTypes.bool,
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  size: PropTypes.string
};

const defaultProps = {
  size: 'xs',
  value: 0,
  max: 100
};

class CProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, title, value, max, drawValue, animated, striped, size, color, emptyColor} = this.props;
    const percent = (value / max) * 100;
    const blocClasses = mapToCssModules(classNames(className, 'sx-full d-flex'));
    const progressBarClasses = mapToCssModules(classNames('progress-bar-ctn', `progress-${size}`, 'my-auto'));
    const barEmptyClasses = mapToCssModules(classNames('progress-bar-empty', emptyColor ? `bg-${emptyColor}` : "progress-bar-empty-border"));
    const barFullClasses = mapToCssModules(classNames('progress-bar', animated ? 'progress-bar-animated' : null, color ? `bg-${color}` : null, striped || animated ? 'progress-bar-striped' : null));

    return (
      <div className={blocClasses}>
        {title ? <CBlockTitle text={title} small muted/> : null}
        <div
          className={progressBarClasses}
          role="progressbar"
          aria-valuemin="0"
          aria-valuenow={value}
          aria-valuemax={max}>
          <div className={barFullClasses}
               style={{width: `${percent}%`}}/>
          <div className={barEmptyClasses}
               style={{width: `${100 - percent}%`}}/>
        </div>
        {drawValue ? <span className="ml-1 text-muted">{value}%</span> : null}
      </div>
    );
  }
}

CProgressBar.propTypes = propTypes;
CProgressBar.defaultProps = defaultProps;

export default CProgressBar;
