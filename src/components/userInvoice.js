import React from "react";
import "./invoice.scss";
import { useCookies } from "react-cookie";

const userInvoice = (currentLog, cookies, isMemo) => {
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
     Receipt
    </div>
    <div style="display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 2px solid black;">
      <div style="display: flex;
      flex-direction: column;">
        <div style="font-weight: 600;
        font-size: 1.4rem;">Company Name</div>
        <div className={container_seller_list}>
          Shop Name: ${"MileaZo Private Limited"}
        </div>
        <div className={container_seller_list}>
          ${"Office No. 225 @nd floor Balaji Tower 6th Main Tonk Road"}
        </div>
        <div className={container_seller_list}>
          ${"Durgapur Jaipur (Raj.) 302018"}
        </div>
      </div>

      <div style="display: flex;
      flex-direction: column;">
        <div className={container_seller_list}>Bill Date: ${
          currentLog.created_at
        }</div>
        <div className={container_seller_list}>
          Bill No: ${currentLog?.coupon_id}
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
        <div className={container_user_list}>Shop Name: ${
          profile?.shop_name
        }</div>
        <div className={container_user_list}>Mobile:${
          profile?.mobile_number
        }</div>
      </div>

      <div style="display: flex;
      flex-direction: column;">
        <div className={container_user_list}>
          Address: ${profile?.address}
        </div>
        <div className={container_user_list}>
          Bill Period:${
            " " +
            new Date(currentLog.created_at).toDateString() +
            " " +
            "TO" +
            " " +
            new Date(currentLog.expiry_date).toDateString()
          }
        </div>
      </div>
    </div>
    <div style="display: flex;
        flex-direction: row;
        justify-content: stretch;">
      <div style="display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      flex: 6;align-self:flex-start">
        <div
     style=" font-size: 1.2rem;
     font-weight: 600;
     padding: 0.6rem;
     border-top: 1px solid black;
     border-left: 1px solid black;
     border-bottom: 1px solid black;"
        >
          Plan name
        </div>
 <div style="padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-bottom: 1px solid black;"
            >
             ${currentLog.name}
            </div>

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
          Month
        </div>
        <div style="padding: 0.6rem;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-bottom: 1px solid black;">${Math.abs(
          Math.floor(
            (new Date(currentLog.expiry_date).valueOf() -
              new Date(currentLog.created_at).valueOf()) /
              (30 * 24 * 60 * 1000 * 60)
          )
        )}</div>
        <div style="padding: 0.6rem;
        border-top: 1px solid white;
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        align-self: flex-end;">
          Rate
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
        align-self: flex-end;">
          Total
        </div>
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
    <div style="padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${currentLog.amount}</div>
     <div style="      padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${currentLog.amount}</div>
          <div style="      padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${
            currentLog.discount || "0.00"
          }</div>
          <div style="      padding: 0.6rem;
          border-top: 1px solid black;
          border-left: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;">${
            currentLog.amount - currentLog.discount || "0.00"
          }</div>
      </div>
    </div>
    </div>`;
    container.innerHTML = html;
    return container;
  }
  container.innerHTML = html;
  return container;
};
export default userInvoice;
