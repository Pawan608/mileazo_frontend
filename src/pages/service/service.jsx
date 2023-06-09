import React, { useState, useEffect, useRef } from "react";
import styles from "./service.module.scss";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useCookies } from "react-cookie";
import ListSubheader from "@mui/material/ListSubheader";
import { useNavigate } from "react-router-dom";
const setDate = (duration) => {
  if (duration.includes("Day")) {
    const millisecond = new Date().setHours(15 * 24);
    const date = new Date(millisecond).toDateString();
    return date;
  } else {
    const getDuration = duration.split(" ")[0];
    if (getDuration.includes(".")) {
      const millisecond = new Date().setHours(getDuration * 30 * 24);
      const date = new Date(millisecond).toDateString();
      return date;
    } else {
      const millisecond = new Date().setMonth(
        new Date().getMonth() + Number(getDuration)
      );
      const date = new Date(millisecond).toDateString();
      return date;
    }
  }
};
const hourList = [
  "2 Hour",
  "4 Hour",
  "6 Hour",
  "8 Hour",
  "1 day",
  "2 day",
  "3 day",
  "4 day",
  "5 day",
  "7 day",
];
const AddService = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies("user");
  const [bikeNumber, setBikeNumber] = useState({
    value: "",
    isValid: true,
    message: "",
  });
  const [company, setCompany] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [kilometer, setKilometer] = useState();
  const [serviceDue, setServiceDue] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState({
    value: "",
    isValid: true,
    message: "",
  });
  const [serviceList, setServiceList] = useState([]);
  const [amount, setAmount] = useState();
  const [hour, setHour] = useState("2 Hour");
  const [remark, setRemark] = useState();
  const [address, setAddress] = useState();
  const [gst, setGst] = useState(false);
  const [gstNumber, setGstNumber] = useState();
  const [bikeModelList, setBikeModelList] = useState({});
  const [services, setServicesList] = useState({});
  const [showModal, setShowModal] = useState({
    isShow: false,
    status: "1",
    message: "",
  });
  const selectRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // console.log(selectRef);
    selectRef.current.removeEventListener("keydown", () => {});
    selectRef.current.removeEventListener("keypress", () => {});
    selectRef.current.removeEventListener("keyup", () => {});
  }, []);
  const [modelName, setModelName] = useState();
  const getVehicleDetail = async (number) => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    // const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    // console.log(bikeNumber);
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        day: String(360),
        bike_no: number,
        purpose: "RECENT_SERVICES",
      }),
    });
    const res = await data.json();
    // console.log("response", res);
    if (res?.data?.status == "1") {
      setAddress(res.data.services_list[0].address);
      setCompany(res.data.services_list[0].bike_company_name);
      setName(res.data.services_list[0].name);
      setGstNumber(res.data.services_list[0].gstin);
      setMobileNumber({
        value: res.data.services_list[0].mobile,
        isValid: true,
        message: "",
      });
      setModelName(res.data.services_list[0].bike_model_name);
      setBikeModel(res.data.services_list[0].bike_model_id);
      // setServiceDue(res.data.services_list[0].service_next_date);
      if (res.data.services_list[0].gstin) {
        // console.log("eeeeegst");
        setGst(true);
      }
    }

    // setBikeModel(bikeModelList[company][`${e.target.value}`]);

    // if (res.data && res.data.status === "1") {
    //   setLogs(res.data.services_list);
    // } else {
    //   setLogs();
    // }
  };
  // console.log(modelName);
  const getBikeModel = async () => {
    const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "1",
        purpose: "MODELS",
      }),
    });
    const res = await data.json();

    if (res.data?.bikemodle?.length) {
      // console.log("Models", res.data.bikemodle);
      let bikeList = {};
      res.data.bikemodle.forEach((el) => {
        let obj = {};
        const model_name = el.model_name;
        obj[model_name] = el.id;
        bikeList[`${el.company_name}`] = {
          ...obj,
          ...bikeList[`${el.company_name}`],
        };
      });
      setBikeModelList((elem) => {
        return bikeList;
      });
    }
  };
  const getServices = async () => {
    const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "1",
        purpose: "SERVICE_DETAILS",
      }),
    });
    const res = await data.json();
    // console.log(res);
    if (res.data?.servicedtails?.length) {
      let serviceList = {};
      res.data.servicedtails.map((el) => {
        const serviceName = el.service_name;
        serviceList[`${serviceName}`] = el.id;
      });
      setServicesList(serviceList);
    }
  };
  useEffect(() => {
    getBikeModel();
    getServices();
  }, []);
  useEffect(() => {
    if (showModal.isShow == true) {
      setTimeout(() => {
        setShowModal({ isShow: false, message: "", status: "0" });
      }, 3000);
    }
  }, [showModal]);
  const handleChange = (event) => {
    console.log("event", event);
    const {
      target: { value },
    } = event;
    console.log(value);
    setServiceList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    const servicesString = serviceList
      .map((el) => {
        return services[`${el}`];
      })
      .join(" ");
    const date = new Date(serviceDue)?.toISOString().split("T")[0];
    let time;
    if (hour.includes("Hour")) {
      time = Number(hour.split(" ")[0]) * 60;
    } else {
      time = Number(hour.split(" ")[0]) * 24 * 60;
    }
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        name: name,
        mobile: mobileNumber.value,
        email: "",
        bike_no: bikeNumber.value,
        bike_model_id: bikeModel,
        service_amount: amount,
        current_km: kilometer,
        service_next_date: date,
        servicedtails: servicesString,
        status: "1",
        remarks: remark,
        time: String(time),
        gstin: gstNumber,
        address: address,
        type: user_type,
        purpose: "CREATE_SERVICE",
      }),
    });
    const res = await data.json();
    // console.log(res);
    setShowModal({
      status: res.data.status,
      message: res.data?.message,
      isShow: true,
    });
    if (res.data.status == "1") {
      // setBikeNumber({
      //   value: "",
      //   isValid: true,
      //   message: "",
      // });
      // setServiceList([]);
      // setName("");
      // setMobileNumber({
      //   value: "",
      //   isValid: true,
      //   message: "",
      // });
      // setServiceDue();
      // setAmount();
      // setKilometer();
      // setGst(false);
      // setGstNumber();
      // setAddress("");
      // setRemark("");
      navigate("/logs");
    }
    setSubmit(false);
  };

  const modifyChip = () => {
    const chips = document.querySelectorAll(".MuiChip-root");

    if (chips.length)
      chips.forEach((el) => {
        if (!el.querySelector(".cross_icon")) {
          el.style.display = "flex";
          const close_icon = document.createElement("div");
          close_icon.classList.add("cross_icon");
          close_icon.style.width = "1rem";
          close_icon.style.height = "1rem";
          close_icon.style.fontSize = "1rem";
          close_icon.style.cursor = "pointer";
          close_icon.style.borderRadius = "50%";
          close_icon.style.borderRadius = "50%";
          close_icon.style.display = "flex";
          close_icon.style.alignItems = "center";
          close_icon.innerText = "x";
          el.append(close_icon);
        }
      });
    const crossIcons = document.querySelectorAll(".cross_icon");
    if (crossIcons.length) {
      crossIcons.forEach((crossIcon) => {
        crossIcon.removeEventListener("mousedown", handleEvent, { once: true });
        crossIcon.addEventListener("mousedown", handleEvent, { once: true });
      });
    }
    function handleEvent(e) {
      const target = e.target
        .closest(".MuiChip-root")
        .querySelector(".MuiChip-label").innerText;
      setServiceList((el) => {
        return el.filter((elem) => elem !== target);
      });
      e.stopPropagation();
    }
  };
  useEffect(() => {
    modifyChip();
  }, [serviceList]);

  // console.log(bikeModelList);
  // console.log(document.querySelector("form"));
  return (
    <>
      <div className={styles.main_container}>
        <Stack
          sx={{
            width: "100%",
            visibility: showModal.isShow ? "visible" : "hidden",
          }}
          spacing={2}
        >
          <Alert severity={showModal.status == "1" ? "success" : "error"}>
            {showModal.message}
          </Alert>
        </Stack>

        <div className={styles.container}>
          <div className="form">
            <form action="" onSubmit={handleSubmit}>
              <TextField
                required
                error={bikeNumber.isValid ? false : true}
                sx={{ width: "1" }}
                id="outlined-error-helper-text"
                label="Enter Bike Number"
                placeholder="JH01BR0689"
                helperText={bikeNumber.message}
                value={bikeNumber.value}
                onInput={(e) => {
                  let regex = new RegExp(
                    /^[A-Z]{2}[0-9]{1,2}(?:[A-Z])?(?:[A-Z]*)?[0-9]{4}$/
                  );
                  if (regex.test(e.target.value.toUpperCase()) == true) {
                    const myPromise = new Promise((resolve, reject) => {
                      resolve(
                        setBikeNumber((el) => {
                          return {
                            value: e.target.value.toUpperCase(),
                            isValid: true,
                          };
                        })
                      );
                    });
                    myPromise.then(
                      getVehicleDetail(e.target.value.toUpperCase())
                    );
                  } else {
                    setBikeNumber((el) => {
                      return {
                        value: e.target.value.toUpperCase(),
                        isValid: false,
                        message: "Incorrect Vehicle number",
                      };
                    });
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwoWheelerIcon fontSize="large" />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                required
              >
                <InputLabel id="Bike-Company">Bike Company</InputLabel>
                <Select
                  labelId="Bike-Company"
                  id="demo-simple-select"
                  value={company}
                  onChange={(e) => {
                    // console.log(e);
                    setCompany(e.target.value);
                    setBikeModel("");
                  }}
                  label="Bike Company"
                  //   onChange={handleChange}
                >
                  {bikeModelList
                    ? Object.keys(bikeModelList).map((el) => {
                        //
                        return <MenuItem value={el}>{el}</MenuItem>;
                      })
                    : ""}
                </Select>
              </FormControl>
              <FormControl
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                disabled={company ? false : true}
                required
                onClick={(e) => {
                  // console.log(e);
                }}
              >
                <InputLabel id="Bike-Model">Bike Model</InputLabel>
                <Select
                  labelId="Bike-Model"
                  id="demo-simple-select"
                  // value={bikeModel}
                  value={modelName ? modelName : ""}
                  onChange={(e) => {
                    setBikeModel(bikeModelList[company][`${e.target.value}`]);
                    setModelName(e.target.value);
                  }}
                  label="Bike Model"
                  //   onChange={handleChange}
                >
                  {bikeModelList &&
                    bikeModelList[company] &&
                    Object.keys(bikeModelList[company]).map((el) => {
                      // console.log(el);
                      return <MenuItem value={el}>{el}</MenuItem>;
                    })}

                  {/* <MenuItem value={"Hero Electric"}>Hero Electric</MenuItem>
                  <MenuItem value={"Hero Honda"}>Hero Honda</MenuItem>
                  <MenuItem value={"KTM"}>KTM</MenuItem>
                  <MenuItem value={"Piaggio"}>Piaggio</MenuItem>
                  <MenuItem value={"Honda"}>Honda</MenuItem>
                  <MenuItem value={"Mahindra"}>Mahindra</MenuItem>
                  <MenuItem value={"TVS"}>TVS</MenuItem>
                  <MenuItem value={"Okinawa"}>Okinawa</MenuItem>
                  <MenuItem value={"Suzuki"}>Suzuki</MenuItem> */}
                </Select>
              </FormControl>
              <TextField
                required
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                id="outlined-error-km-text"
                label="KM"
                helperText={bikeNumber.message}
                value={kilometer}
                onInput={(e) => {
                  setKilometer((el) => {
                    return e.target.value;
                  });
                }}
                type="number"
              />
              <FormControl
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                onInput={(e) => {
                  // NPM.log(e);
                }}
                required
              >
                <InputLabel id="Bike-Model">Service Due</InputLabel>
                <Select
                  labelId="Bike-Model"
                  id="demo-simple-select"
                  value={serviceDue}
                  onChange={(e) => {
                    setServiceDue(e.target.value);
                  }}
                  label="Bike Model"
                  //   onChange={handleChange}
                >
                  <MenuItem value={setDate("15 Days")}>15 Days</MenuItem>
                  {/* <MenuItem value={setDate("15 Days")}>30 Days</MenuItem> */}
                  <MenuItem value={setDate("1.5 Month")}>1.5 Month</MenuItem>
                  <MenuItem value={setDate("2 Month")}>2 Month</MenuItem>
                  <MenuItem value={setDate("2.5 Month")}>2.5 Month</MenuItem>
                  <MenuItem value={setDate("3 Months")}>3 Months</MenuItem>
                  <MenuItem value={setDate("4 Months")}>4 Months</MenuItem>
                  <MenuItem value={setDate("5 Months")}>5 Months</MenuItem>
                  <MenuItem value={setDate("6 Months")}>6 Months</MenuItem>
                  <MenuItem value={setDate("9 Months")}>9 Months</MenuItem>
                  <MenuItem value={setDate("12 Months")}>12 Months</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "blue" }}>
                  {serviceDue}
                </FormHelperText>
              </FormControl>
              <TextField
                required
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                label="Name"
                value={name}
                onInput={(e) => {
                  setName((el) => {
                    return e.target.value;
                  });
                }}
              />
              <TextField
                required
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                label="Mobile Number"
                value={mobileNumber.value}
                helperText={mobileNumber.message}
                error={!mobileNumber.isValid}
                onInput={(e) => {
                  let regex = new RegExp(/^[1-9]{1}[0-9]{9}$/);
                  if (regex.test(e.target.value) == true) {
                    setMobileNumber((el) => {
                      return { value: e.target.value, isValid: true };
                    });
                  } else {
                    setMobileNumber((el) => {
                      return {
                        value: e.target.value,
                        isValid: false,
                        message: "Incorrect number",
                      };
                    });
                  }
                }}
                type="number"
              />
              <FormControl sx={{ width: "1", mt: "8px" }} required>
                <InputLabel id="demo-multiple-chip">Select Service</InputLabel>
                <Select
                  labelId="demo-multiple-chip"
                  id="demo-multiple-chip"
                  multiple
                  value={serviceList}
                  onChange={handleChange}
                  native={false}
                  autoComplete="off"
                  ref={selectRef}
                  disableKeyDown
                  // open={true}
                  // onKeyPress={(e) => {
                  //   console.log(e);
                  // }}
                  // defaultOpen={true}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  MenuProps={{ autoFocus: false }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  // MenuProps={MenuProps}
                >
                  <ListSubheader
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                    onInput={(e) => {
                      setSearch(e.target.value);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search.."
                      id="myInput"
                      // onkeyup="filterFunction()"
                      style={{ width: "100%" }}
                      autocomplete="off"
                    ></input>
                  </ListSubheader>
                  {Object.keys(services).map((name) => {
                    if (
                      search &&
                      name.toLowerCase().includes(search.toLowerCase())
                    )
                      return (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      );
                    else if (!search) {
                      return (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      );
                    } else return <menuitem></menuitem>;
                  })}
                </Select>
              </FormControl>

              <TextField
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                label="Enter Amount"
                value={amount}
                onInput={(e) => {
                  setAmount((el) => {
                    return e.target.value;
                  });
                }}
                type="number"
                required
              />
              <FormControl
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                onClick={(e) => {}}
                required
              >
                <InputLabel id="Bike-hour">Hour</InputLabel>
                <Select
                  labelId="Bike-hour"
                  id="demo-simple"
                  value={hour}
                  onChange={(e) => {
                    setHour(e.target.value);
                  }}
                  label="Hour"
                  //   onChange={handleChange}
                >
                  {hourList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      // style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                sx={{ width: "1", mt: "8px" }}
                id="outlined-error-helper-text"
                label="Service Remark"
                value={remark}
                helperText={bikeNumber.message}
                onInput={(e) => {
                  setRemark(e.target.value);
                }}
              />
              <div style={{ width: "100%" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={(e) => {
                          setGst(e.target.checked);
                        }}
                        checked={gst}
                      />
                    }
                    label="GST"
                  />
                </FormGroup>
              </div>
              {gst && (
                <TextField
                  required={gst}
                  sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                  label="GSTIN/UIN"
                  value={gstNumber}
                  onInput={(e) => {
                    setGstNumber((el) => {
                      return e.target.value;
                    });
                  }}
                />
              )}
              {gst && (
                <TextField
                  required={gst}
                  sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                  label="Enter Address"
                  value={address}
                  onInput={(e) => {
                    setAddress((el) => {
                      return e.target.value;
                    });
                  }}
                />
              )}
              <div
                className=""
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ ml: "auto", mr: "auto" }}
                  type="submit"
                  disabled={submit}
                >
                  Add Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddService;
