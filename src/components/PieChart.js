import React from "react";
import Plot from "react-plotly.js";

const PieChart = (props) => {
  const { cases } = props;
  if (cases.length > 0) {
    var data = [
      {
        values: [
          cases[0].confirmed,
          cases[0].active,
          cases[0].recovered,
          cases[0].deaths,
        ],
        labels: [
          "Total Cases",
          "Active Cases",
          "Total Recovered",
          "Total Deaths",
        ],
        type: "pie",
      },
    ];
  }
  return (
    <Plot
      data={data}
      layout={{ width: 500, height: 400, title: "Covid Details " }}
    />
  );
};
export default PieChart;
