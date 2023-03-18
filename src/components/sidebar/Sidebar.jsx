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
import { Link, Outlet } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [cookies, removeCookie] = useCookies("user");
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  return (
    <>
      <div className="side_container">
        <div className="sidebar">
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">Mileazo</span>
            </Link>
          </div>
          <hr />
          <div className="center">
            <ul>
              <p className="title">MAIN</p>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
              <p className="title">LISTS</p>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Products</span>
                </li>
              </Link>
              <p className="title">USEFUL</p>
              <li>
                <InsertChartIcon className="icon" />
                <span>Stats</span>
              </li>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Notifications</span>
              </li>
              <p className="title">SERVICE</p>
              <li>
                <AddIcon className="icon" />
                <Link to="/service" style={{ textDecoration: "none" }}>
                  <span>Add Service</span>
                </Link>
              </li>
              <li>
                <PsychologyOutlinedIcon className="icon" />
                <Link to="/logs" style={{ textDecoration: "none" }}>
                  <span>Logs</span>
                </Link>
              </li>
              <li>
                <PsychologyOutlinedIcon className="icon" />
                <Link to="/history" style={{ textDecoration: "none" }}>
                  <span>History</span>
                </Link>
              </li>
              <li>
                <SettingsApplicationsIcon className="icon" />
                <span>Settings</span>
              </li>
              <p className="title">USER</p>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <span>Profile</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  removeCookie("user");
                  navigate("/login");
                }}
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
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
