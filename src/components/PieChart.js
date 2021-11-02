import React from "react";
import Plot from "react-plotly.js";


const PieChart = (props) =>{
  const {tcases}=props;
  console.log("tt",tcases);
  var data = [
    {
      values: [tcases, 4454, 65555, 44],
      labels: ["Total Cases", "Active Cases", "Total Recovered", "Total Deaths"],
      type: "pie",
    },
  ];

    return(
      <Plot
      data={data}
      layout={ {width: 500, height: 400, title: 'Covid Details '} } />
    )
}
export default PieChart;