import styles from "./history.module.scss";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotesIcon from "@mui/icons-material/Notes";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PersonIcon from "@mui/icons-material/Person";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
const History = () => {
  // console.log(process.env.REACT_APP_URL);
  const [cookies, setCookie] = useCookies("user");
  const [logs, setLogs] = useState();
  const [day, setDay] = useState("1");
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
                <>
                  <Box sx={{ margin: "10" }} className={styles.box}>
                    <Card
                      variant="outlined"
                      sx={{ minWidth: "100" }}
                      className={styles.card}
                    >
                      <div className={styles.card_info}>
                        <div className={styles.card_info_list}>
                          <PersonIcon></PersonIcon> {el.name}
                        </div>
                        <div className={styles.card_info_list}>
                          <PhoneAndroidIcon></PhoneAndroidIcon> {el.mobile}
                        </div>
                        <div className={styles.card_info_list}>
                          <CurrencyRupeeIcon></CurrencyRupeeIcon>{" "}
                          {el.service_amount}
                        </div>
                        <div className={styles.card_info_list}>
                          <AccessTimeIcon></AccessTimeIcon>
                          {el.create_on}
                        </div>
                        <div className={styles.card_info_list}>
                          <AccessAlarmIcon></AccessAlarmIcon>
                          {el.estimate_service_time}
                        </div>
                        <div className={styles.card_info_list}>
                          <TwoWheelerIcon />
                          {el.bike_no}
                        </div>
                        <div className={styles.card_info_list}>
                          <Avatar
                            sx={{
                              height: 25,
                              width: 25,
                              fontSize: 10,
                              mr: "8px",
                            }}
                          >
                            KM
                          </Avatar>{" "}
                          {el.current_km}
                        </div>
                        <div className={styles.card_info_list}>
                          <ManageHistoryIcon />
                          {el.sdq?.length &&
                            el.sdq.map((elem) => {
                              return elem.service_name + " | ";
                            })}
                        </div>
                        <div className={styles.card_info_list}>
                          <NotesIcon /> {el.remarks}
                        </div>
                      </div>
                      <div className={styles.card_options}> </div>
                    </Card>
                  </Box>
                  {/* <Menu
                    anchorEl={anchorEl}
                    id={`account-menu-${el.id}`}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        handleChangeLogStatus("0");
                      }}
                    >
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Complete
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        handleClickOpenDialog();
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                  </Menu> */}
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default History;
