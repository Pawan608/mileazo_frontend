import React from "react";
import styles from "./invoice.scss";
const Invoice = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_logo}>
          <img src={require("./../images/MileaZo_Logo.png")} alt="" />
          Invoice
        </div>
        <div className={styles.container_seller}>
          <div className={styles.container_seller_left}>
            <div className={styles.container_seller_heading}>Seller</div>
            <div className={styles.container_seller_list}>
              Shop Name: Hero Service Center
            </div>
            <div className={styles.container_seller_list}>
              Mobile: 7061329220
            </div>
            <div className={styles.container_seller_list}>
              Address: Sahdeo Nagar Ranchi Jharkhand
            </div>
          </div>

          <div className={styles.container_seller_right}>
            <div className={styles.container_seller_list}>Date: 31-01-2023</div>
            <div className={styles.container_seller_list}>
              GSTIN/UIN: HDVDV17353678374
            </div>
            <div className={styles.container_seller_list}>
              Invoive#: SE/2023/36196/01/072
            </div>
          </div>
        </div>
        <div className={styles.container_user}>
          <div className={styles.container_user_left}>
            <div className={styles.container_user_heading}>Bill To</div>
            <div className={styles.container_user_list}>Name: Manish</div>
            <div className={styles.container_user_list}>Mobile: 7061329220</div>
          </div>

          <div className={styles.container_seleer_right}>
            <div className={styles.container_user_list}>
              Vehicle Number: JH01BR0698
            </div>
            <div className={styles.container_user_list}>
              Vehicle Name: Maruti Suzuki
            </div>
            <div className={styles.container_user_list}>Vehicle KM: 8000KM</div>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.table_description}>
            <div
              className={
                styles.table_description_heading +
                " " +
                styles.table_description_list
              }
            >
              Description
            </div>
            <div className={styles.table_description_list}>
              5W-30 Engine Oil
            </div>
            <div className={styles.table_description_list}>
              6 Month Package Daily Cleaning
            </div>
            <div className={styles.table_description_list}>
              A/C DISHCHARGE PIPE
            </div>
            <div className={styles.table_description_list}>
              A/C SUCTION PIPE
            </div>
            <div className={styles.table_description_list}>ABS Pump</div>
            <div className={styles.table_description_list_borderless}>
              Subtotal
            </div>
            <div className={styles.table_description_list_borderless}>
              Discount
            </div>
            <div className={styles.table_description_list_borderless}>GST</div>
            <div className={styles.table_description_list_borderless}>
              Total
            </div>
          </div>

          <div className={styles.table_amount}>
            <div
              className={
                styles.table_amount_heading + " " + styles.table_amount_list
              }
            >
              Amount
            </div>
            <div className={styles.table_amount_list}>250.00</div>
            <div className={styles.table_amount_list}>250.00</div>
            <div className={styles.table_amount_list}>250.00</div>
            <div className={styles.table_amount_list}>250.00</div>
            <div className={styles.table_amount_list}>250.00</div>
            <div className={styles.table_amount_list}>250.00</div>
            <div className={styles.table_amount_list}>0.00</div>
            <div className={styles.table_amount_list}>0.00</div>
            <div className={styles.table_amount_list}>250.00</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Invoice;
