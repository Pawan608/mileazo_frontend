import styles from "./profile.module.scss";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import profile_pic from "./default-user-pic.jpg";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies("user");
  // console.log(cookies.user);
  let user = cookies.user;
  // console.log("useeer", user);
  const [formInput, setFormInput] = useState({
    shop: {
      value: user.profile_data[0].profile.shop_name || "",
      isValid: true,
    },
    name: { value: user.profile_data[0].first_name || "", isValid: true },
    srv_center_number: {
      value: user.profile_data[0].profile.servicecentrenumber || "",
      isValid: true,
    },
    email: { value: user.profile_data[0].email || "", isValid: true },
    address: {
      value: user.profile_data[0].profile.address || "",
      isValid: true,
    },
    pincode: {
      value: user.profile_data[0].profile.pincode || "",
      isValid: true,
    },
    gstId: { value: user.profile_data[0].profile.gst_no || "", isValid: true },
  });
  const [showModal, setShowModal] = useState({
    isShow: false,
    status: "1",
    message: "",
  });
  // console.log(formInput);
  const handleChange = (e) => {
    const name = e.target.name;
    setFormInput((el) => {
      // el[name].value = e.target.value;
      // console.log(el);
      return { ...el, [name]: { value: e.target.value, isValid: false } };
    });
  };
  const getProfileData = async () => {
    const user_type = cookies.user?.profile_data[0]?.profile?.user_type;
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    // console.log(userId);
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        purpose: "PROFILE",
      }),
    });
    const res = await data.json();
    return res;
  };
  useEffect(() => {
    getProfileData();
  }, []);
  useEffect(() => {
    if (showModal.isShow == true) {
      setTimeout(() => {
        setShowModal({ isShow: false, message: "", status: "0" });
      }, 3000);
    }
  }, [showModal]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        servicecentrenumber: formInput.srv_center_number.value,
        email: formInput.email.value,
        first_name: formInput.name.value,
        last_name: "",
        dob: "12-12-2015",
        address: formInput.address.value,
        shop_name: formInput.shop.value,
        gender: "M",
        adahar_card: "",
        pancard: "",
        lng: "",
        lat: "",
        device_id: "",
        pincode: formInput.pincode.value,
        gst_no: formInput.gstId.value,
        status: "1",
        // remarks: remark,
        // time: String(time),
        // gstin: gstNumber,
        // address: address,
        // type: user_type,
        purpose: "UPDATE_PROFILE",
      }),
    });
    const res = await data.json();
    // console.log(res.data.status);
    if (res.data.status == 1) {
      setShowModal({
        isShow: true,
        status: "1",
        message: res.data.message,
      });
      const profile = await getProfileData();
      // console.log(profile);
      user.profile_data = profile.data.profile_data;
      // console.log(user);
      removeCookie("user");
      setCookie("user", JSON.stringify(user), {
        maxAge: 3600 * 24 * 90,
      });
    } else {
      setShowModal({
        isShow: true,
        status: "error",
        message: res.data?.message,
      });
    }
  };
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
              <div className={styles.img_container}>
                <input
                  type="file"
                  className={styles.input_image}
                  accept="image/*"
                  id="input_image"
                  alt="img"
                  onChange={(e) => {
                    // console.log(document.querySelector('img[alt="profile_pic"]'));
                    const reader = new FileReader();
                    reader.onloadend = function (e) {
                      // console.log("reader", e.target);
                      document
                        .querySelector('img[alt="profile_pic"]')
                        .setAttribute("src", e.target.result);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }}
                />
                <img
                  src={profile_pic}
                  alt="profile_pic"
                  className={styles.img_show}
                />
                <label htmlFor="input_image" className={styles.img_label}>
                  <PhotoCamera />
                </label>
              </div>
              <TextField
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "20px" }}
                label="Enter Shop Name"
                value={formInput.shop.value}
                onInput={handleChange}
                required
                name="shop"
              />
              <TextField
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "20px" }}
                label="Name"
                required
                value={formInput.name.value}
                onInput={handleChange}
                name="name"
              />
              <TextField
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                // label="Number"
                value={"7061329220"}
                type="number"
                disabled={true}
              />
              <TextField
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                label="Service Center Number"
                value={formInput.srv_center_number.value}
                // helperText={mobileNumber.message}
                error={!formInput.srv_center_number.isValid}
                onInput={(e) => {
                  let regex = new RegExp(/^[1-9]{1}[0-9]{9}$/);
                  const name = e.target.name;
                  if (regex.test(e.target.value) == true) {
                    setFormInput((el) => {
                      el[name].isValid = true;
                      return {
                        ...el,
                        [name]: { value: e.target.value, isValid: true },
                      };
                    });
                  } else {
                    setFormInput((el) => {
                      el[name].isValid = false;
                      return {
                        ...el,
                        [name]: { value: e.target.value, isValid: false },
                      };
                    });
                  }
                  // handleChange(e);
                }}
                type="number"
                name="srv_center_number"
              />
              <TextField
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                label="Email ID"
                value={formInput.email.value}
                onInput={handleChange}
                type="email"
                name="email"
              />
              <TextField
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                label="Shop Address"
                // value={amount}
                value={formInput.address.value}
                onInput={handleChange}
                name="address"
              />
              <TextField
                sx={{ width: ".49", margin: "5px", ml: "0px", mt: "8px" }}
                label="Pincode"
                value={formInput.pincode.value}
                onInput={handleChange}
                type="number"
                name="pincode"
              />
              <TextField
                sx={{ width: ".49", margin: "5px", mr: "0px", mt: "8px" }}
                label="User Id"
                value={user.profile_data[0].id}
                // onInput={handleChange}
                name="gstId"
                disabled
              />
              <TextField
                sx={{ margin: "5px", ml: "0px", mt: "8px" }}
                label="GSTIN/UIN"
                value={formInput.gstId.value}
                onInput={handleChange}
                name="gstId"
                size="large"
                fullWidth
              />
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
                  sx={{ ml: "auto", mr: "auto", mt: "8px" }}
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
