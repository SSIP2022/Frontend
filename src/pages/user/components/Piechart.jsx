import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { baseURL, queryfn } from "../../../config/config";
import { user } from "../../../store/userReducer";
import { useSelector } from "react-redux";

let data;
const PieChart = () => {
  const [resolved, setResolved] = useState("0");
  const [closed, setClosed] = useState("0");
  const [assigned, setAssigned] = useState("0");
  const [complaints, setComplaints] = useState([]);
  const [open, setOpen] = useState("0");
  const [totaln, setTotal] = useState();
  const { userData } = useSelector(user);
  async function getUserComplaints() {
    const data = await queryfn({
      endpoint:
        baseURL + `/complain/user-complains?creator_id=${userData.user_id}`,
      reqMethod: "GET",
      failMsg: "Error in getting data",
    });
    // console.log("user all complaints:", data);
    if (data.success) {
      setComplaints(data.complains);
      setTotal(data.complains.length.toString());
      console.log("total", totaln);
      setResolved(
        data.complains
          .filter((complain) => complain.status === "resolved")
          .length.toString()
      );
      setClosed(
        data.complains
          .filter((complain) => complain.status === "closed")
          .length.toString()
      );
      setAssigned(
        data.complains
          .filter((complain) => complain.status === "assign")
          .length.toString()
      );
      setOpen(
        data.complains
          .filter(
            (complain) =>
              complain.status === "open" || complain.status === "reopen"
          )
          .length.toString()
      );
    }
  }
  useEffect(() => {
    getUserComplaints();
    // console.log("complaints:", total);
    // console.log(analyticsData);
    // console.log(resolved);
  }, [open, resolved, closed, assigned, totaln]);
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
  const [series, setSeries] = useState([]);
  // const [lables,setLable] = useState(['A', 'B', 'C', 'D', 'E']);

  const screenWidth = window.screen.width;

  const getAnalytics = async () => {
    const data = await queryfn({
      endpoint: baseURL + `/complain/analytics/status`,
      reqMethod: "GET",
      failMsg: "Error in getting analytics",
    });
    // setAnalyticsData("Analytics", data);
    // console.log(screenWidth);

    // console.log(data.forCharts);
    setOptions({
      labels: ["Open", "Resolved", "Closed", "Assigned"],
      plotOptions: {
        radialBar: {
          dataLabels: {
            total: {
              totaln: { totaln },
            },
          },
        },
      },
    });
    let sum = data.complains[0].total;
    setSeries([open, resolved, closed, assigned]);
    // setTotal(totaln);
  };

  useEffect(() => {
    getAnalytics();
  }, [options, series]);

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
