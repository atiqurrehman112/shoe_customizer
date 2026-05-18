import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#000000", "#3b82f6", "#22c55e", "#f97316"];

const OrderAnalytics = ({ orders }) => {
  const data = [
    {
      name: "Pending",
      value: orders.filter(
        (o) => o.orderStatus === "Pending"
      ).length,
    },
    {
      name: "Processing",
      value: orders.filter(
        (o) => o.orderStatus === "Processing"
      ).length,
    },
    {
      name: "Completed",
      value: orders.filter(
        (o) => o.orderStatus === "Completed"
      ).length,
    },
    {
      name: "Delivered",
      value: orders.filter(
        (o) => o.orderStatus === "Delivered"
      ).length,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-6">
      <h2 className="text-2xl font-black mb-4">
        Orders Analytics
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalytics;