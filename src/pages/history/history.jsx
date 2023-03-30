import styles from "./history.module.scss";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import print from "../../components/print";
const History = () => {
  // console.log(process.env.REACT_APP_URL);
  const [cookies, setCookie] = useCookies("user");
  const [logs, setLogs] = useState();
  const [day, setDay] = useState("30");
  const [search, setSearch] = useState();
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
  const getSearch = async (e) => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        day: String(day),
        bike_no: e.target.value,
        purpose: "RECENT_SERVICES",
      }),
    });
    const res = await data.json();
    // console.log(res);
    if (res.data && res.data.status === "1") {
      setLogs(res.data.services_list);
    } else {
      setLogs();
    }
  };
  const handlePrintInvoice = (el) => {
    console.log("cuuuureeent", el);
    var mywindow = window.open("", "PRINT", "height=600,width=600");
    console.log(print().innerHTML);
    mywindow.document.write(print(el).innerHTML);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    return true;
  };
  useEffect(() => {
    getServices();
  }, [day]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.filter}>
            {" "}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
                label="Today"
              >
                <MenuItem value={1}>Today</MenuItem>
                <MenuItem value={30}>1 Month</MenuItem>
                <MenuItem value={90}>3 Month</MenuItem>
                <MenuItem value={180}>6 Month</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.search}>
            {" "}
            <TextField
              id="input-with-icon-textfield"
              label="Bike Number"
              onChange={(e) => {
                if (!e.target.value) {
                  getServices();
                }
                getSearch(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>
        </div>
        <div className={styles.main_container}>
          {logs &&
            logs.map((el) => {
              return (
                <Box sx={{ margin: "10" }} className={styles.box}>
                  <Card
                    variant="outlined"
                    sx={{ minWidth: "100", padding: "2rem" }}
                    className={styles.card}
                  >
                    <div className={styles.flex_container}>
                      <div className={styles.flex_container_header}>
                        <div className={styles.model}>
                          <div
                            className="div"
                            style={{ fontSize: "1.5rem", fontWeight: "800" }}
                          >
                            {el.bike_model_name}
                          </div>
                          <div
                            className=""
                            style={{
                              color: "rgb(63, 61, 61)",
                              fontWeight: "800",
                            }}
                          >
                            Owner: {el.name}
                          </div>
                        </div>
                        <div className={styles.vehicle_number}>
                          <div
                            className="div"
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "800",
                              color: "grey",
                            }}
                          >
                            {el.bike_no}
                          </div>
                          <div className="">Ph: +91 {el.mobile}</div>
                        </div>
                        <div className={styles.edit}></div>
                        <div className={styles.complete}></div>
                      </div>
                      <div className={styles.secondary}>
                        <div className={styles.secondary__first}>
                          <p>Date: {el.create_on}</p>
                          <div className={styles.type}>
                            Type:{" "}
                            <span className={styles.type_list}>
                              <h6>Repair</h6>
                              <h6>Service@ {el.current_km}km</h6>
                            </span>
                          </div>
                        </div>
                        <div className={styles.secondary__second}>
                          <div className={styles.secondary__heading}>Item</div>
                          <div className={styles.selected}>
                            {el.sdq?.length &&
                              el.sdq.map((elem) => {
                                return <span>{elem.service_name}</span>;
                              })}
                            {/* <span>Light Repair</span>
                          <span>Oil Change</span> */}
                          </div>
                        </div>
                      </div>
                      <div className={styles.tertiary}>
                        <h3 className={styles.tertiary__heading}>
                          Cost:{" "}
                          <CurrencyRupeeIcon size="large"></CurrencyRupeeIcon>
                          {el.service_amount}
                        </h3>
                        <div className={styles.tertiary__buttons}>
                          <Button
                            variant="contained"
                            sx={{ background: "#E18810" }}
                            onClick={(e) => {
                              handlePrintInvoice(el);
                            }}
                          >
                            Memo
                          </Button>
                          {/* <Button
                            variant="contained"
                            sx={{ background: "#1098E1" }}
                          >
                            Estimation
                          </Button> */}
                          <Button
                            variant="contained"
                            sx={{ background: "#F05917" }}
                            onClick={(e) => {
                              handlePrintInvoice(el);
                            }}
                          >
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Box>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default History;
