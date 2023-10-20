import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

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
  const [count, setCount] = React.useState(0);

  const totalValue = data.reduce((total, entry) => total + entry.value, 0);

  useEffect(() => {
    let startCount = 0;
    const endCount = totalValue;
    const animationDuration = 1000; // Adjust the animation duration as needed
    const totalSteps = 50; // Adjust the number of steps as needed

    const increment = Math.ceil(endCount / totalSteps);

    const timer = setInterval(() => {
      startCount += increment;
      if (startCount >= endCount) {
        clearInterval(timer);
        startCount = endCount;
      }
      setCount(startCount);
    }, animationDuration / totalSteps);

    return () => clearInterval(timer);
  }, [totalValue]);

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
          <p className="text-textColor-light">
            Percentage:
            <span className={`text-textColor font-medium`}> {percentage}%</span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer height={"85%"}>
      <PieChart>
        <Pie
          data={data}
          cx={"50%"}
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
          x={"50%"}
          y={"47%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
        >
          Total:
        </text>
        <text
          x={"50%"}
          y={"53%"}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={20}
          className="flex"
        >
          ${count}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};
