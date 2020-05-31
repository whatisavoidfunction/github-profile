import React, { useEffect } from "react";
import Chart from "chart.js";
import "./PieGraph.css";
import "./General.css";
import { backgroundColor } from "../Config/ChartColor";
import ParentChart from "../Config/ParentChart";

function PieGraph({ languageData, totalRepos }) {
  useEffect(() => {
    if (!languageData.b && languageData.data !== null) {
      let languageCount = [],
        languageName = [],
        backgroundColorData = [];

      let i = 0;

      for (let [key, value] of languageData.data) {
        // calculate how much the language was used 

        let ratio = (value / totalRepos * 100).toFixed(1);

        languageName.push(key + " " + ratio + "%");
        languageCount.push(value);
        backgroundColorData.push(backgroundColor[i]);
        i++;
        if (i >= 5) {
          break;
        }
      }

      const ctx = document.getElementById("pieChart").getContext("2d");

      let chartConfiguration = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: languageCount,
              backgroundColor: backgroundColorData,
            },
          ],
          labels: languageName,
        },
        // Configuration options go here
        options: {
          legend: {
            position: "right",
            align: "start",
          },
        },
      };

      var chart = new Chart(ctx, ParentChart(chartConfiguration));
    }
  });
  return (
    <div className="pieChartContainer">
      <header>Top 5 Languages</header>

      {languageData.loading &&
        <div className="loader"></div>
      }
      {!languageData.loading && languageData.data !== null &&
        <canvas id="pieChart"></canvas>
      }
      {!languageData.loading && languageData.data === null &&
        <p className="noData">No data available</p>
      }

    </div>
  );
}

export default PieGraph;
