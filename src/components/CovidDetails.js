import React from "react";
import Card from "./Card";

const CovidDetails = (props) => {
  const { totalCases, totalActiveCases, totalRecovered, totalDeaths } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card>
        <span>Total Cases </span>
        <br />
        <span>{totalCases}</span>
      </Card>
      <Card>
        <span>Total Active Cases </span>
        <br />
        <span>{totalActiveCases}</span>
      </Card>
      <Card>
        <span>Total Recovered </span>
        <br />
        <span>{totalRecovered}</span>
      </Card>
      <Card>
        <span>Total Deaths </span>
        <br />
        <span>{totalDeaths}</span>
      </Card>
    </div>
  );
};

export default CovidDetails;
