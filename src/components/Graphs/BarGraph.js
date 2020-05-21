import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import "./BarGraph.css";
import { backgroundColor, borderColor } from "../Config/ChartColor";
import ParentChart from "../Config/ParentChart";

function BarGraph({ starredData }) {
  useEffect(() => {
    console.log(starredData);
    // let backgroundColorData = backgroundColorList;

    const ctx = document.getElementById("barChart").getContext("2d");
    let labelName = [],
      labelDataValue = [],
      backgroundColorData = [],
      borderColorData = [];

    let i = 0;
    for (let [k, v] of starredData) {
      if (i >= 5) {
        break;
      }
      labelName.push(k);
      labelDataValue.push(v);
      backgroundColorData.push(backgroundColor[i]);
      borderColorData.push(borderColor[i]);
      i++;
    }

    let configuration = {
      type: "bar",
      data: {
        labels: labelName,
        // dataSets:
        // data: labelDataValue,
        // backgroundColor: backgroundColorData,
        // borderColor :borderColorData
        datasets: [
          {
            // label: "# of Votes",
            data: labelDataValue,
            backgroundColor: backgroundColorData,
            borderColor: borderColorData,
            borderWidth: 1,
          },
        ],
      },
    };

    let chartConfiguration = ParentChart(configuration);

    // let chartConfiguration = {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         // label: "# of Votes",
    //         data: [12, 19, 4, 3, 5, 20],
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
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    // };
    var chart = new Chart(ctx, chartConfiguration);
  }, []);
  return (
    <div className="barChartContainer">
      <header>Most starred repos</header>
      <canvas id="barChart"></canvas>
      {/* <p>(Max 5)</p> */}
    </div>
  );
}

export default BarGraph;
