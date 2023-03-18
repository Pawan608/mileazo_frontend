import styles from "./logs.module.scss";
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
import NotesIcon from "@mui/icons-material/Notes";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PersonIcon from "@mui/icons-material/Person";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ServiceForm from "../../components/serviceForm";
const Logs = () => {
  const [cookies, setCookie] = useCookies("user");
  const [logs, setLogs] = useState();
  const [currentLog, setCurrentLog] = useState();
  const [edit, setEdit] = useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showModal, setShowModal] = useState({
    isShow: false,
    status: "1",
    message: "",
  });
  useEffect(() => {
    if (showModal.isShow == true) {
      setTimeout(() => {
        setShowModal({ isShow: false, message: "", status: "0" });
      }, 3000);
    }
  }, [showModal]);
  let services = "";
  const getServices = async () => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        purpose: "SERVICES",
      }),
    });
    const res = await data.json();
    // console.log("logs", res);
    if (res.data && res.data.status === "1") {
      setLogs(res.data.services_list);
    }
  };
  const handleChangeLogStatus = async (status) => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    // console.log(currentLog);
    let time =
      (new Date(currentLog.estimate_service_time) -
        new Date(currentLog.create_on)) /
      (1000 * 60);
    const servicesString = currentLog?.sdq
      ?.map((el) => {
        return el.id;
      })
      .join(" ");

    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentLog.id,
        user_id: currentLog.user_id_id,
        name: currentLog.name,
        mobile: currentLog.mobile,
        email: "",
        bike_no: currentLog.bike_no,
        bike_model_id: currentLog.bike_model_id,
        service_amount: currentLog.service_amount,
        current_km: currentLog.current_km,
        service_next_date: currentLog.service_next_date,
        servicedtails: servicesString,
        status: status,
        remarks: currentLog.remarks,
        purpose: "UPDATE_SERVICE",
        time: String(time),
        gstin: currentLog.gstin,
        address: currentLog.address,
      }),
    });
    const res = await data.json();
    setShowModal({
      isShow: true,
      message: res.data?.message,
      status: res.data?.status,
    });
    // console.log(res);
    if (res.data?.status == "1") {
      setLogs((el) => {
        // console.log("ell", el);
        const newLogs = el.filter((e) => {
          return e.id !== currentLog.id;
        });
        return newLogs;
      });
    }
  };
  const handleUpdateLogStatus = async () => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    // console.log("edit", edit);
    // console.log("currentLog", currentLog);
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    });
    const res = await data.json();
    setShowModal({
      isShow: true,
      message: res.data?.message,
      status: res.data?.status,
    });
    // console.log("teeres", res);
    // console.log(res);
    if (res.data?.status == "1") {
      getServices();
    }
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  //   console.log(logs);
  useEffect(() => {
    getServices();
  }, []);
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Service Logs</h1>
        <Stack
          sx={{
            width: "100%",
            visibility: showModal.isShow ? "visible" : "hidden",
            position: "fixed",
          }}
          spacing={2}
        >
          <Alert severity={showModal.status == "1" ? "success" : "error"}>
            {showModal.message}
          </Alert>
        </Stack>
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
                      <div className={styles.card_options}>
                        {" "}
                        <Tooltip title="Account settings">
                          <IconButton
                            onClick={(e) => {
                              handleClick(e);
                              setCurrentLog(el);
                            }}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={
                              open ? `account-menu-${el.id}` : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <MenuIcon></MenuIcon>
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Card>
                  </Box>
                  <Menu
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
                  </Menu>
                </>
              );
            })}
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <ServiceForm setEdit={setEdit} currentLog={currentLog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={(e) => {
              handleUpdateLogStatus();
              handleCloseDialog(e);
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Logs;
