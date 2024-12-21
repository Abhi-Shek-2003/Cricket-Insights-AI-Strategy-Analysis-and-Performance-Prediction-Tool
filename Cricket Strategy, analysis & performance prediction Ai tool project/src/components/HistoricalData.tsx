import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Team Performance Trends',
    },
  },
};

const data = {
  labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
  datasets: [
    {
      label: 'Runs Scored',
      data: [180, 165, 190, 175, 200],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: 'Wickets Taken',
      data: [8, 6, 7, 9, 8],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function HistoricalData() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold">Historical Performance</h2>
      </div>
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}