import React from "react";
import Plot from "react-plotly.js";

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        values: [20,19, 26, 55],
        labels: ['Total Cases','Active Cases', 'Total Recovered', 'Total Deaths'],
        type: 'pie'
      }],
      layout: {
        height: 400,
        width: 500,
        title: "Pie chart"
      }
    };
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}
export default PieChart;