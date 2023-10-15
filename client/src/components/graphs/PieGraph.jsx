import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

//add 10 more colors
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#9F97F7",
  "#FFB44F",
];

export const PieGraph = ({ data }) => {
  const getIntroOfPage = (label) => {
    if (label === "Page A") {
      return "Page A is about men's clothing";
    }
    if (label === "Page B") {
      return "Page B is about women's dress";
    }
    if (label === "Page C") {
      return "Page C is about women's bag";
    }
    if (label === "Page D") {
      return "Page D is about household goods";
    }
    if (label === "Page E") {
      return "Page E is about food";
    }
    if (label === "Page F") {
      return "Page F is about baby food";
    }
    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const percentage = (
        (value / data.reduce((acc, entry) => acc + entry.value, 0)) *
        100
      ).toFixed(2);

      return (
        <div className="bg-foreground border rounded-md p-4 py-2">
          <p className="text-textColor-light">
            {`${payload[0].name} : `}
            <span
              className={`text-textColor font-medium`}
              style={{
                color:
                  COLORS[
                    data.findIndex((item) => item.name === payload[0].name)
                  ],
              }}
            >
              {value}
            </span>
          </p>
          <p className="intro">{getIntroOfPage(label)}</p>
          <p className="text-textColor-light">
            Percentage:
            <span className={`text-textColor font-medium`}> {percentage}%</span>
          </p>
        </div>
      );
    }

    return null;
  };

  const totalValue = data.reduce((total, entry) => total + entry.value, 0);

  return (
    <ResponsiveContainer height={"90%"}>
      <PieChart>
        <Pie
          data={data}
          cx={"30%"}
          cy={"50%"}
          innerRadius={"60%"}
          outerRadius={"90%"}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <text
          x={"30%"}
          y={"47%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={15}
        >
          Total:
        </text>
        <text
          x={"30%"}
          y={"53%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={20}
          className="flex"
        >
          ${totalValue}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};
