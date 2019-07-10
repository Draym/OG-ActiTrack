import React, {Component} from 'react';

import {Borders, ContourSeries, Hint, MarkSeriesCanvas, XAxis, XYPlot, YAxis} from "react-vis/es";

class GalaxyActivityChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredNode: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;

  }

  render() {
    return (
      <XYPlot
        xDomain={this.props.xRange}
        yDomain={this.props.yRange}
        width={this.props.width}
        height={this.props.height}
        onMouseLeave={() => this.setState({hoveredNode: null})}>
        <ContourSeries
          animation
          className="contour-series-example"
          bandwidth={18}
          style={{
            stroke: '#125C77',
            strokeLinejoin: 'round'
          }}
          colorRange={this.props.colors}
          data={this.props.data}
        />
        <MarkSeriesCanvas animation
                          data={this.props.data} size={1} color={'#125C77'}
                          onNearestX={d => this.setState({hoveredNode: d})}/>
        <Borders style={{all: {fill: '#fff'}}}/>
        {this.state.hoveredNode && (
          <Hint
            xType="literal"
            yType="literal"
            getX={d => d.x}
            getY={d => d.y}
            value={{
              x: this.state.hoveredNode.x,
              y: this.state.hoveredNode.y,
              value: this.state.hoveredNode.position
            }}
          />
        )}
        <XAxis/>
        <YAxis/>
      </XYPlot>
    );
  }
}

export default GalaxyActivityChart;
