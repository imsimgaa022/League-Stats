import React, { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import axios from "axios";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip
);

const ChartComponent = ({ game }) => {
  const chartRef = useRef(null);
  const team1Won = game?.teams[0]?.win;
  const team2Won = game?.teams[1]?.win;

  useEffect(() => {
    async function fetchTimeline() {
    const response = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/EUN1_${game?.gameId}/timeline?api_key=${process.env.REACT_APP_RIOT_API_KEY}`);
    const minutesList = response.data?.info?.frames;
    const minuteArray = [];
    for (let i = 0; i < minutesList.length; i++) {
      const minuteString = `${i + 1}"`;
      minuteArray.push(minuteString);
    }
    const data = response.data?.info?.frames;
    const team1Gold = [];
    const team2Gold = [];

    for (let i = 0; i < data.length; i++) {
      const frame = data[i]?.participantFrames;
      if (frame) {
        const dataArray = Object.values(frame);
        const team1TotalGold = dataArray
          .slice(0, 5)
          .reduce((total, obj) => total + obj.totalGold, 0);
        team1Gold.push(team1TotalGold);
      }
    }

    for (let i = 0; i < data.length; i++) {
      const frame = data[i]?.participantFrames;
      if (frame) {
        const dataArray = Object.values(frame);
        const team2TotalGold = dataArray
          .slice(5)
          .reduce((total, obj) => total + obj.totalGold, 0);
        team2Gold.push(team2TotalGold);
      }
    }
    const chartConfig = {
      type: "line",
      data: {
        labels: minuteArray,
        datasets: [
          {
            label: team1Won ? "Winning Team" : "Losing Team",
            data: team1Gold,
            borderColor: team1Won ? "blue" : "red",
            fill: false,
          },
          {
            label: team2Won ? "Winning Team" : "Losing Team",
            data: team2Gold,
            borderColor: team2Won ? "blue" : "red",
            fill: false,
          },
        ],
      },
      options: { responsive: true },
    };
    new Chart(chartRef.current, chartConfig);
    }
    fetchTimeline();
  }, [game, team1Won, team2Won]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
