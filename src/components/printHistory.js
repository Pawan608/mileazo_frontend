import React from "react";
import "./invoice.scss";
import { useCookies } from "react-cookie";

const printHistory = (currentLog, cookies, isMemo) => {
  console.log(currentLog);
  const container = document.createElement("div");
  // console.log(cookies);
  const profile = cookies?.user?.profile_data[0].profile;
  console.log(currentLog, "hey", cookies);
  var html;
  container.classList.add(`container`);
  if (currentLog) {
    const html = `
      <div style="margin: 2rem auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      width: 80%;">
      <div style="width: 5rem;
      height: 5rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 800;
      object-fit: cover;">
      <img src=${require("./../images/MileaZo_Logo.png")} alt="" style="width: 100%;
      height: 100%;
      object-fit: contain;"/>
      Invoice
    </div>
    <div style="display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 2px solid black;">
      <div style="display: flex;
      flex-direction: column;">
        <div style="font-weight: 600;
        font-size: 1.4rem;">Seller</div>
        <div className={container_seller_list}>
          Shop Name: ${profile?.shop_name}
        </div>
        <div className={container_seller_list}>
          Mobile: ${profile?.mobile_number}
        </div>
        <div className={container_seller_list}>
          Address: ${profile?.address}
        </div>
      </div>

      <div style="display: flex;
      flex-direction: column;">
        <div className={container_seller_list}>Date: ${
          currentLog.create_on
        }</div>
        <div className={container_seller_list}>
          GSTIN/UIN: ${currentLog?.gstin}
        </div>
        <div className={container_seller_list}>
          Invoive#: ${currentLog.invoice_no}
        </div>
      </div>
    </div>
    <div style="display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;">
      <div style="display: flex;
      flex-direction: column;">
        <div style="font-weight: 600;
        font-size: 1.4rem;">Bill To</div>
        <div className={container_user_list}>Name: ${currentLog.name}</div>
        <div className={container_user_list}>Mobile:${currentLog.mobile}</div>
      </div>

      <div style="display: flex;
      flex-direction: column;">
        <div className={container_user_list}>
          Vehicle Number: ${currentLog.bike_no}
        </div>
        <div className={container_user_list}>
          Vehicle Name:${currentLog.bike_model_name}
        </div>
        <div className={container_user_list}>Vehicle KM: ${
          currentLog.current_km
        }</div>
      </div>
    </div>
    <div style="display: flex;
    flex-direction: row;
    justify-content: stretch;">
      <div style="display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      flex: 6;">
        <div
     style=" font-size: 1.2rem;
     font-weight: 600;
     padding: 0.6rem;
     border-top: 1px solid black;
     border-left: 1px solid black;
     border-bottom: 1px solid black;"
        >
          Description
        </div>
        ${currentLog.sdq
          .map((el) => {
            return `<div style="padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-bottom: 1px solid black;"
            >
             ${el.service_name}
            </div>`;
          })
          .join("")}
        ${
          !isMemo
            ? `<div style="padding: 0.6rem;
        border-top: 1px solid white;
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        align-self: flex-end;">
          Subtotal
        </div>
        <div style="padding: 0.6rem;
        border-top: 1px solid white;
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        align-self: flex-end;">
          Discount
        </div>
        <div style="padding: 0.6rem;
        border-top: 1px solid white;
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        align-self: flex-end;">GST</div>
        <div style="padding: 0.6rem;
        border-top: 1px solid white;
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        align-self: flex-end;">
          Total
        </div>
    `
            : ""
        }
        </div>

      <div style="display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      flex: 2;">
        <div
        style="font-size: 1.2rem;
        font-weight: 600;
        padding: 0.6rem;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-bottom: 1px solid black;"
        >
          Amount
        </div>
        ${currentLog.sdq
          ?.map((el) => {
            return `<div style="padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${el.amount}</div>`;
          })
          .join("")}
          ${
            !isMemo
              ? `  <div style="      padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${currentLog.sdq.reduce(
            (acc, curr) => acc + Number(curr.amount),
            0
          )}</div>
          <div style="      padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${
            currentLog.discount ? currentLog.discount : "0.00"
          }</div>
          <div style="      padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${currentLog.gst || "0.00"}</div>
          <div style="      padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${
            currentLog.service_amount || "0.00"
          }</div>`
              : ""
          }

      </div>
    </div>
    </div>`;
    container.innerHTML = html;
    return container;
  }
  container.innerHTML = html;
  return container;
};
export default printHistory;
