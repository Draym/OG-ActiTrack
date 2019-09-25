import React, {Component} from 'react';
import TString from "../../../utils/TString";
import PropTypes from 'prop-types';
import {Card, Button, CardHeader, CardBody, Collapse} from "reactstrap/es";

const propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  opened: PropTypes.bool,
  onClick: PropTypes.func
};

const defaultProps = {
  opened: false,
  independent: false
};

class CAccordionItem extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.index);
    }
  }

  render() {
    const {title, text, index, opened} = this.props;
    if (TString.isNull(title))
      return null;
    return (
      <Card className={"mb-0 " + (opened ? "accordion-item_open" : "")}>
        <CardHeader id={"heading" + index}>
          <Button color="muted" className="m-0 p-0 float-left" onClick={this.onClick} aria-expanded={opened}
                  aria-controls={"collapse" + index}>
            <h5 className="m-0 p-0">{title}</h5>
          </Button>
          <Button color="muted" className="m-0 p-0 float-right" onClick={this.onClick} aria-expanded={opened}
                  aria-controls={"collapse" + index}>
            {opened && <i className="icon-arrow-up-circle"/>}
            {!opened && <i className="icon-arrow-down-circle"/>}
          </Button>
        </CardHeader>
        <Collapse isOpen={opened} id={"collapse" + index} aria-labelledby={"heading" + index}>
          <CardBody>
            {text}
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

CAccordionItem.defaultProps = defaultProps;
CAccordionItem.propTypes = propTypes;

export default CAccordionItem;
