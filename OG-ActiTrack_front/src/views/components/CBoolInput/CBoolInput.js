import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar} from "reactstrap";

import i18next from 'i18next';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  yes: PropTypes.string,
  no: PropTypes.string
};

const defaultProps = {
  value: false,
  disabled: false,
  yes: i18next.t("vocabulary.yes"),
  no: i18next.t("vocabulary.no")
};

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
    const {disabled, yes, no} = this.props;
    const {selected} = this.state;
    return (
      <ButtonToolbar>
        <ButtonGroup className="mr-3">
          <Button color="outline-secondary" onClick={() => this.toggle(true)}
                  active={selected === true} disabled={disabled}>{yes}</Button>
          <Button color="outline-danger" onClick={() => this.toggle(false)}
                  active={selected === false} disabled={disabled}>{no}</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}

CBoolInput.defaultProps = defaultProps;
CBoolInput.propTypes = propTypes;

export default CBoolInput;
