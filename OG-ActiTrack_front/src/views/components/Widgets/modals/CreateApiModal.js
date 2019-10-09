import React from 'react';
import PropTypes from 'prop-types';
import CComponent from "../../CComponent";
import CModal from "../../CModal";
import HttpUtils from "../../../../utils/api/HttpUtils";

const propTypes = {
  step: PropTypes.number,
  finalStep: PropTypes.number,
  endpoint: PropTypes.string,
  formatData: PropTypes.func,
  isApiParametersValid: PropTypes.func,
  ...CModal.propTypes
};
const defaultProps = {
  modalOn: false,
  // modal parameters
  header: "Object creation",
  submitTitle: "Create",
  //step
  step: 1,
  finalStep: 1
};

class CreateApiModal extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false,
      hasChange: false,
      isLoading: false,
      errorLoading: undefined
    };
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    if (!(typeof this.formatData === "function")
      || !(typeof this.renderForm === "function")
      || !(typeof this.resetData === "function")
      || !(typeof this.isApiParametersValid === "function")) {
      throw new TypeError("Must override these methods.");
    }
    if (!props.endpoint) {
      throw new TypeError("Must provide an endpoint in props.");
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.state.modalOn = nextProps.modalOn;
  }

  /*
   * MODAL
   ***/
  handleModalSubmit() {
    const data = this.formatData();
    console.log("props: ", this.props);
    this.setState({isLoading: true, hasChange: false});
    HttpUtils.POST(process.env.REACT_APP_SERVER_URL, this.props.endpoint, data, function () {
      if (this.props.handleModalSubmit)
        this.props.handleModalSubmit(data);
      this.setState({isLoading: false, modalOn: false});
      this.resetData();
    }.bind(this), function (errorStatus, error) {
      this.setState({isLoading: false, errorLoading: error});
    }.bind(this));
  }

  handleModalClose() {
    this.setState({modalOn: false, userName: '', userLogin: '', userRole: undefined});
    if (this.props.handleModalClose)
      this.props.handleModalClose();
  }

  getStep() {
    if (this.refs.modal)
      return this.refs.modal.state.step;
    return 1;
  }

  render() {
    return (
      <CModal {...this.props} ref="modal" modalOn={this.state.modalOn} size={"lg"} centered
              handleModalSubmit={this.handleModalSubmit} handleModalClose={this.handleModalClose}
              isSubmitReady={!this.isApiParametersValid() || !this.state.hasChange} isLoading={this.state.isLoading}>
        {this.renderForm()}
      </CModal>
    )
  }
}

CreateApiModal.defaultProps = defaultProps;
CreateApiModal.propTypes = propTypes;

export default CreateApiModal;
