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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const Home = () => {
  const [history, setHistory] = useState([]);
  const [cookies, setCookie] = useCookies("user");
  const [value, setValue] = React.useState("1 Week");
  const [logs, setLogs] = useState("");
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
    // console.log(res);
    if (res.data && res.data.status === "1") {
      setHistory(res.data.services_list);
    }
  };
  const getLogs = async () => {
    const user_id = cookies.user?.profile_data[0]?.profile?.user_id;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user_id,
        purpose: "SERVICES",
      }),
    });
    const res = await data.json();
    // console.log("logs", res);
    if (res.data && res.data.status === "1") {
      setLogs(res.data.services_list.reverse());
      // console.log(res.data.services_list);
    }
  };
  useEffect(() => {
    getLogs();
    getServices();
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="Services" wiz_data={history} />
          <Widget type="Pending" wiz_data={logs} />
          <Widget type="Earning" wiz_data={history} />
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured /> */}

          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} value={value} />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Filter
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="1 Week"
                control={<Radio />}
                label="1 Week"
              />
              <FormControlLabel
                value="1 Month"
                control={<Radio />}
                label="1 Month"
              />
              <FormControlLabel
                value="3 Month"
                control={<Radio />}
                label="3 Month"
              />
              <FormControlLabel
                value="6 Month"
                control={<Radio />}
                label="6 Month"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {history.length ? (
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table logs={history} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
