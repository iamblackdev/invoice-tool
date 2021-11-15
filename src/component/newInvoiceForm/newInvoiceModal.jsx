import React, { useState, useContext } from "react";
import { InvoiceContext } from "../../context/invoiceContext";
import CustomerDetails from "./components/customerDetails";
import ProductDetails from "./components/productDetails";

import "./styles.scss";

const NewInvoiceModal = ({ onClose }) => {
  const { generateNewOrderId, invoiceObject } = useContext(InvoiceContext);

  const stepArray = [
    {
      id: 1,
      component: <CustomerDetails onProceed={() => setCurrentStep(1)} />,
    },
    {
      id: 2,
      component: <ProductDetails onEditDetails={() => setCurrentStep(0)} />,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useState(() => {
    generateNewOrderId();
  }, []);

  // console.log(parseFloat("100.00"));

  // console.log(parseFloat("23sss44.568").toFixed(2));

  return (
    <div className="new-invoice-modal" onClick={(e) => onClose(e)}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="heading">Create new invoice</span>
          <span className="order-no">order no: {invoiceObject.orderNo}</span>
          <img
            src="/images/close-btn.png"
            alt="close"
            className="close-btn"
            onClick={onClose}
          />
        </div>
        <div className="modal-body">{stepArray[currentStep].component}</div>
      </div>
    </div>
  );
};

export default NewInvoiceModal;
