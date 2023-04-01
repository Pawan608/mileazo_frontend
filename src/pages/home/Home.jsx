import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Home = () => {
  const [logs, setLogs] = useState([]);
  const [cookies, setCookie] = useCookies("user");
  const getServices = async () => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        day: String(30),
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
  }, []);
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        {logs.length ? (
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table logs={logs} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
