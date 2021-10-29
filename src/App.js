import React, { useEffect, useState } from "react";
import "./App.css";
// import PieChart from "./components/PieChart";
import CovidDetails from "./components/CovidDetails";
import axios from "axios";
import Card from "./components/Card";

function App() {
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotaltotalDeaths] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [covidSummary, setCovidSummary] = useState({});
  const [cases, setCases] = useState();
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

        console.log(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);
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
          <select onChange={(e) => setCases(e.target.value)}>
            {covidSummary.statewise &&
              covidSummary.statewise.map((states) => (
                <option value={states.confirmed}>{states.state}</option>
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
              <span>Total Cases </span>
              <br />
              <span>{cases}</span>
            </Card>
          </div>
        </div>
      </div>
      {/* <PieChart /> */}
    </div>
  );
}

export default App;
