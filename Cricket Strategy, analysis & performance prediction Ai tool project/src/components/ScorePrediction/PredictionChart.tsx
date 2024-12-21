import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PredictionChartProps {
  currentScore: number;
  predictedScore: number;
  overs: number;
  remainingOvers: number;
}

export function PredictionChart({ currentScore, predictedScore, overs, remainingOvers }: PredictionChartProps) {
  const totalOvers = overs + remainingOvers;
  const projectedScorePerOver = (predictedScore - currentScore) / remainingOvers;
  
  const labels = Array.from({ length: totalOvers + 1 }, (_, i) => `Over ${i}`);
  const actualData = Array(Math.floor(overs) + 1).fill(null);
  actualData[0] = 0;
  actualData[actualData.length - 1] = currentScore;
  
  const projectedData = Array(totalOvers + 1).fill(null);
  projectedData[Math.floor(overs)] = currentScore;
  projectedData[totalOvers] = predictedScore;

  const data = {
    labels,
    datasets: [
      {
        label: 'Actual Score',
        data: actualData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Projected Score',
        data: projectedData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Score Projection',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Runs',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Overs',
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={data} />
    </div>
  );
}