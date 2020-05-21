// import React, { useState, useEffect } from "react";
// import Chart from "chart.js";
// import "./PieGraph.css";
// import backgroundColorList from "../Config/ChartColor";
// import ParentChart from "../Config/ParentChart";

// function PieGraph({ languageData }) {
//   useEffect(() => {
//     let backgroundColorData = backgroundColorList;
//     let languageCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//     let languageName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//     const ctx = document.getElementById("pieChart").getContext("2d");

//     let chartConfiguration = {
//       type: "doughnut",
//       languageCount: languageCount,
//       languageName: languageName,
//       backgroundColorData: backgroundColorData,
//       position: "right",
//       align: "start",
//     };

//     var chart = new Chart(ctx, ParentChart(chartConfiguration));
//   });
//   return (
//     // <canvas id="pieChart"></canvas>
//     <div className="pieChartContainer">
//       <header>Most used language</header>
//       <canvas id="pieChart"></canvas>
//       <p>(Max 10)</p>
//     </div>
//   );
// }

// export default PieGraph;

// // backgroundColorData = backgroundColorList;
// // languageCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// // languageName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// // const ctx = document.getElementById("pieChart").getContext("2d");

// //   var chart = new Chart(ctx, {
// //     // The type of chart we want to create
// //     type: "doughnut",

// //     // The data for our dataset
// //     data: {
// //       datasets: [
// //         {
// //           data: languageCount,
// //           backgroundColor: backgroundColorData,
// //         },
// //       ],
// //       labels: languageName,
// //     },
// //     // Configuration options go here
// //     options: {
// //       legend: {
// //         position: "right",
// //         align: "start",
// //         font: "20",
// //       },
// //     },
// //   });
// // });
