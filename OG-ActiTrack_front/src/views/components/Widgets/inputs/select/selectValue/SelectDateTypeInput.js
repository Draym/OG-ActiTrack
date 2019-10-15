import SelectValueInput from "../SelectValueInput";

const propTypes = {
  ...SelectValueInput.propTypes
};

const defaultProps = {
  values: ["MINUTE", "DAY", "WEEK", "MONTH", "YEAR"]
};

class SelectDateTypeInput extends SelectValueInput {
}

SelectDateTypeInput.defaultProps = defaultProps;
SelectDateTypeInput.propTypes = propTypes;

export default SelectDateTypeInput;
