// components/BarChart.js
import React from "react";
import { ChartProps, Bar } from "react-chartjs-2";

interface BarChartProps extends ChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
    type: string;
  };
}

function BarChart({ data }: BarChartProps): JSX.Element {
  return <Bar data={data} />;
}

export default BarChart;
