import React, { useEffect, useState } from "react";
import "./App.css";
import PieChart from "./components/PieChart";
import CovidDetails from "./components/CovidDetails";
import axios from "axios";
import Card from "./components/Card";

function App() {
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotaltotalDeaths] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [covidSummary, setCovidSummary] = useState({});
  const [code, setCode] = useState();
  let sortedData = [];

  useEffect(() => {
    axios
      .get(`https://data.covid19india.org/data.json`)
      .then((res) => {
        if (res.status === 200) {
          setTotalCases(res.data.cases_time_series.pop().totalconfirmed);
          setTotalRecovered(res.data.cases_time_series.pop().totalrecovered);
          setTotaltotalDeaths(res.data.cases_time_series.pop().totaldeceased);
          let total = 0;
          res.data.statewise.forEach((item) => {
            total = total + Number(item.active);
          });
          setTotalActive(total);
          setCovidSummary(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSelect = () => {
    if (covidSummary.statewise) {
      for (let item of covidSummary.statewise) {
        if (code === item.statecode) {
          sortedData.push(item);
        }
      }
    }
  };

  return (
    <div className="App">
      <div>
        <div>
          <h1>Covid19-India</h1>
          <CovidDetails
            totalCases={totalCases}
            totalActiveCases={totalActive}
            totalRecovered={totalRecovered}
            totalDeaths={totalDeaths}
          />
        </div>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <select
            onChange={(e) => setCode(e.target.value)}
            onClick={onSelect()}
          >
            {covidSummary.statewise &&
              covidSummary.statewise.map((states) => (
                <option value={states.statecode}>{states.state}</option>
              ))}
          </select>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card>
              {sortedData.length > 0 && (
                <>
                  <h4
                    style={{
                      marginTop: "1px",
                    }}
                  >
                    {sortedData[0].state}
                  </h4>
                  <span>Total Cases : {sortedData[0].confirmed}</span> <br />
                  <span>Total Active Cases : {sortedData[0].active}</span>
                  <br />
                  <span>Total Recovered : {sortedData[0].recovered}</span>
                  <br />
                  <span>Total Deaths : {sortedData[0].deaths}</span>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
      <PieChart cases={sortedData} />
    </div>
  );
}

export default App;
