import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useCookies } from "react-cookie";
import print from "./print";
const InvoiceForm = ({
  currentLog,
  submitInvoice,
  setSubmitInvoice,
  isMemo,
}) => {
  // console.log(currentLog);
  const [amountList, setAmountList] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [gst, setGST] = useState(0.0);
  const [total, setTotal] = useState(0);
  const [cookies, setCookie] = useCookies("user");
  useEffect(() => {
    currentLog?.sdq?.map((el) => {
      setAmountList((e) => {
        let obj = { ...e };
        obj[`${el.id}`] = el.amount;
        return obj;
      });
    });
    setDiscount(currentLog.discount);
    setGST(currentLog.gst);
    setTotal(currentLog.service_amount);
  }, []);
  // console.log(amountList);
  useEffect(() => {
    setSubTotal(() => {
      return Object.values(amountList).reduce(
        (acc, current) => Number(acc) + Number(current),
        0
      );
    });
  }, [amountList]);
  // console.log(subTotal);
  useEffect(() => {
    setTotal(Number(subTotal) + Number(gst) - Number(discount));
  }, [discount, gst, subTotal]);
  // console.log(amountList);
  const createInvoice = async () => {
    const shopName = cookies.user?.profile_data[0]?.profile?.shop_name
      .slice(0, 2)
      .toUpperCase();
    const serviceDetails = Object.keys(amountList).map((el) => {
      return `${el}@${amountList[el]}`;
    });
    const serviceDetailsString = serviceDetails.join("##");
    // console.log(serviceDetailsString);
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentLog.user_id_id,
        invoice: shopName,
        serviceId: currentLog.id,
        discount,
        gst,
        serviceDetails: serviceDetailsString,
        purpose: "UPDATE_INVOICE_DETAILS",
      }),
    });
    const res = await data.json();

    console.log(res);
    if (res?.data?.status == "1") {
      setSubmitInvoice(false);
      var mywindow = window.open("", "PRINT", "height=600,width=600");
      mywindow.document.write(
        print(
          currentLog,
          amountList,
          discount,
          subTotal,
          gst,
          total,
          cookies,
          res.data.invoice_no,
          isMemo
        ).innerHTML
      );
      mywindow.document.close();
      mywindow.focus();
      mywindow.print();
      return true;
    }
  };
  // console.log("current log", currentLog);
  useEffect(() => {
    // console.log(submitInvoice);
    if (submitInvoice) {
      // console.log(currentLog);
      createInvoice();
    }
  }, [submitInvoice]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {currentLog.sdq?.map((e) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {e.service_name}
              <TextField
                required
                sx={{ width: ".49", margin: "5px", ml: "auto", mt: "8px" }}
                id="outlined-error-km-text"
                label="value"
                //   helperText={bikeNumber.message}
                name={e.id}
                value={amountList[`${e.id}`]}
                onInput={(element) => {
                  setAmountList((el) => {
                    var obj = { ...el };
                    obj[`${e.id}`] = element.target.value;
                    return obj;
                  });
                }}
                type="number"
              />
            </div>
          );
        })}
        {!isMemo ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              <p className="">Subtotal</p>
              <p
                className=""
                style={{ marginRight: "auto", marginLeft: "auto" }}
              >
                {subTotal ? subTotal : "0.00"}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              <p className="">Discount</p>
              <TextField
                required
                sx={{ width: ".49", margin: "5px", ml: "auto", mt: "8px" }}
                id="outlined-error-km-text"
                label="value"
                //   helperText={bikeNumber.message}
                // name={e.id}
                value={discount}
                onInput={(element) => {
                  setDiscount(element.target.value);
                }}
                type="number"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              <p className="">GST</p>
              <TextField
                required
                sx={{ width: ".49", margin: "5px", ml: "auto", mt: "8px" }}
                id="outlined-error-km-text"
                label="value"
                //   helperText={bikeNumber.message}
                // name={e.id}
                value={gst}
                onInput={(element) => {
                  setGST(element.target.value);
                }}
                type="number"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              <p className="">Total</p>
              <p
                className=""
                style={{ marginRight: "auto", marginLeft: "auto" }}
              >
                {total ? total : "0.00"}
              </p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default InvoiceForm;
