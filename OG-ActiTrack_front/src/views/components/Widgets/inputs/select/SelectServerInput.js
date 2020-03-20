import SelectDataInput from "./SelectDataInput";
import {ApiEndpoint} from "../../../../../utils/api/ApiEndpoint";

const propTypes = {
  ...SelectDataInput.propTypes
};

const defaultProps = {
  server: null,
  endpoint: ApiEndpoint.SERVER_Available,
  title: 'Select the desired Ogame server :',
  placeHolder: "Select a server",
  gui: {headIcon: "fa fa-server"},
  apiParameter: null
};

class SelectServerInput extends SelectDataInput {
  constructor(props) {
    super(props);
    this.isApiParameterValid = this.isApiParameterValid.bind(this);
  }

  formatDataForSelection(data) {
    let values = [];
    for (let i in data) {
      values.push({value: data[i].server, label: data[i].server});
    }
    return values;
  }

  isApiParameterValid() {
    return true;
  }
}

SelectServerInput.defaultProps = defaultProps;

export default SelectServerInput;
