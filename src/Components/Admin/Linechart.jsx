import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import chart from "./chart.module.scss";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Complaints",
      backgroundColor: "rgb(80, 106, 112)",
      borderColor: "rgb(80, 106, 112)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const LineChart = () => {
  return (
    <div className={chart.container}>
      <Line data={data} />
    </div>
  );
};

export default LineChart;