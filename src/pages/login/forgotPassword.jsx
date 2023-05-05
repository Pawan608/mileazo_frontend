import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { NavLink } from "react-router-dom";
const ForgotPassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [showOTPForm, setOTPForm] = useState(false);
  const [otp, setOTP] = useState();
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [number, setNumber] = useState();
  const navigate = useNavigate();
  const handleOTP = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      return setError({
        status: true,
        msg: "Password and Confirm Password Doesn't Match",
        type: "error",
      });
    }
    if (otp) {
      const data = await fetch(process.env.REACT_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_no: number,
          otp,
          reset_password: password.password,
          purpose: "FORGOT_PASSWORD_CONFIRM",
        }),
      });
      const res = await data.json();
      //   console.log("otp", res);
      if (res.data?.status == "1") {
        setError({
          status: true,
          msg: res.data.message,
          type: "success",
        });
        setOTPForm(true);
        navigate("/login");
      } else {
        setError({
          status: true,
          msg: res.data?.message,
          type: "error",
        });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      number: data.get("number"),
    };
    ////setting Number
    setNumber(actualData.number);
    if (actualData.number) {
      //   console.log(actualData);
      const data = await fetch(process.env.REACT_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_no: actualData.number,
          purpose: "FORGOT_PASSWORD",
        }),
      });
      const res = await data.json();
      //   console.log("otp se phle", res);
      if (res.data?.status == "1") {
        setError({
          status: true,
          msg: res.data.message,
          type: "success",
        });
        setOTPForm(true);
      } else {
        setError({
          status: true,
          msg: res.data?.message,
          type: "error",
        });
      } // document.getElementById("registration-form").reset();

      // navigate("/dashboard");
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };
  return (
    <>
      {error.status ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity={error.type}>{error.msg}</Alert>
        </Stack>
      ) : (
        ""
      )}

      <form
        component="form"
        noValidate
        sx={{ mt: 1, height: 1.5 }}
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="number"
          name="number"
          label="Number"
          type="number"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Get OTP
          </Button>
        </Box>
      </form>
      {showOTPForm && (
        <form action="" className="form" onSubmit={handleOTP}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={otp}
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            id="otp"
            name="number"
            label="OTP"
            type="number"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword((prevValue) => {
                return { ...prevValue, password: e.target.value };
              });
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password_confirmation"
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            onChange={(e) => {
              setPassword((prevValue) => {
                return { ...prevValue, confirmPassword: e.target.value };
              });
            }}
          />
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Reset
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
