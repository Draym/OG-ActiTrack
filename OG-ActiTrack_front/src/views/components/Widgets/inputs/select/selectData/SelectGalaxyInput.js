import SelectDataInput from "../SelectDataInput";
import {ApiEndpoint} from "../../../../../../utils/api/ApiEndpoint";

const propTypes = {
  ...SelectDataInput.propTypes
};

const defaultProps = {
  server: process.env.REACT_APP_SERVER_URL,
  endpoint: ApiEndpoint.SERVER_Galaxy_Available,
  title: 'Select the desired Ogame galaxy :',
  placeHolder: "Select a galaxy..",
  gui: {headIcon: "icon-map"}
};

class SelectGalaxyInput extends SelectDataInput {
  constructor(props) {
    super(props);
    this.isApiParameterValid = this.isApiParameterValid.bind(this);
  }

  formatDataForSelection(data) {
    let values = [];
    for (let i in data) {
      values.push({value: data[i], label: "Galaxy G" + data[i]});
    }
    return values;
  }

  isApiParameterValid() {
    return this.state.apiParameter.serverName;
  }
}

export default SelectGalaxyInput;
