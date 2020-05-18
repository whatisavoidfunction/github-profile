import React from "react";
import "./Footer.css";

function Homepage() {
  return (
    <div className="Footer">
      <p>
        Created by{" "}
        <a
          target="_blank"
          href="https://vishalkohli.com"
          rel="noopener noreferrer"
        >
          Vishal Kohli
        </a>{" "}
        with{" "}
        <a target="_blank" href="https://reactjs.org" rel="noopener noreferrer">
          React
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          href="https://www.chartjs.org"
          rel="noopener noreferrer"
        >
          Chart.js
        </a>
        .
      </p>
    </div>
  );
}

export default Homepage;
