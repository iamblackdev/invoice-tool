import React from "react";
import { formatTime } from "../../context/formatTime";
import { convertToDecimal } from "../../utils/convertTodecimal";

import "./styles.scss";

const InvoiceCard = ({
  onClick,
  user,
  orderNo,
  products,
  grandTotal,
  active,
  date,
}) => {
  return (
    <div
      className={`invoice-card ${active ? "active" : ""} `}
      onClick={onClick}
    >
      <div className="details">
        <span className="inv-no">
          INV. # - <span>{orderNo}</span>
        </span>
        <span className="items-no">Items - {products.length} </span>
        <span className="purchaser">{user.fullName}</span>
      </div>
      <div className="aside">
        <span className="date">{formatTime(date)}</span>
        <span className="total-price">₹ {convertToDecimal(grandTotal)}</span>
      </div>
    </div>
  );
};

export default InvoiceCard;
