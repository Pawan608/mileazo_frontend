import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddIcon from "@mui/icons-material/Add";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, Outlet, NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Sidebar = () => {
  const [cookies, removeCookie] = useCookies("user");
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="side_container">
        <div className="sidebar">
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logo">
                <img
                  src={require("../../images/MileaZo_Logo.png")}
                  className="logo_img"
                  alt=""
                />
              </div>
            </Link>
          </div>
          <hr />
          <div className="center">
            <ul>
              <p className="title">MAIN</p>
              <NavLink
                exact
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
                to="/"
                style={{ textDecoration: "none" }}
              >
                <li>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </li>
              </NavLink>
              <p className="title">SERVICE</p>
              <NavLink
                to="/service"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
              >
                <li>
                  <AddIcon className="icon" />
                  <span>Add Service</span>
                </li>
              </NavLink>
              <NavLink
                to="/logs"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
              >
                <li>
                  <PsychologyOutlinedIcon className="icon" />

                  <span>Pending Services</span>
                </li>
              </NavLink>
              <NavLink
                to="/history"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
              >
                <li>
                  <PsychologyOutlinedIcon className="icon" />

                  <span>History</span>
                </li>
              </NavLink>
              <NavLink
                to="/setting"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
              >
                <li>
                  <PsychologyOutlinedIcon className="icon" />

                  <span>Setting</span>
                </li>
              </NavLink>
              {/* <p className="title">LISTS</p>
              <NavLink
                to="/users"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
              >
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </NavLink>
              <NavLink
                to="/products"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
              >
                <li>
                  <StoreIcon className="icon" />
                  <span>Products</span>
                </li>
              </NavLink> */}
              {/* <p className="title">USEFUL</p>
              <li>
                <InsertChartIcon className="icon" />
                <span>Stats</span>
              </li>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Notifications</span>
              </li> */}

              <p className="title">USER</p>
              <NavLink
                to="/profile"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active_link" : "inactive"
                }
              >
                <li>
                  <AccountCircleOutlinedIcon className="icon" />

                  <span>Profile</span>
                </li>
              </NavLink>
              <li
                // onClick={() => {
                //   removeCookie("user");
                //   navigate("/login");
                // }}
                onClick={handleClickOpen}
              >
                <ExitToAppIcon className="icon" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
          <div className="bottom">
            <div
              className="colorOption"
              onClick={() => dispatch({ type: "LIGHT" })}
            ></div>
            <div
              className="colorOption"
              onClick={() => dispatch({ type: "DARK" })}
            ></div>
          </div>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{" Are You sure, you want to Logout?"}</DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are You sure, you want to Logout?
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                removeCookie("user");
                navigate("/login");
                handleClose();
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
