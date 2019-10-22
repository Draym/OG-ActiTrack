import React from 'react';
import CFormInput from "../../../CFormInput";
import CComponent from "../../../CComponent";
import PropTypes from 'prop-types';

const propTypes = {
  //controls
  onChange: PropTypes.func,
  // data
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  // style
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  muted: PropTypes.bool,
  disabled: PropTypes.bool
};

const defaultProps = {
  error: '',
  defaultValue: '',
  inline: false,
  disabled: false
};

class SelectInput extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      selected: props.defaultValue ? {label: props.defaultValue} : undefined,
      errorText: props.error,
      reload: undefined
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.setDefaultSelection = this.setDefaultSelection.bind(this);

    if (!(typeof this.loadValueOptions === "function")) {
      throw new TypeError("Must override loadValueOptions method");
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log("next: " , nextProps);
    if (this.props.errorText !== nextProps.error) {
      this.state.errorText = nextProps.error;
    }
  }

  setDefaultSelection(values, isInit) {
    for (let i in values) {
      if (values[i].label === this.props.defaultValue) {
        if (isInit) {
          this.state.selected = values[i];
        } else {
          this.setState({
            selected: values[i]
          });
        }
        return;
      }
    }
  }

  handleValueChange = selectedOption => {
    if (selectedOption === Object(selectedOption)) {
      this.setState({
        selected: selectedOption, errorText: ''
      });
      this.props.onChange(selectedOption);
    }
  };

  render() {
    const {className, inline, muted, gui, disabled, title, placeHolder} = this.props;
    const {selected, errorText, reload, values} = this.state;
    return (
      <div className={className}>
        <CFormInput className="input-body" gui={gui}
                    type="text"
                    title={title}
                    inline={inline}
                    muted={muted}
                    disabled={disabled}
                    placeHolder={placeHolder}
                    value={selected} error={errorText}
                    hackReload={reload}
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

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

export default SelectInput;
