import HttpUtils from "../../../utils/api/HttpUtils";
import CTable from "./CTable";
import PropTypes from 'prop-types';

const propTypes = {
  loadOnStart: PropTypes.bool,
  loading: PropTypes.func,
  endpoint: PropTypes.string,
  parameters: PropTypes.object,
  formatData: PropTypes.func,
  ...CTable.propTypes
};
const defaultProps = {
  loadOnStart: false,
  loading: undefined,
  parameters: undefined,
  endpoint: undefined,
  formatData: undefined,
  ...CTable.defaultProps
};

class CTableData extends CTable {
  constructor(props) {
    super(props);
    this.initializeData = this.initializeData.bind(this);
    this.loadDataAndInitialize = this.loadDataAndInitialize.bind(this);
    this.isLoading = this.isLoading.bind(this);

    if (!this.props.endpoint)
      throw new TypeError("Must provide an API endpoint.");
    if (!this.props.formatData || typeof this.props.formatData !== 'function') {
      throw new TypeError("Must provide a formatData function which take as parameter the data returned by the API and format it as a Table.");
    }
    if (this.props.loadOnStart)
      this.loadDataAndInitialize();
  }

  isLoading(value, error) {
    if (this.props.loading) {
      this.props.loading(value, error);
    }
  }

  initializeData(flatData) {
    let data = this.props.formatData(flatData);
    this.setState({
      data: data
    });
    this.isLoading(false);
  }

  loadDataAndInitialize() {
    this.isLoading(true);
    HttpUtils.GET(null, this.props.endpoint, this.props.parameters, function (data) {
      if (data) {
        this.initializeData(data);
      } else {
        this.isLoading(false, "There is no users.");
      }
    }.bind(this), function (errorStatus, error) {
      this.isLoading(false, error);
    }.bind(this));
  }
}

CTableData.defaultProps = defaultProps;
CTableData.propTypes = propTypes;

export default CTableData;
