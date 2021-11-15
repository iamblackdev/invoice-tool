import React, { useContext, useState } from "react";

import { InvoiceContext } from "../../../context/invoiceContext";
import { convertToDecimal } from "../../../utils/convertTodecimal";
import RegularInput from "../../fomsInput/regularInput";

const GoodsPurchase = ({ onEditDetails }) => {
  const { invoiceObject, setInvoiceObjectFN, setInvoiceObject, onSaveInvoice } =
    useContext(InvoiceContext);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  // function for adding a product to the product list
  const addNewItem = (e) => {
    e.preventDefault();
    if (
      newItem.name &&
      Number(newItem.quantity) > 0 &&
      Number(newItem.price) > 0
    ) {
      setInvoiceObjectFN({
        products: [...invoiceObject.products, newItem],
      });

      setNewItem((prev) => {
        return { name: "", quantity: "", price: "" };
      });

      composeCalculation(getGrandTotal, getDiscount, getTax, getSubTotal);
    }
  };
  // function for deleting a product from the product list
  const deleteItem = (index) => {
    let newItemArray = invoiceObject.products.filter(
      (item, idx) => idx !== index
    );
    setInvoiceObjectFN({
      products: newItemArray,
    });
    composeCalculation(getGrandTotal, getDiscount, getTax, getSubTotal);
  };

  // calculating for the sub total
  const getSubTotal = () => {
    setInvoiceObject((prev) => {
      let total = 0;
      prev.products.forEach((item) => {
        total = total + Number(item.price);
      });
      return { ...prev, subTotal: total };
    });
  };

  // calculating for the tax
  const getTax = (value = invoiceObject.tax) => {
    setInvoiceObjectFN({ tax: value });
    setInvoiceObject((prev) => {
      let taxAmount = (Number(value) / 100) * Number(prev.subTotal);
      return { ...prev, taxAmount };
    });
    getGrandTotal();
  };

  // calculating for the discount
  const getDiscount = (value = invoiceObject.discount) => {
    setInvoiceObjectFN({ discount: value });
    setInvoiceObject((prev) => {
      let discountAmount = (Number(value) / 100) * Number(prev.subTotal);
      return { ...prev, discountAmount };
    });
    getGrandTotal();
  };

  const getGrandTotal = () => {
    setInvoiceObject((prev) => {
      let grandTotal =
        Number(prev.subTotal) +
        Number(prev.taxAmount) -
        Number(prev.discountAmount);
      return { ...prev, grandTotal };
    });
  };

  // compose function for performing all calculations
  const composeCalculation = (a, b, c, d) => a(b(c(d())));

  // validte if there is no product entered
  const vailidateProduct = (e) => {
    if (invoiceObject.products.length < 1) {
      alert("Enter an item");
    } else {
      onSaveInvoice(e);
    }
  };

  return (
    <>
      <div className="invoice-details">
        <div className="hearder">
          <div className="invoice">
            <span>Product Details</span>
          </div>
          <div className="customer-details">
            <div className="details">
              <span>Customer Details</span>
              <span>{invoiceObject.user.fullName}</span>
              <span>{invoiceObject.user.email}</span>
            </div>
            <div className="print-btn">
              <img src="/images/edit.png" alt="print" onClick={onEditDetails} />
            </div>
          </div>
        </div>
        <div className="invoice-table">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price - ₹</th>
              </tr>
            </thead>

            <tbody>
              {invoiceObject.products.map(
                ({ name, quantity, price }, index) => (
                  <tr key={index}>
                    <td width="50%">{name}</td>
                    <td>{quantity}</td>
                    <td>
                      <div className="append-btn-wrapper">
                        <span>{convertToDecimal(price)}</span>
                        <button
                          className="close-btn"
                          onClick={() => deleteItem(index)}
                        >
                          <img src="/images/close-btn.png" alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
              <tr className="new-product-form">
                <td width="50%">
                  <RegularInput
                    placeholder="Please enter item Name"
                    value={newItem.name}
                    onChange={(value) =>
                      setNewItem({ ...newItem, name: value })
                    }
                  />
                </td>
                <td>
                  <RegularInput
                    placeholder="0.00"
                    type="number"
                    value={newItem.quantity}
                    onChange={(value) =>
                      setNewItem({ ...newItem, quantity: value })
                    }
                  />
                </td>
                <td>
                  <form
                    onSubmit={(e) => addNewItem(e)}
                    className="append-btn-wrapper"
                  >
                    <RegularInput
                      type="number"
                      placeholder="0.00"
                      className="price-input"
                      value={newItem.price}
                      onChange={(value) =>
                        setNewItem({
                          ...newItem,
                          price: value,
                        })
                      }
                    />
                    <button className="send-btn">
                      <img src="/images/enter-icon.png" alt="" />
                    </button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="discount-input">
          <div className="inputs">
            <RegularInput
              placeholder="Tax"
              percentage
              type="Number"
              // value={invoiceObject.taxValue}
              onChange={(value) => getTax(value)}
            />
            <RegularInput
              placeholder="Discount"
              type="Number"
              // value={invoiceObject.discountValue}
              onChange={(value) => getDiscount(value)}
              percentage
            />
          </div>
          <div className="aside">
            <span>Sub Total:</span>
            <span>₹ {convertToDecimal(invoiceObject.subTotal)}</span>
          </div>
        </div>
        <div className="footer">
          <div className="discount">
            <div className="group">
              <span>Tax</span>
              <span>₹ {convertToDecimal(invoiceObject.taxAmount)}</span>
            </div>
            <div className="group">
              <span>Discount</span>
              <span>₹ -{convertToDecimal(invoiceObject.discountAmount)}</span>
            </div>
          </div>

          <div className="aside">
            <div className="group">
              <span>Grand Total</span>
              <span>₹ {convertToDecimal(invoiceObject.grandTotal)}</span>
            </div>
            <button className="btn" onClick={vailidateProduct}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoodsPurchase;
