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
  handleModalPrev: PropTypes.func,
  handleModalNext: PropTypes.func,
  handleModalSubmit: PropTypes.func,
  // submit
  isSubmitReady: PropTypes.bool,
  isLoading: PropTypes.bool,
  submitTitle: PropTypes.string,
  // close
  close: PropTypes.bool,
  closeTitle: PropTypes.string,
  // step controls
  prevTitle: PropTypes.string,
  nextTitle: PropTypes.string,
  // step
  step: PropTypes.number,
  finalStep: PropTypes.number,
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
  handleModalPrev: undefined,
  handleModalNext: undefined,
  handleModalSubmit: undefined,
  // submit
  isSubmitReady: true,
  isLoading: false,
  submitTitle: "Submit",
  // close
  close: false,
  closeTitle: "Close",
  // step controls
  prevTitle: "Back",
  nextTitle: "Next",
  // step
  step: 1,
  finalStep: 1,
  // style
  header: undefined,
  centered: false,
  size: "md" // 'md' or 'lg'
};

class CModal extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: props.step
    };
    this.handleModalPrev = this.handleModalPrev.bind(this);
    this.handleModalNext = this.handleModalNext.bind(this);
  }

  handleModalPrev() {
    const step = this.state.step === 0 ? this.state.step : this.state.step - 1;
    this.setState({
      step: step
    });
    if (this.props.handleModalPrev)
      this.props.handleModalPrev(step);
  }

  handleModalNext() {
    const step = this.state.step < this.state.finalStep ? this.state.step : this.state.step + 1;
    this.setState({
      step: step
    });
    if (this.props.handleModalNext)
      this.props.handleModalNext(step);
  }

  render() {
    const {modalOn, handleModalClose, handleModalSubmit, isLoading, isSubmitReady, header, close, submitTitle, prevTitle, nextTitle, closeTitle, centered, size, finalStep, children} = this.props;
    const {handleModalPrev, handleModalNext} = this;
    const {step} = this.state;
    let printSubmitStep = function () {
      if (step >= finalStep) {
        return (
          <CButtonLoading color="primary"
                          onClick={handleModalSubmit}
                          loading={isLoading}
                          disabled={isSubmitReady}
                          className="float-right"
                          text={submitTitle}
                          loadingText="Loading.."/>
        );
      } else {
        return (
          <CButtonLoading color="primary"
                          onClick={handleModalNext}
                          loading={isLoading}
                          disabled={isSubmitReady}
                          className="float-right"
                          text={nextTitle}
                          loadingText="Loading.."/>
        );
      }
    };
    let printPrevStep = function () {
      if (step !== 1) {
        return (
          <CButtonLoading color="primary"
                          onClick={handleModalPrev}
                          loading={isLoading}
                          className="float-left"
                          text={prevTitle}
                          loadingText="Loading.."/>
        );
      }
    };
    console.log("Step: ", step, children);
    return (
      <Modal isOpen={modalOn} toggle={handleModalClose} centered={centered} size={size}>
        {header &&
        <ModalHeader toggle={handleModalClose}>
          {header}
        </ModalHeader>}
        <ModalBody>
          {React.Children.map(children, child => {
            if (child.type.name !== "CModalStep") {
              throw new TypeError("CModal can only contains CModalStep child");
            }
            if (child.props.step === step) {
              return child;
            }
          })
          }
        </ModalBody>
        <ModalFooter>
          {close &&
          <Button variant="secondary" onClick={handleModalClose}>
            {closeTitle}
          </Button>}
          {handleModalSubmit && printPrevStep()}
          {handleModalSubmit && printSubmitStep()}
        </ModalFooter>
      </Modal>
    )
  }
}

CModal.defaultProps = defaultProps;
CModal.propTypes = propTypes;

export default CModal;
