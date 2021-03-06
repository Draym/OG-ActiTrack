import React, {Component} from 'react';
import {Row, Col, Card, CardBody, CardFooter, Progress} from 'reactstrap';
import classNames from 'classnames';
import {mapToCssModules} from 'reactstrap/lib/utils';
import PropTypes from 'prop-types';

const propTypes = {
  // content
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  body: PropTypes.string,
  subline: PropTypes.string,
  footer: PropTypes.any, // string or true
  // icon
  icon: PropTypes.string,
  iconLeft: PropTypes.bool,
  iconHead: PropTypes.bool,
  iconInline: PropTypes.bool,
  iconColor: PropTypes.string,
  // slider
  sliderColor: PropTypes.string,
  sliderValue: PropTypes.number,
  sliderBottom: PropTypes.bool,
  // style
  cssModule: PropTypes.object,
  color: PropTypes.string, // bootstrap code color (primary, info ...) or custom
  invert: PropTypes.bool,
  link: PropTypes.string,
  bodyClass: PropTypes.string,
  cardClass: PropTypes.string
};


const defaultProps = {
  title: null,
  body: null,
  subline: null,
  footer: null,

  icon: null,
  iconLeft: false,
  iconHead: false,
  iconInline: false,
  iconColor: null,

  sliderValue: null,
  sliderBottom: false,

  color: 'info',
  invert: false,

  link: null
};

class CSticker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {bodyClass, cardClass, cssModule, title, body, subline, footer, icon, iconLeft, iconHead, iconInline, iconColor, color, invert,
      sliderColor, sliderValue, sliderBottom, link, children, ...attributes} = this.props;

    const iconRight = !iconLeft;
    const progress = {style: '', color: sliderColor, value: sliderValue};
    const card = {style: '', bgColor: '', icon: icon};
    const legend = footer && typeof footer === 'string' ? {text: footer} : {text: 'View More'};
    let padding = {card: 'pb-0'};
    let lead = {style: "h4 mb-0", color: color, position: iconRight ? "text-left" : "text-right"};

    if (link) {
      if (footer) {
        legend.link = {href: link};
      } else {
        card.link = {href: link};
      }
    }

    if (iconHead) {
      card.style += ' clearfix';
      padding = {card: 'p-0', icon: 'p-4 px-5', lead: 'pt-3'};
      lead = {style: 'h5 mb-0'};
      lead.position = iconRight ? "text-right" : "text-left";
    }
    lead.classes = classNames(lead.style, (invert ? null : `text-${color}`), padding.lead);

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style += ' text-white';
      card.bgColor = `bg-${color}`;
    }
    const finalCardClass = mapToCssModules(classNames(cardClass, card.bgColor));
    const finalBodyClass = mapToCssModules(classNames(bodyClass, card.style, padding.card, "position-rel"), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);

    const drawBlockIcon = function (icon) {
      let elemClass;
      let iconClass;
      if (iconHead) {
        elemClass = '';
        iconClass = classNames(icon, `text-${iconColor}`, `bg-${color}`, padding.icon, 'font-2xl', iconRight ? "float-right ml-3" : "float-left mr-3");
      } else {
        const position = (iconRight ? (iconInline ? "float-right" : "text-right") : (iconInline ? "float-left" : "text-left"));
        elemClass = classNames("h1 text-muted mb-2", position);
        iconClass = classNames(icon, `text-${iconColor}`);
      }
      return (<div className={elemClass}>
        <i className={iconClass}/>
      </div>);
    };

    const drawCardFooter = function () {
      if (footer) {
        return (
          <CardFooter className="px-3 py-2">
            <a className="font-weight-bold font-xs btn-block text-muted" {...footer.link}> {legend.text}
              <i className="fa fa-angle-right float-right font-lg"/>
            </a>
          </CardFooter>
        );
      }
    };
    const drawSubLine = function () {
      if (subline) {
        return (
          <Row className={children ? "" : "fixed-ab-bottom"}>
            <Col className="pb-2">
              <small className="text-muted">{subline}</small>
            </Col>
          </Row>
        );
      }
    };
    const drawSlider = function () {
      if (sliderValue) {
        return (
          <Row className="my-auto">
            <Col className="pb-2">
              <Progress className={progress.style} color={progress.color} value={progress.value}/>
            </Col>
          </Row>
        );
      }
    };
    const drawChildren = function () {
      if (children) {
        return (
          <Row className="my-auto">
            <Col>
              {children}
            </Col>
          </Row>
        );
      }
    };
    return (
      <Card className={finalCardClass}>
        <CardBody className={finalBodyClass} {...attributes}>
          <Row>
            <Col className="pb-2">
              {drawBlockIcon(card.icon)}
              <div className={lead.position}>
                <div className={lead.classes}>{this.props.title}</div>
                <small className="text-muted text-uppercase font-weight-bold">{this.props.body}</small>
              </div>
            </Col>
          </Row>
          {sliderBottom ? null : drawSlider()}
          {drawChildren()}
          {sliderBottom ? drawSlider() : null}
          {drawSubLine()}
        </CardBody>
        {drawCardFooter()}
      </Card>
    );
  }
}

CSticker.propTypes = propTypes;
CSticker.defaultProps = defaultProps;

export default CSticker;
