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
  Label,
} from "recharts";

export const LineGraph = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const receivedValue = payload[0].value;
      const dueValue = payload[1].value;

      return (
        <div className="bg-foreground border-2 rounded-md p-4 py-2">
          <p className="text-neutral-300 font-medium">{label}</p>
          <p className="text-textColor-light">
            {`Received : `}
            <span className={`text-green-500 font-medium `}>
              {receivedValue}
            </span>
          </p>
          <p className="text-textColor-light">
            {`Due : `}
            <span className={`text-red-500 font-medium`}>{dueValue}</span>
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend verticalAlign="bottom" height={36} />
        <Line
          type="monotone"
          dataKey="received"
          name="Received"
          stroke="#22c55e"
        />
        <Line type="monotone" dataKey="due" name="Due" stroke="#ef4444" />
        <text
          x={"50%"}
          y={"2%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
        >
          Invoice Analaytics
        </text>
      </LineChart>
    </ResponsiveContainer>
  );
};
