import CComponent from "../CComponent";

class CPopup extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      parentNode: undefined,
      nodes: {},
      popoverOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.drawPopup = this.drawPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.handleParentClick = this.handleParentClick.bind(this);
  }

  drawPopup() {
    document.addEventListener('click', this.handleClick, false);
    if (this.state.parentNode) {
      this.setState({
        popoverOpen: true,
      });
    }
  }

  hidePopup() {
    document.removeEventListener('click', this.handleClick, false);
    if (this.state.parentNode) {
      this.setState({
        popoverOpen: false,
      });
    }
  }

  handleParentClick() {
    if (!this.state.popoverOpen) {
      this.drawPopup();
    } else {
      this.hidePopup();
    }
  }

  handleClick(e) {
    // handle toggle click on parent
    if (this.state.parentNode && this.state.parentNode.contains(e.target)) {
      this.handleParentClick();
      return;
    }
    // quit if the popup is not open
    if (!this.state.popoverOpen)
      return;
    // check if the click is within a node of the popup
    for (let key in this.state.nodes) {
      if (this.state.nodes[key] && this.state.nodes[key].contains(e.target)) {
        return;
      }
    }
    // else hide popup
    this.hidePopup();
  }
}

export default CPopup;
