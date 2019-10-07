import React from 'react';

import HttpUtils from "../../../../../utils/api/HttpUtils";
import CFormInput from "../../../CFormInput";
import CComponent from "../../../CComponent";
import PropTypes from 'prop-types';

const propTypes = {
  //controls
  onChange: PropTypes.func,
  // data
  values: PropTypes.array,
  selected: PropTypes.string,
  // style
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  muted: PropTypes.bool
};

const defaultProps = {
  selected: '',
  values: [],
  inline: false,
  nullable: false
};

class SelectValueInput extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      selected: props.selected,
      errorValue: ''
    };
    for (let i in props.values) {
      this.state.values.push({label: props.values[i], value: props.values[i]})
    }
    this.handleValueChange = this.handleValueChange.bind(this);
    this.loadValueOptions = this.loadValueOptions.bind(this);
  }

  loadValueOptions(inputValue, callback) {
    callback(this.state.values.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    ));
  }

  handleValueChange = selectedOption => {
    if (selectedOption === Object(selectedOption)) {
      this.setState({
        selected: selectedOption.label, errorValue: ''
      });
      this.props.onChange(selectedOption);
    }
  };

  render() {
    const {className, inline, muted, gui, title, placeHolder} = this.props;
    const {selected, errorValue, values} = this.state;

    return (
      <div className={className}>
        <CFormInput className="input-body" gui={gui}
                    type="text"
                    title={title}
                    inline={inline}
                    muted={muted}
                    placeHolder={placeHolder}
                    value={selected} error={errorValue}
                    autoComplete={{
                      options: values,
                      handleSelectChange: this.handleValueChange,
                      handleInputChange: this.handleValueChange,
                      loadOptions: this.loadValueOptions
                    }}/>
      </div>
    );
  }
}

SelectValueInput.defaultProps = defaultProps;
SelectValueInput.propTypes = propTypes;

export default SelectValueInput;
