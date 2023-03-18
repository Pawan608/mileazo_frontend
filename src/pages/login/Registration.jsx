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
const Registration = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [showOTPForm, setOTPForm] = useState(false);
  const [otp, setOTP] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const handleOTP = async (e) => {
    e.preventDefault();
    if (otp) {
      const data = await fetch(process.env.REACT_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          otp,
          purpose: "OTP",
        }),
      });
      const res = await data.json();
      console.log(res);
      if (res.data?.status == "1") {
        setError({
          status: true,
          msg: res.data.message,
          type: "success",
        });
        setId(res.data.id);
        console.log(id);
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
      name: data.get("name"),
      number: data.get("number"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      shop_name: data.get("shop_name"),
      tc: data.get("tc"),
    };
    if (
      actualData.name &&
      actualData.number &&
      actualData.password &&
      actualData.password_confirmation &&
      actualData.tc !== null
    ) {
      if (actualData.password === actualData.password_confirmation) {
        console.log(actualData);
        const data = await fetch(process.env.REACT_APP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: actualData.name,
            password1: actualData.password,
            password2: actualData.password_confirmation,
            email: "",
            mobile_number: actualData.number,
            type: "4",
            shop_name: actualData.shop_name,
            purpose: "REGISTER",
          }),
        });
        const res = await data.json();
        console.log(res);
        if (res.data?.status == "1") {
          setError({
            status: true,
            msg: res.data.message,
            type: "success",
          });
          setId(res.data.id);
          console.log(id);
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
        setError({
          status: true,
          msg: "Password and Confirm Password Doesn't Match",
          type: "error",
        });
      }
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
          id="name"
          name="name"
          label="Name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="shop_name"
          name="shop_name"
          label="Shop Name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="number"
          name="number"
          label="Number"
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
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password_confirmation"
          name="password_confirmation"
          label="Confirm Password"
          type="password"
        />
        <FormControlLabel
          control={<Checkbox value="agree" color="primary" name="tc" id="tc" />}
          label="I agree to term and condition."
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
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              JOIN
            </Button>
            <div onClick={handleSubmit} style={{ cursor: "Pointer" }}>
              Resend ?
            </div>
          </Box>
        </form>
      )}
    </>
  );
};

export default Registration;
