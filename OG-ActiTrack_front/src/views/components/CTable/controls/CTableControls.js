import React, {Component} from 'react';
import {ButtonGroup, Button} from "reactstrap";
import DeleteModal from "../../Widgets/modals/DeleteModal";
import PropTypes from "prop-types";

const propTypes = {
  onDetail: PropTypes.func,
  onLaunch: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  confirmDelete : PropTypes.bool,
  row: PropTypes.object,
  rowIndex: PropTypes.number,
  formatter: PropTypes.func
};
const defaultProps ={
  confirmDelete: false
};

class CTableControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  onDeleteClick() {
    this.setState({modalOn: true});
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
    const {row, rowIndex, formatter, onDetail, onLaunch, onEdit, onDelete, confirmDelete} = this.props;
    return (
      <div>
        <ButtonGroup className="mr-3" aria-label="First group">
          {onDetail &&
          <Button className="pop-btn" onClick={() => onDetail(row, rowIndex)}>
            <i className="icon-eye"/>
          </Button>}
          {onLaunch &&
          <Button className="pop-btn" onClick={() => onLaunch(row, rowIndex)}>
            <i className="icon-control-play"/>
          </Button>}
          {onEdit &&
          <Button className="pop-btn" onClick={() => onEdit(row, rowIndex)}>
            <i className="icon-note"/>
          </Button>}
          {onDelete &&
          <Button className="pop-btn"
                  onClick={() => confirmDelete ? this.onDeleteClick() : onDelete(row, rowIndex)}>
            <i className="icon-trash"/>
          </Button>}
        </ButtonGroup>
        {onDelete && <DeleteModal modalOn={this.state.modalOn} handleModalClose={this.handleModalClose}
                     handleModalSubmit={this.handleModalSubmit} data={formatter(row)}/>}
      </div>
    )
  }
}

CTableControls.propTypes = propTypes;
CTableControls.defaultProps = defaultProps;

export default CTableControls;
