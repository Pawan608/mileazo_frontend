import styles from "./setting.module.scss";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChangePassword from "../login/ChangePassword";
import { useCookies } from "react-cookie";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import userInvoice from "../../components/userInvoice";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Setting = () => {
  const [cookies, setCookie] = useCookies("user");
  const [value, setValue] = React.useState(0);
  const [invoices, setInvoices] = React.useState([]);
  const getInvoice = async () => {
    const userId = cookies.user?.profile_data[0]?.profile?.user_id;
    const data = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        purpose: "USER_INVOICES",
        user_id: userId,
      }),
    });
    const res = await data.json();
    console.log(res);
    if (res.data && res.data.status === "1") {
      setInvoices(res.data.invoices);
    }
  };
  React.useEffect(() => {
    getInvoice();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePrintInvoice = (el) => {
    console.log("user Invoice", el);
    var mywindow = window.open("", "PRINT", "height=600,width=600");
    // console.log(print().innerHTML);
    mywindow.document.write(userInvoice(el, cookies).innerHTML);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    return true;
  };
  console.log(invoices);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Invoices" {...a11yProps(0)} />
            <Tab label="Reports" {...a11yProps(1)} />
            <Tab label="Change Password" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={styles.container}>
            {invoices.length
              ? invoices.map((el) => (
                  <div className={styles.box}>
                    <div className={styles.box_date}>
                      <span className={styles.box_heading}>Bill Date: </span>
                      <span className={styles.box_info}>{el.created_at}</span>
                    </div>
                    <div className={styles.box_id}>
                      <span className={styles.box_heading}>Bill Id: </span>
                      <span className={styles.box_info}>{el.coupon_id}</span>
                    </div>
                    <div className={styles.box_value}>
                      <span className={styles.box_heading}>RS </span>
                      <span className={styles.box_info}>{el.amount}</span>
                    </div>
                    <div className={styles.box_button}>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{ userSelect: "none" }}
                        onClick={() => {
                          handlePrintInvoice(el);
                        }}
                      >
                        <DownloadIcon fontSize="medium" />
                      </IconButton>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Reports
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ChangePassword></ChangePassword>
        </TabPanel>
      </Box>
    </>
  );
};
export default Setting;
