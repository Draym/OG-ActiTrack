import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar} from "reactstrap";

import i18next from 'i18next';

class CBoolInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.value
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(value) {
    if (this.props.disabled)
      return;
    this.setState({
      selected: value
    });
    this.props.onChange(value);
  }

  render() {
    return (
      <ButtonToolbar>
        <ButtonGroup className="mr-3">
          <Button color="outline-secondary" onClick={() => this.toggle(true)}
                  active={this.state.selected === true} disabled={this.props.disabled}>{i18next.t("vocabulary.yes")}</Button>
          <Button color="outline-danger" onClick={() => this.toggle(false)}
                  active={this.state.selected === false} disabled={this.props.disabled}>{i18next.t("vocabulary.no")}</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}

export default CBoolInput;
