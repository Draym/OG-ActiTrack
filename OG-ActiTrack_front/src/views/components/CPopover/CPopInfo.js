import React, {Component} from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import i18next from 'i18next';

class CPopInfo extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        <a className="btn pop-btn pop-info" id={this.props.id}><i className="icon-info"></i></a>
        <Popover placement={this.props.position} isOpen={this.state.popoverOpen} target={this.props.id} toggle={this.toggle}>
          {this.props.title && <PopoverHeader>{i18next.t(this.props.title)}</PopoverHeader>}
          {this.props.body && <PopoverBody>{i18next.t(this.props.body)}</PopoverBody>}
        </Popover>
      </div>
    );
  }
}

export default CPopInfo;
