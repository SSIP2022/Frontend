import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { baseURL, queryfn } from "../../../config/config";

let data;
const PieChart = () => {
  const [totaln, setTotal] = useState();
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
            fontFamily: undefined,
            fontWeight: 600,
            color: undefined,
            offsetY: -10,
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w, val) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return totaln;
            },
          },
        },
      },
    },
    labels: ["Apples", "Oranges", "Bananas", "Berries"],

    stroke: {
      lineCap: "round",
    },
    legend: {
      show: true,
      floating: true,
      position: "bottom",
      // offsetX: -70,
      // offsetY: 240
    },
  });
  const [series, setSeries] = useState([0, 0, 0, 0, 0]);
  // const [lables,setLable] = useState(['A', 'B', 'C', 'D', 'E']);

  const screenWidth = window.screen.width;

  const getAnalytics = async () => {
    const data = await queryfn({
      endpoint: baseURL + `/complain/analytics/status`,
      reqMethod: "GET",
      failMsg: "Error in getting analytics",
    });
    // setAnalyticsData("Analytics", data);
    console.log(screenWidth);

    console.log(data.forCharts);
    setOptions({
      labels: data.forCharts.status,
      plotOptions: {
        radialBar: {
          dataLabels: {
            total: {
              formatter: function (w, val) {
                return data.complains[0].total;
              },
            },
          },
        },
      },
    });
    let sum = data.complains[0].total;
    setSeries([
      ((data.forCharts.count[0] / sum) * 100).toFixed(0),
      ((data.forCharts.count[1] / sum) * 100).toFixed(0),
      ((data.forCharts.count[2] / sum) * 100).toFixed(0),
      ((data.forCharts.count[3] / sum) * 100).toFixed(0),
      ((data.forCharts.count[4] / sum) * 100).toFixed(0),
    ]);
    setTotal(sum);
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      width={screenWidth == "412" ? "300px" : "400px"}
    />
  );
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
