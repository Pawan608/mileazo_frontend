import React, { useState, useEffect } from "react";
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
const setDate = (duration, date1) => {
  if (duration.includes("Day")) {
    const millisecond = new Date(date1).setHours(15 * 24);
    const date = new Date(millisecond).toDateString();
    return date;
  } else {
    const getDuration = duration.split(" ")[0];
    if (getDuration.includes(".")) {
      const millisecond = new Date(date1).setHours(getDuration * 30 * 24);
      const date = new Date(millisecond).toDateString();
      return date;
    } else {
      const millisecond = new Date(date1).setMonth(
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
const ServiceForm = ({ setEdit, currentLog }) => {
  // console.log(currentLog);
  const [cookies, setCookie] = useCookies("user");
  const [bikeNumber, setBikeNumber] = useState({
    value: currentLog.bike_no,
    isValid: true,
    message: "",
  });

  const [company, setCompany] = useState(currentLog?.bike_company_name);
  const [bikeModel, setBikeModel] = useState(currentLog?.bike_model_id);
  const [bikeModelName, setBikeModelName] = useState("");
  const [kilometer, setKilometer] = useState(currentLog.current_km);
  const [serviceDue, setServiceDue] = useState(currentLog.service_next_date);
  const [name, setName] = useState(currentLog.name);
  const [mobileNumber, setMobileNumber] = useState({
    value: currentLog.mobile,
    isValid: true,
    message: "",
  });
  const [serviceList, setServiceList] = useState([]);
  const [amount, setAmount] = useState(currentLog.service_amount);
  const [hour, setHour] = useState("2 Hour");
  const [remark, setRemark] = useState(currentLog.remarks);
  const [address, setAddress] = useState(currentLog.address);
  const [gst, setGst] = useState(currentLog.gstin ? true : false);
  const [gstNumber, setGstNumber] = useState(currentLog.gstin);
  const [bikeModelList, setBikeModelList] = useState({});
  const [services, setServicesList] = useState({});
  const [showModal, setShowModal] = useState({
    isShow: false,
    status: "1",
    message: "",
  });
  const [search, setSearch] = useState("");
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
      // console.log(bikeList);
      setBikeModelList((elem) => {
        return bikeList;
      });
      setBikeModelName(
        bikeList[`${company}`] &&
          Object.keys(bikeList[`${company}`])[
            Object.values(bikeList[`${company}`]).indexOf(
              currentLog.bike_model_id
            )
          ]
      );
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
    setEdit((el) => {
      const userId = cookies.user?.profile_data[0]?.profile?.user_id;
      const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
      const servicesString = serviceList
        .map((el) => {
          return services[`${el}`];
        })
        .join(" ");
      // console.log("serviceString", servicesString);
      const date = new Date(serviceDue)?.toISOString().split("T")[0];
      let time;
      if (hour.includes("Hour")) {
        time = Number(hour.split(" ")[0]) * 60;
      } else {
        time = Number(hour.split(" ")[0]) * 24 * 60;
      }
      let obj = {
        id: currentLog.id,
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
        purpose: "UPDATE_SERVICE",
      };
      // console.log(obj);
      return obj;
    });
  }, [
    gstNumber,
    gst,
    address,
    remark,
    hour,
    amount,
    serviceList,
    mobileNumber,
    name,
    serviceDue,
    kilometer,
    bikeModelName,
    bikeModel,
    company,
    bikeNumber,
  ]);
  useEffect(() => {
    getBikeModel();
    getServices();
    setServiceList(() => {
      const service = currentLog.sdq.map((el) => {
        // console.log(el.service_name);
        return el.service_name;
      });
      // console.log("service", service);
      return service;
    });
  }, []);
  useEffect(() => {
    if (showModal.isShow == true) {
      setTimeout(() => {
        setShowModal({ isShow: false, message: "", status: "0" });
      }, 3000);
    }
  }, [showModal]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setServiceList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // console.log(bikeModelList);
  return (
    <>
      <div className="form">
        <TextField
          required
          error={bikeNumber.isValid ? false : true}
          sx={{ width: "1", mt: "8px" }}
          id="outlined-error-helper-text"
          label="Enter Bike Number"
          placeholder="JH01BR0689"
          value={bikeNumber.value}
          helperText={bikeNumber.message}
          onInput={(e) => {
            let regex = new RegExp(
              /^[A-Z]{2}[0-9]{1,2}(?:[A-Z])?(?:[A-Z]*)?[0-9]{4}$/
            );
            if (regex.test(e.target.value) == true) {
              setBikeNumber((el) => {
                return { value: e.target.value, isValid: true };
              });
            } else {
              setBikeNumber((el) => {
                return {
                  value: e.target.value,
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
              setServiceList([]);
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
            value={bikeModelName}
            onChange={(e) => {
              setBikeModel(bikeModelList[company][`${e.target.value}`]);
              setBikeModelName(e.target.value);
            }}
            label="Bike Model"
            //   onChange={handleChange}
          >
            {bikeModelList &&
              bikeModelList[company] &&
              Object.keys(bikeModelList[company]).map((el) => {
                return <MenuItem value={el}>{el}</MenuItem>;
              })}
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
            // console.log(e);
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
            <MenuItem value={setDate("15 Days", currentLog.create_on)}>
              15 Days
            </MenuItem>
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
          <FormHelperText sx={{ color: "blue" }}>{serviceDue}</FormHelperText>
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
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
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
              if (search && name.toLowerCase().includes(search.toLowerCase()))
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
        ></div>
      </div>
    </>
  );
};
export default ServiceForm;
