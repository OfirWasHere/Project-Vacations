import { useEffect, useState } from "react";
import userService from "../../../Services/UserService";
import { Chart as ChartReact } from "chart.js/auto";
import "./Chart.css";
import VacationModel from "../../../Models/VacationModel";
import { blue, green, orange, pink, purple, red } from "@mui/material/colors";
import { Button } from "@mui/material";
import AuthVerify from "../../AuthArea/AuthVerify/AuthVerify";
import { useNavigate } from "react-router-dom";
import AdminVerify from "../../AuthArea/AdminVerify/AdminVerify";
import ChartDownload from "../ChartDownload/ChartDownload";

function Chart(): JSX.Element {

  const [vacationData, setVacationData] = useState<VacationModel[]>([]);
  console.log(vacationData);
  
  const chartColors = [red[400], blue[400], green[400], purple[400], orange[400], pink[400]];
  const navigate = useNavigate();

  // Checking if user is an admin and if token is valid:
  useEffect(()=>{
    AuthVerify();
    if (AdminVerify()) {
    return;
} else {
    navigate("/list");
}
},[])

  // Getting data from backend:
  useEffect(() => {
    userService
      .userVacations()
      .then((e) => {
        setVacationData(e);
      })
      .catch((e) => console.log(e.message));
  }, []);

  //The chart element:
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const chart = new ChartReact(ctx, {
      type: "bar",
      data: {
        labels: vacationData.map((vacation: VacationModel) => vacation.destination),
        datasets: [
          {
            label: "Vacations",
            data: vacationData.map((vacation: VacationModel) => vacation.followersCount),
            backgroundColor: chartColors,
            borderColor: chartColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            color: "black"
          },
          legend: {
            display: false,
            labels: {
              color: "black"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "black",
            }
          },
          x: {
            ticks: {
              color: "black"
            }
          }
        }
      }
    });

    return () => {
      // Destroying chart to free memory
      chart.destroy();
    };
  }, [vacationData]);

  return (
    <div className="Chart">
      <h2>Chart of likes per vacation</h2>
      <div className="ChartRef">
      <canvas id="myChart"></canvas>
      </div>
      <h3>download chart data</h3>

      <ChartDownload vacationData={vacationData}/>
    </div>
  )
}

export default Chart;
