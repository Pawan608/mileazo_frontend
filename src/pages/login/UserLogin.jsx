import { TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

const UserLogin = () => {
  const [cookies, setCookie] = useCookies("user");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (actualData.email && actualData.password) {
      const data = await fetch(process.env.REACT_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: actualData.email,
          password: actualData.password,
          type: "4",
          purpose: "LOGIN",
        }),
      });
      const response = await data.json();
      console.log(response);

      //  document.getElementById("login-form").reset();
      setError({
        status: true,
        msg: response.data.message,
        type: response.data.status == 0 ? "error" : "success",
      });

      if (response.data.status == "1") {
        setCookie("user", JSON.stringify(response.data), {
          maxAge: 3600 * 24 * 90,
        });
        navigate("/");
      }
      // navigate("/dashboard");
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Phone Number"
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
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Login
          </Button>
        </Box>
        <NavLink to="/sendpasswordresetemail">Forgot Password ?</NavLink>
        {error.status ? (
          <Alert severity={error.type} sx={{ mt: 3 }}>
            {error.msg}
          </Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserLogin;
