import React from "react";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

export const LineGraph = ({ data }) => {
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="recieved" stroke="#8884d8" />
        <Line type="monotone" dataKey="due" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
