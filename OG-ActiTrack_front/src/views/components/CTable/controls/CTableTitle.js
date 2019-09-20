import React, {Component} from 'react';

class CTableTitle extends Component {
  render() {
    if (!this.props.title)
      return null;
    return (
      <span className={"table-title"}>
        {this.props.title} :
      </span>
    )
  }
}


export default CTableTitle;
