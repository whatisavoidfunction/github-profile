import React, { useEffect } from "react";
import Chart from "chart.js";
import "./BarGraph.css";
import "./General.css";
import { backgroundColor } from "../Config/ChartColor";
import ParentChart from "../Config/ParentChart";

function BarGraph({ starredData }) {
  useEffect(() => {
    if (!starredData.loading && starredData.data !== null) {
      const ctx = document.getElementById("barChart").getContext("2d");

      let graphLabel = []
      let graphData = []
      let graphColor = []

      let i = 0;
      for (let [key, value] of starredData.data) {

        // calculate how much the language was used 
        graphLabel.push(key);
        graphData.push(value);
        graphColor.push(backgroundColor[i]);
        i++;
        if (i >= 5) {
          break;
        }
      }
      let configuration = {
        type: "bar",
        data: {
          labels: graphLabel,
          datasets: [
            {
              data: graphData,
              backgroundColor: graphColor,
              minBarLength: 2
            },
          ],
        },
        options: {
          legend: {
            display: false
          },
        }
      }

      let chartConfiguration = ParentChart(configuration)
      var chart = new Chart(ctx, chartConfiguration);

    }
  });
  // let chartConfiguration = {
  //   type: "bar",
  //   data: {
  //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //     datasets: [
  //       {
  //         // label: "# of Votes",
  //         data: [12, 19, 4, 3, 5, 200000],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)",
  //         ],
  //         minBarLength: 2
  //       },
  //     ],
  //   },
  //   options: {
  //     legend: {
  //       display: false
  //     },
  //   }

  return (

    <div className="barChartContainer">
      <header>Top 5 Starred Repos</header>

      {starredData.loading &&
        <div className="loader"></div>
      }
      {!starredData.loading && starredData.data !== null &&
        <canvas id="barChart"></canvas>
      }
      {!starredData.loading && starredData.data === null &&
        <p className="noData">No data available</p>
      }
    </div>
  );
}

export default BarGraph;
