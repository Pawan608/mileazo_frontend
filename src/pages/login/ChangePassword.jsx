import { Box, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ChangePassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [cookies] = useCookies("user");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      currentPassword: data.get("curr_password"),
    };
    if (
      actualData.password &&
      actualData.password_confirmation &&
      actualData.currentPassword
    ) {
      if (actualData.password === actualData.password_confirmation) {
        console.log(actualData);
        const userId = cookies.user?.profile_data[0]?.profile?.user_id;
        const data = await fetch(process.env.REACT_APP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            old_password: actualData.currentPassword,
            reset_password: actualData.password_confirmation,
            new_password: actualData.password,
            purpose: "CHANGE_PASSWORD",
          }),
        });
        const res = await data.json();
        // console.log(res);
        // if (res.data && res.data.status === "1") {
        //   // setInvoices(res.data.invoices);
        // }
        // document.getElementById("password-change-form").reset();
        setError({
          status: true,
          msg: res.data.message,
          type: "success",
        });
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          maxWidth: 600,
          mx: 4,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          id="password-change-form"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="curr_password"
            label="Current Password"
            type="password"
            id="curr_password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Confirm New Password"
            type="password"
            id="password_confirmation"
          />
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              {" "}
              Update{" "}
            </Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
