import {ApiEndpoint} from "../../../../../utils/api/ApiEndpoint";
import SearchDataInput from "./SearchDataInput";

const propTypes = {
  ...SearchDataInput.propTypes
};

const defaultProps = {
  server: null,
  endpoint: ApiEndpoint.SERVER_PlayerExist,
  title: 'Enter a pseudo :',
  placeHolder: "Enter the exact pseudo",
  gui: {headIcon: "fa fa-user-o"}
};

class SearchPlayerInput extends SearchDataInput {
  constructor(props) {
    super(props);
    this.isApiParameterValid = this.isApiParameterValid.bind(this);
  }

  formatDataForSuggestions(data) {
    let suggestions = [];
    for (let i in data) {
      if (data[i].length === 3) {
        let player = {id: data[i][0], playerRef: data[i][1], playerName: data[i][2]};
        suggestions.push({value: player, label: player.playerName});
      }
    }
    return suggestions;
  }

  isApiParameterValid() {
    return this.state.apiParameter.serverName;
  }

  searchKey() {
    return "playerName";
  }
}

SearchPlayerInput.propTypes = propTypes;
SearchPlayerInput.defaultProps = defaultProps;

export default SearchPlayerInput;
