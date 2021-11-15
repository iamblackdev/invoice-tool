import React, { useContext } from "react";
import { InvoiceContext } from "../../../context/invoiceContext";
import RegularInput from "../../fomsInput/regularInput";
import Teaxtarea from "../../fomsInput/textarea";

const CustomerDetails = ({ onProceed }) => {
  const { invoiceObject, setInvoiceObjectFN } = useContext(InvoiceContext);
  const validatForm = () => {
    if (!invoiceObject?.user?.fullName) {
      alert("Please enter Name");
    } else if (!invoiceObject.user.phone) {
      alert("Please enter Phone no.");
    } else if (!invoiceObject.user.email.includes("@")) {
      alert("Please enter a valid email.");
    } else {
      onProceed();
    }
  };
  return (
    <>
      <div className="customer-details-form">
        <div className="top">
          <h5>Customer Details</h5>
          <button className="skip-btn" onClick={onProceed}>
            <span>skip</span>
            <img src="/images/skip-icon.png" alt="skip" />
          </button>
        </div>
        <div className="form">
          <div className="form-row">
            <div style={{ width: "47%" }}>
              <RegularInput
                labelText="Full name"
                className="name"
                value={invoiceObject.user.fullName}
                onChange={(value) =>
                  setInvoiceObjectFN({
                    user: { ...invoiceObject.user, fullName: value },
                  })
                }
                required
              />
            </div>
            <div style={{ width: "47%" }}>
              <RegularInput
                labelText="Phone number"
                className="number"
                required
                value={invoiceObject.user.phone}
                onChange={(value) =>
                  setInvoiceObjectFN({
                    user: { ...invoiceObject.user, phone: value },
                  })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div style={{ width: "47%", height: "160px" }}>
              <Teaxtarea
                labelText="Address"
                className="address"
                value={invoiceObject.user.address}
                onChange={(value) =>
                  setInvoiceObjectFN({
                    user: { ...invoiceObject.user, address: value },
                  })
                }
              />
            </div>
            <div className="form-col" style={{ width: "47%" }}>
              <RegularInput
                labelText="Email ID"
                className="emialId"
                value={invoiceObject.user.email}
                onChange={(value) =>
                  setInvoiceObjectFN({
                    user: { ...invoiceObject.user, email: value },
                  })
                }
                required
              />
              <RegularInput
                value={invoiceObject.user.pincode}
                labelText="Pinecode"
                className="pincode"
                onChange={(value) =>
                  setInvoiceObjectFN({
                    user: { ...invoiceObject.user, pincode: value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer">
          <div className="aside">
            <button className="btn" onClick={validatForm}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
