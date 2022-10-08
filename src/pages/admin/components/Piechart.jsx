import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";

let data;

const PieChart = () => {
  const [options, setOptions] = useState({
    labels: ["A", "B", "C", "D", "E"],
  });
  const [series, setSeries] = useState([44, 55, 41, 17, 15]);
  // const [lables,setLable] = useState(['A', 'B', 'C', 'D', 'E']);

  const screenWidth = window.screen.width;

  const getAnalytics = async () => {
    const response = await fetch(
      "https://ssip2022.herokuapp.com/complain/analytics/status",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    );
    data = await response.json();

    // console.log(data.forCharts);
    setOptions({
      labels: data.forCharts.status,
    }); 
    setSeries([44, 55, 41, 17, 15]);
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return(<Chart options={options} series={series} type="donut" width="380" />);
};

// class Donut extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//           labels: ['A', 'B', 'C', 'D', 'E']
//       },
//       series: [44, 55, 41, 17, 15],
//     }
//   }

//   render() {

//     return (
//       <div className="donut">
//         <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
//       </div>
//     );
//   }
// }

export default PieChart;
