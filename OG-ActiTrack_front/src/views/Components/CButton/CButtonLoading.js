import React, {Component} from 'react';
import {Button} from "reactstrap";


class CButtonLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button type="submit" disabled={this.props.loading || this.props.disabled}
              block={!!this.props.block}
              color={this.props.color}
              onClick={this.props.onClick}
              className={this.props.className}>
        {!this.props.loading && <span>{this.props.text}</span>}
        {this.props.loading && <span>{this.props.loadingText}</span>}
        {this.props.loading && <i className="fa fa-refresh fa-spin" style={{marginLeft: 10 + 'px'}}/>}
      </Button>
    );
  }
}

export default CButtonLoading;
