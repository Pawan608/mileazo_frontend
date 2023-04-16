import React from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import parse from "html-react-parser";
const Widget = ({ type, wiz_data }) => {
  let data;

  //temporary
  // const amount = 100;
  const diff = 30;

  switch (type) {
    case "Services":
      data = {
        title: "Services",
        isMoney: false,
        link: "See all users",
        amount: wiz_data?.length || "...",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Pending":
      data = {
        title: "Pending",
        isMoney: false,
        link: "View all orders",
        amount: wiz_data?.length || "...",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        amount:
          wiz_data.reduce((acc, curr) => {
            return Number(curr.service_amount) + acc;
          }, 0) || "...",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && parse("&#8377;")} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
