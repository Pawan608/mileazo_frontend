import React from "react";

const print = (currentLog) => {
  console.log(currentLog);
  const container = document.createElement("div");
  //   var html;
  if (currentLog) {
    const html = `<h2>Mileazo</h2>
    <p>
      <strong>Invoice Number:</strong>${currentLog.invoice_no || ""}
    </p>
    <p>
      <strong>Service ID:</strong>${currentLog.id}
    </p>
    <p>
      <strong>Company:</strong>${currentLog.bike_company_name}
    </p>
    <p>
      <strong>Vehicle Model:</strong>${currentLog.bike_model_name}
    </p>
    <p>
      <strong>Vehicle Number:</strong>${currentLog.bike_no}
      <strong>Service Amount:</strong>${currentLog.service_amount}
    </p>
    <p>
      <strong>Services:</strong>${currentLog.sdq?.map((el) => el.service_name)}
    </p>
    <p>
      <strong>Service Next Date:</strong>${currentLog.service_next_date}
    </p>
    <p>
      <strong>Name:</strong>${currentLog.name}
    </p>
    <p>
      ${
        currentLog.address
          ? `<p>
            <strong>Address:</strong>${currentLog.address}
          </p>`
          : ""
      }
    </p>
    <p>
      <strong>GST Number:</strong>${currentLog.gstin || ""}
    </p>
    <p>
      <strong>Mobile:</strong>${currentLog.mobile}
    </p>
    <p>
      <strong>Name:</strong>${currentLog.name}
    </p>`;
    container.innerHTML = html;
    return container;
  }
  //   container.innerHTML = html;
  return container;
};
export default print;
