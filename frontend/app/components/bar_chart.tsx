import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Box, Typography } from "@mui/material";

interface BarStatProps {
  statusField: string;
  title: string;
}

const COLORS = [
  "#FF6B6B",
  "#FF9F1C",
  "#FFCD56",
  "#4ECDC4",
  "#36A2EB",
  "#9966FF",
];

const BarStat: React.FC<BarStatProps> = ({ statusField, title }) => {
  // Define predefined data
  const predefinedData = [
    { status: "This Week", count: 25 },
    { status: "Last Week", count: 15 },
    { status: "Last Month", count: 40 },
    // Add more predefined data as needed
  ];

  const [chartData, setChartData] = useState(predefinedData);

  useEffect(() => {
    // You can keep the useEffect logic if needed for dynamic updates
    // For now, it just uses the predefined data
    // const fetchData = async () => {
    //   try {
    //     // Replace the axios logic with predefined data
    //     const response = await axios.get(`${API_URL}/citizens`);
    //     const data: any = {};
    //
    //     response.data.forEach((citizen: any) => {
    //       const status = citizen[statusField];
    //       data[status] = (data[status] || 0) + 1;
    //     });
    //     const chartData = Object.keys(data).map((status, index) => ({
    //       status,
    //       count: data[status],
    //       fill: COLORS[index % COLORS.length],
    //     }));
    //     setChartData(chartData);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, [statusField]);

  return (
    <div style={{ width: "100%" }}>
      <Box
        width="104%"
        height={300}
        sx={{
          p: 2,
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginBottom: "5px",
            marginTop: "10px",
            textAlign: "center",
            fontSize: "15px",
          }}
        >
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickLine={false} />
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              width={50}
              fontSize={10}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" radius={[0, 10, 10, 0]}>
              {chartData.map(
                (entry: { status: string; count: number }, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default BarStat;
