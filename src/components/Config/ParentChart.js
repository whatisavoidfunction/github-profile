import React from "react";
import "./ParentChart.css";

const ParentChart = ({
  languageCount,
  backgroundColorData,
  position,
  align,
  type,
  languageName,
}) => {
  let chart = {
    type: type,
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
        position: position,
        align: align,
      },
    },
  };
};

export default ParentChart;
