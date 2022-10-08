import React, { Component, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

const AdminChart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      // categories: data.forCharts.department,
      categories: ["data", "data", "data"],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      // data: data.forCharts.count,
      data: [10, 20, 30],
    },
  ]);

  const screenWidth = window.screen.width;

  let data ;
  // let options;

  // let series;
  const getAnalytics = async () => {
    const response = await fetch(
      "https://ssip2022.herokuapp.com/complain/analytics/department-wise",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    );
    data = await response.json();
    
    setOptions({
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: data.forCharts.department,
      },
    });
    setSeries([
      {
        name: "series-1",
        data: data.forCharts.count,
      },
    ]);
  };
  useEffect(()=>{
    getAnalytics();
  }, []);

  // getAnalytics();

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width={screenWidth * 0.65}
      height={320}
    />
  );
};

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       options: {
//         chart: {
//           id: "apexchart-example",
//         },
//         xaxis: {
//           categories: data.forCharts.department,
//         },
//       },
//       series: [
//         {
//           name: "series-1",
//           data: data.forCharts.count,
//         },
//       ],
//     };
//   }
//   render() {
//     const screenWidth = window.screen.width;
//     return (
//       <Chart
//         options={this.state.options}
//         series={this.state.series}
//         type="bar"
//         width={screenWidth * 0.65}
//         height={320}
//       />
//     );
//   }
// }

export default AdminChart;
