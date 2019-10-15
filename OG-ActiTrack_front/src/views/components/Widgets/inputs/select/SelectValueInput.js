import React from 'react';
import SelectInput from "./SelectInput";

const propTypes = {
  ...SelectInput.propTypes
};

const defaultProps = {
  ...SelectInput.defaultProps
};

class SelectValueInput extends SelectInput {
  constructor(props) {
    super(props);
    this.loadValueOptions = this.loadValueOptions.bind(this);

    for (let i in props.values) {
      this.state.values.push({label: props.values[i], value: props.values[i]})
    }
    this.setDefaultSelection(this.state.values, true);
  }

  loadValueOptions(inputValue, callback) {
    callback(this.state.values.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    ));
  }
}

SelectValueInput.propTypes = propTypes;
SelectValueInput.defaultProps = defaultProps;

export default SelectValueInput;
