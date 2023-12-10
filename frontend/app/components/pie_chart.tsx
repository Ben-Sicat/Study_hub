import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Box, Typography } from "@mui/material";

// Replace this with your predefined data
const predefinedCitizens = [
  { sales: 57000 },
  { sales: 14000 },
  { sales: 85000 },
  { sales: 95000 },
  { sales: 97000 },
  { sales: 95000 },
  // Add more predefined data as needed
];

interface SalesData {
  month: string;
  count: number;
  roundedPercentage: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PayChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    const salesRanges = [
      { month: "September", min: 0, max: 30000 },
      { month: "October", min: 30001, max: 60000 },
      { month: "November", min: 60001, max: 90000 },
      { month: "December", min: 90001, max: 120000 },
    ];

    const salesData = salesRanges.map((salesRange) => {
      const filteredCitizens = predefinedCitizens.filter((citizen: any) => {
        const sales = citizen.sales;
        return sales >= salesRange.min && sales <= salesRange.max;
      });

      const count = filteredCitizens.length;
      const percentage = (count / predefinedCitizens.length) * 100;
      const roundedPercentage = Math.round(percentage * 100) / 100;

      return {
        month: salesRange.month,
        count,
        roundedPercentage,
      };
    });

    setSalesData(salesData);
  }, []);

  return (
    <Box
      sx={{
        width: "93%",
        padding: "10px",
        marginBottom: "0",
      }}
    >
      <Box
        sx={{
          height: "400px",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFAF6",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h7" component="div">
          Sales Distribution per Month
        </Typography>
        <Box sx={{ width: "100%", height: "90%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesData}
                dataKey="roundedPercentage"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius="70%"
                fill="#8884d8"
                label
              >
                {salesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default PayChart;
