import React, {Component} from 'react';

class CSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: (this.props.value ? this.props.value : 0)
    };
    this.onDateSliderChange = this.onDateSliderChange.bind(this);
  }

  onDateSliderChange(event) {
    this.setState({
      sliderValue: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  render() {
    return (
     <div>
       <div className="slider-labels">
         <label className="slider-min" htmlFor="galaxyDateSlider">00h</label>
         <label className="slider-middle" htmlFor="galaxyDateSlider">12h</label>
         <label className="slider-max" htmlFor="galaxyDateSlider">24h00</label>
       </div>
       <input id="galaxyDateSlider" type="range" className="custom-range" style={{width: this.props.width + "px"}}
              onChange={this.onDateSliderChange} value={this.state.sliderValue}/>
     </div>
    );
  }
}

export default CSlider;
