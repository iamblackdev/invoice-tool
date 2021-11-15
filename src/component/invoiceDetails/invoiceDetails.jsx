import React from "react";
import { formatTime } from "../../context/formatTime";
import { convertToDecimal } from "../../utils/convertTodecimal";

import "./styles.scss";

const InvoiceDetails = ({
  user,
  products,
  orderNo,
  discount,
  tax,
  taxAmount,
  discountAmount,
  subTotal,
  grandTotal,
  date,
}) => {
  return (
    <>
      <div className="invoice-details-wrapper">
        <h5 className="heading">invoice details</h5>
        <div className="invoice-details">
          <div className="hearder">
            <div className="invoice">
              <span>Invoice</span>
              <span>#inv{orderNo}</span>
              <span>{formatTime(date)}</span>
            </div>
            <div className="customer-details">
              <div className="details">
                <span>Customer Details</span>
                <span>{user?.fullName}</span>
                <span>{user?.email}</span>
              </div>
              <div className="print-btn" onClick={() => window.print()}>
                <span>PRINT</span>
                <img src="/images/printer-blue.png" alt="print" />
              </div>
            </div>
          </div>
          <div className="invoice-table">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {products?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item?.name}</td>
                    <td>{item?.quantity}</td>
                    <td>{convertToDecimal(item?.price)}</td>
                  </tr>
                ))}

                <tr>
                  <td></td>
                  <td>
                    <div style={{ textAlign: "left", marginLeft: "47%" }}>
                      <span className="label">Sub Total</span>
                      <span className="label">Tax ({tax}%)</span>
                      <span className="label">Discount ({discount}%)</span>
                      <span className="grand-total">Grand Total</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "right", marginRight: "40%" }}>
                      <span className="value">
                        ₹ {convertToDecimal(subTotal)}
                      </span>
                      <span className="value">
                        ₹ {convertToDecimal(taxAmount)}
                      </span>
                      <span className="value">
                        ₹ {convertToDecimal(discountAmount)}
                      </span>
                      <span className="grand-total">
                        ₹ {convertToDecimal(grandTotal)}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
