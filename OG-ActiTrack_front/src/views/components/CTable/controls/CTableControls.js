import React, {Component} from 'react';
import {ButtonGroup, Button} from "reactstrap";
import DeleteModal from "../../Widgets/modals/DeleteModal";

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
    return (
      <div>
        <ButtonGroup className="mr-3" aria-label="First group">
          {this.props.onEdit &&
          <Button className="pop-btn" onClick={() => this.props.onEdit(this.props.row, this.props.rowIndex)}>
            <i className="icon-note"/>
          </Button>}
          {this.props.onDelete &&
          <Button className="pop-btn"
                  onClick={() => this.props.confirmDelete ? this.onDeleteClick() : this.props.onDelete(this.props.row, this.props.rowIndex)}>
            <i className="icon-trash"/>
          </Button>}
        </ButtonGroup>
        <DeleteModal modalOn={this.state.modalOn} handleModalClose={this.handleModalClose}
                     handleModalSubmit={this.handleModalSubmit} data={this.props.formatter(this.props.row)}/>
      </div>
    )
  }
}


export default CTableControls;
