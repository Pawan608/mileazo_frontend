import styles from "./report.module.scss";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import printHistory from "../printHistory";

const Report = ({ serviceList }) => {
  const [cookies, setCookie] = useCookies("user");
  const handlePrintInvoice = (el, isMemo) => {
    // console.log("cuuuureeent", el);
    var mywindow = window.open("", "PRINT", "height=600,width=600");
    // console.log(print().innerHTML);
    mywindow.document.write(printHistory(el, cookies, isMemo).innerHTML);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    return true;
  };
  return (
    <>
      {" "}
      <div className={styles.main_container}>
        {serviceList?.length &&
          serviceList.map((el) => {
            return (
              <Box sx={{ margin: "10" }} className={styles.box}>
                <Card
                  variant="outlined"
                  sx={{ minWidth: "100", padding: "2rem" }}
                  className={styles.card}
                >
                  <div className={styles.flex_container}>
                    <div className={styles.flex_container_header}>
                      <div className={styles.model}>
                        <div
                          className="div"
                          style={{ fontSize: "1.5rem", fontWeight: "800" }}
                        >
                          {el.bike_model_name}
                        </div>
                        <div
                          className=""
                          style={{
                            color: "rgb(63, 61, 61)",
                            fontWeight: "800",
                          }}
                        >
                          Owner: {el.name}
                        </div>
                      </div>
                      <div className={styles.vehicle_number}>
                        <div
                          className="div"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "800",
                            color: "grey",
                          }}
                        >
                          {el.bike_no}
                        </div>
                        <div className="">Ph: +91 {el.mobile}</div>
                      </div>
                      <div className={styles.edit}></div>
                      <div className={styles.complete}></div>
                    </div>
                    <div className={styles.secondary}>
                      <div className={styles.secondary__first}>
                        <p>Date: {el.create_on}</p>
                        <div className={styles.type}>
                          Type:{" "}
                          <span className={styles.type_list}>
                            <h6>Repair</h6>
                            <h6>Service@ {el.current_km}km</h6>
                          </span>
                        </div>
                      </div>
                      <div className={styles.secondary__second}>
                        <div className={styles.secondary__heading}>Item</div>
                        <div className={styles.selected}>
                          {el.sdq?.length &&
                            el.sdq.map((elem) => {
                              return <span>{elem.service_name}</span>;
                            })}
                          {/* <span>Light Repair</span>
                  <span>Oil Change</span> */}
                        </div>
                      </div>
                    </div>
                    <div className={styles.tertiary}>
                      <h3 className={styles.tertiary__heading}>
                        Cost:{" "}
                        <CurrencyRupeeIcon size="large"></CurrencyRupeeIcon>
                        {el.service_amount}
                      </h3>
                      <div className={styles.tertiary__buttons}>
                        <Button
                          variant="contained"
                          sx={{ background: "#E18810" }}
                          onClick={(e) => {
                            handlePrintInvoice(el, true);
                          }}
                        >
                          Memo
                        </Button>
                        {/* <Button
                    variant="contained"
                    sx={{ background: "#1098E1" }}
                  >
                    Estimation
                  </Button> */}
                        <Button
                          variant="contained"
                          sx={{ background: "#F05917" }}
                          onClick={(e) => {
                            handlePrintInvoice(el);
                          }}
                        >
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Box>
            );
          })}
      </div>
    </>
  );
};
export default Report;
