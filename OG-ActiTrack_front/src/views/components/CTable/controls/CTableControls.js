import React, {Component} from 'react';
import {ButtonGroup, Button} from "reactstrap";
import DeleteModal from "../../Widgets/modals/DeleteModal";
import PropTypes from "prop-types";

const propTypes = {
  onDetail: PropTypes.func,
  onLaunch: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  confirmDelete: PropTypes.bool,
  row: PropTypes.object,
  rowIndex: PropTypes.number,
  formatter: PropTypes.func
};
const defaultProps = {
  confirmDelete: false
};

class CTableControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false,
      isRunBusy: false,
      isUnmount: false
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onLaunchClick = this.onLaunchClick.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillUnmount() {
    this.state.isUnmount = true;
  }

  onDeleteClick() {
    this.setState({modalOn: true});
  }

  onLaunchClick(row, rowIndex) {
    if (!this.props.onLaunch) {
      return;
    }
    this.setState({isRunBusy: true});
    this.props.onLaunch(row, rowIndex, function () {
      if (!this.state.isUnmount) {
        this.setState({isRunBusy: false});
      }
    }.bind(this))
  }

  /*
   * MODAL
   ***/
  handleModalSubmit() {
    if (this.props.onDelete)
      this.props.onDelete(this.props.row, this.props.rowIndex);
    this.setState({modalOn: false});
  }

  handleModalClose() {
    this.setState({modalOn: false});
  }

  render() {
    const {isRunBusy} = this.state;
    const {onLaunchClick, handleModalClose, handleModalSubmit, onDeleteClick} = this;
    const {row, rowIndex, formatter, onDetail, onEdit, onLaunch, onDelete, confirmDelete} = this.props;
    return (
      <div>
        <ButtonGroup className="mr-3" aria-label="First group">
          {onDetail &&
          <Button className="pop-btn" onClick={() => onDetail(row, rowIndex)}>
            <i className="icon-eye"/>
          </Button>}
          {onLaunch &&
          <Button className="pop-btn" onClick={() => onLaunchClick(row, rowIndex)} disabled={isRunBusy}>
            <i className={isRunBusy ? "fa fa-refresh fa-spin" : "icon-control-play"}/>
          </Button>}
          {onEdit &&
          <Button className="pop-btn" onClick={() => onEdit(row, rowIndex)}>
            <i className="icon-note"/>
          </Button>}
          {onDelete &&
          <Button className="pop-btn"
                  onClick={() => confirmDelete ? onDeleteClick() : onDelete(row, rowIndex)}>
            <i className="icon-trash"/>
          </Button>}
        </ButtonGroup>
        {onDelete && <DeleteModal modalOn={this.state.modalOn} handleModalClose={handleModalClose}
                                  handleModalSubmit={handleModalSubmit} data={formatter(row)}/>}
      </div>
    )
  }
}

CTableControls.propTypes = propTypes;
CTableControls.defaultProps = defaultProps;

export default CTableControls;
