import "./ParentChart.css";

const ParentChart = ({

  type,
  data,
  options,
}) => {
  const chart = {
    type: type,
    data: data,
    options: options,
  };

  return chart;
};

export default ParentChart;
