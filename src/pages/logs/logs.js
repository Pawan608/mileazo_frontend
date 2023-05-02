import styles from "./logs.module.scss";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ServiceForm from "../../components/serviceForm";
import print from "../../components/print";
import InvoiceForm from "../../components/invoiceForm";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Logs = () => {
  const [cookies, setCookie] = useCookies("user");
  const [logs, setLogs] = useState();
  const [currentLog, setCurrentLog] = useState();
  const [edit, setEdit] = useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogInvoice, setOpenDialogInvoice] = React.useState(false);
  const [submitInvoice, setSubmitInvoice] = useState(false);
  const [showModal, setShowModal] = useState({
    isShow: false,
    status: "1",
    message: "",
  });
  const [isMemo, setIsMemo] = useState(false);
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
      setLogs(res.data.services_list.reverse());
      // console.log(res.data.services_list);
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
  const handleOpenDialogInvoice = (memo) => {
    const mypromise = new Promise((resolve, reject) => {
      resolve(setIsMemo(memo));
    });
    mypromise.then(setOpenDialogInvoice(true));
  };
  const handleCloseDialogInvoice = () => {
    setOpenDialogInvoice(false);
  };
  const [openComplete, setOpenComplete] = React.useState(false);

  const handleClickOpenComplete = () => {
    setOpenComplete(true);
  };

  const handleCloseComplete = () => {
    setOpenComplete(false);
  };
  //   console.log(logs);
  useEffect(() => {
    getServices();
  }, [submitInvoice]);
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePrintInvoice = (el) => {
    var mywindow = window.open("", "PRINT", "height=600,width=600");
    mywindow.document.write(print(el).innerHTML);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    return true;
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Pending Services</h1>
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
              // console.log(el);
              return (
                <>
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
                          <div className={styles.edit}>
                            {" "}
                            <Button
                              variant="contained"
                              sx={{ background: "#1098E1" }}
                              onClick={(e) => {
                                // handleClick(e);
                                const myPromise = new Promise(
                                  (resolve, reject) => {
                                    resolve(setCurrentLog(el));
                                  }
                                );
                                myPromise.then(handleClickOpenDialog());
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                          <div className={styles.complete}>
                            <Button
                              variant="contained"
                              sx={{ background: "#E18810" }}
                              onClick={(e) => {
                                const myPromise = new Promise(
                                  (resolve, reject) => {
                                    resolve(setCurrentLog(el));
                                  }
                                );
                                myPromise.then(handleClickOpenComplete());
                              }}
                            >
                              Complete
                            </Button>
                          </div>
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
                            <div className={styles.secondary__heading}>
                              Item
                            </div>
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
                                // handleClick(e);
                                const myPromise = new Promise(
                                  (resolve, reject) => {
                                    resolve(setCurrentLog(el));
                                  }
                                );
                                myPromise.then(handleOpenDialogInvoice(true));
                              }}
                            >
                              Memo
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ background: "#1098E1" }}
                              onClick={(e) => {
                                // handleClick(e);
                                const myPromise = new Promise(
                                  (resolve, reject) => {
                                    resolve(setCurrentLog(el));
                                  }
                                );
                                myPromise.then(handleOpenDialogInvoice(false));
                              }}
                            >
                              Estimation
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ background: "#F05917" }}
                              // onClick={(e) => {
                              //   handlePrintInvoice(el);
                              // }}
                              onClick={(e) => {
                                // handleClick(e);
                                const myPromise = new Promise(
                                  (resolve, reject) => {
                                    resolve(setCurrentLog(el));
                                  }
                                );
                                myPromise.then(handleOpenDialogInvoice(false));
                              }}
                            >
                              Invoice
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Box>
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
      <Dialog open={openDialogInvoice} onClose={handleCloseDialogInvoice}>
        <DialogTitle>Invoice</DialogTitle>
        <DialogContent>
          <InvoiceForm
            currentLog={currentLog}
            submitInvoice={submitInvoice}
            setSubmitInvoice={setSubmitInvoice}
            isMemo={isMemo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogInvoice}>Cancel</Button>
          <Button
            onClick={(e) => {
              // handleUpdateLogStatus();
              setSubmitInvoice(true);
              handleCloseDialog(e);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openComplete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseComplete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {" Are You sure, you want to complete the service?"}
        </DialogTitle>
        {/* <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are You sure, you want to Logout?
            </DialogContentText>
          </DialogContent> */}
        <DialogActions>
          <Button onClick={handleCloseComplete}>Cancel</Button>
          <Button
            onClick={() => {
              handleChangeLogStatus("0");
              handleCloseComplete();
            }}
          >
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Logs;
