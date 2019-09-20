import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CComponent from "../CComponent";
import CButtonLoading from "../CButton/CButtonLoading";

const propTypes = {
  // mandatory
  modalOn: PropTypes.bool,
  // controls
  handleModalClose: PropTypes.func,
  handleModalSubmit: PropTypes.func,
  // submit
  isSubmitReady: PropTypes.bool,
  isLoading : PropTypes.bool,
  submitTitle: PropTypes.string,
  // close
  close: PropTypes.bool,
  closeTitle: PropTypes.string,
  // style
  header: PropTypes.string,
  centered: PropTypes.bool,
  size: PropTypes.string
};
const defaultProps = {
  // mandatory
  modalOn: false,
  // controls
  handleModalClose: undefined,
  handleModalSubmit: undefined,
  // submit
  isSubmitReady: true,
  isLoading : false,
  submitTitle: "Submit",
  // close
  close: false,
  closeTitle: "Close",
  // style
  header: undefined,
  centered: false,
  size: "md" // 'md' or 'lg'
};

class CModal extends CComponent {

  render() {
    const {modalOn, handleModalClose, handleModalSubmit, isLoading, isSubmitReady, header, close, submitTitle, closeTitle, centered, size} = this.props;
    return (
      <Modal isOpen={modalOn} toggle={handleModalClose} centered={centered} size={size}>
        {header &&
        <ModalHeader toggle={handleModalClose}>
          {header}
        </ModalHeader>}
        <ModalBody>
          {this.props.children}
        </ModalBody>
        <ModalFooter>
          {close &&
          <Button variant="secondary" onClick={handleModalClose}>
            {closeTitle}
          </Button>}
          {handleModalSubmit &&
          <CButtonLoading color="primary"
                          onClick={handleModalSubmit}
                          loading={isLoading}
                          disabled={isSubmitReady}
                          className="float-right"
                          text={submitTitle}
                          loadingText="Loading.."/>}
        </ModalFooter>
      </Modal>
    )
  }
}

CModal.defaultProps = defaultProps;
CModal.propTypes = propTypes;

export default CModal;
