import React from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Chart = ({ aspect, title, value }) => {
  const [logs, setLogs] = useState([]);
  const [cookies] = useCookies("user");
  const [day, setDay] = useState(7);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (value.includes("Week")) {
      setDay(7);
    } else {
      setDay(value.slice(0, 1) * 30);
    }
  }, [value]);
  // console.log("daay", day);
  const getServices = async () => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        day: String(day),
        bike_no: "",
        purpose: "RECENT_SERVICES",
      }),
    });
    const res = await data.json();
    if (res.data && res.data.status === "1") {
      setLogs(res.data.services_list);
    }
  };
  useEffect(() => {
    getServices();
  }, [day]);
  // console.log("chart", logs);
  useEffect(() => {
    console.log("logs", logs);
    if (logs.length) {
      console.log(day);
      if (day <= 30) {
        const data1 = new Array(day);
        data1.fill([]);
        console.log(data1);
        // const filter = logs.filter(el);
        // const date = new Date(Date.now()).getDate();
        const date_value = Date.now();
        logs.forEach((el, index) => {
          const day_difference = Math.floor(
            (date_value - new Date(el.create_on?.slice(0, 10)).valueOf()) /
              (24 * 1000 * 3600)
          );
          data1[day_difference] = {
            name: new Date(el.create_on).getDate() || day_difference,
            Total:
              (data1[day_difference]?.Total || 0) + Number(el.service_amount) ||
              0,
          };
        });
        // console.log(data1);
        setChartData(data1.reverse());
      } else {
        console.log(value);
        const data1 = new Array(day / 30);
        data1.fill({});
        console.log(data1);
        // const filter = logs.filter(el);
        // const date = new Date(Date.now()).getDate();
        const date_value = Date.now();
        logs.forEach((el, index) => {
          const day_difference = Math.floor(
            (date_value - new Date(el.create_on?.slice(0, 10)).valueOf()) /
              (24 * 1000 * 3600 * 30)
          );
          const month = new Date(el.create_on);
          data1[day_difference] = {
            name:
              new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                month
              ) || day_difference,
            Total:
              (data1[day_difference]?.Total || 0) + Number(el.service_amount) ||
              0,
          };
        });
        // console.log(data1);
        setChartData(data1.reverse());
      }
    } else {
      setChartData([]);
    }
    // const filter=logs
  }, [logs]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
