import React from 'react';
import PropTypes from 'prop-types';
import CTitle from "../../CTitle";
import CComponent from "../../CComponent";
import CModal from "../../CModal";

const propTypes = {
  // modal controls
  modalOn: PropTypes.bool,
  handleModalClose: PropTypes.func,
  handleModalSubmit: PropTypes.func,
  // modal attributes
  data: PropTypes.string
};
const defaultProps = {
  modalOn: undefined,
  handleModalClose: undefined,
  handleModalSubmit: undefined,
  // modal parameters
  header: "Delete confirmation",
  submitTitle: "Delete"
};

class DeleteModal extends CComponent {

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.data) {
      this.state.title = "Are you sure to delete " + (nextProps.data ? nextProps.data : "this element") + "?";
    }
  }

  render() {
    return (
      <CModal {...this.props} {...this.state}>
        <CTitle title={this.state.title}/>
      </CModal>
    )
  }
}

DeleteModal.defaultProps = defaultProps;
DeleteModal.propTypes = propTypes;

export default DeleteModal;
