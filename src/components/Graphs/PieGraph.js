import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import "./PieGraph.css";
import backgroundColorList from "../Config/ChartColor";

function PieGraph({ languageData }) {
  useEffect(() => {
    console.log(languageData);
    let languageCount = [];
    let languageName = [];
    let backgroundColorData = backgroundColorList;
    let i = 0;
    for (let [key, value] of languageData) {
      // console.log(key + " = " + value);
      languageName.push(key);
      languageCount.push(value);
      backgroundColorData.push(backgroundColorList[i]);
      i++;
      if (i >= 10) break;
    }
    languageCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    languageName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ctx = document.getElementById("pieChart").getContext("2d");

    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "doughnut",

      // The data for our dataset
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
          font: "20",
        },
      },
    });
  });

  return (
    // <canvas id="pieChart"></canvas>
    <div className="pieChartContainer">
      <header>Most used language</header>
      <canvas id="pieChart"></canvas>
    </div>
  );
}

export default PieGraph;
