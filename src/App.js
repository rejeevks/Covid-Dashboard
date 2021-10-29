import React, { useEffect, useState } from "react";
import "./App.css";
// import PieChart from "./components/PieChart";
import CovidDetails from "./components/CovidDetails";
import axios from "axios";

function App() {
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotaltotalDeaths] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [covidSummary, setCovidSummary] = useState({});
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
        <div>
          <select>
            {covidSummary.statewise &&
              covidSummary.statewise.map((states) => (
                <option value={states.state}>{states.state}</option>
              ))}
          </select>
        </div>
      </div>
      {/* <PieChart /> */}
    </div>
  );
}

export default App;
