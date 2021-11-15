import React, { createContext, useEffect, useState } from "react";

export const InvoiceContext = createContext();
export const defaultInvoiceObject = {
  orderNo: "",
  user: {
    fullName: "",
    phone: "",
    address: "",
    email: "",
    pincode: "",
  },
  products: [],
  subTotal: 0,
  taxAmount: 0,
  discountAmount: 0,
  grandTotal: 0,
  tax: 0,
  discount: 0,
};

const InvoiceContextProvider = (props) => {
  let storedInvoice = JSON.parse(localStorage.getItem("storedInvoice")) || [];
  let storedIDs = JSON.parse(localStorage.getItem("IDs")) || [];
  const [invoiceArray, setInvoiceArray] = useState(storedInvoice);
  const [searchArray, setSearchArray] = useState(invoiceArray);
  const [invoiceObject, setInvoiceObject] = useState(defaultInvoiceObject);
  const [generatedIds, setGeneratedIds] = useState(storedIDs);
  const [showModal, setShowModal] = useState(false);

  // function for closing form modal
  const onCloseModal = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
      setInvoiceObjectFN({ ...defaultInvoiceObject });
    }
  };

  // function for seaching
  const searchInvoiceList = (val) => {
    const newArray = invoiceArray.filter((invoice) =>
      invoice.user.fullName.toLowerCase().includes(val.toLowerCase())
    );
    setSearchArray(newArray);
  };

  let id = Math.floor(1000 + Math.random() * 9000);
  // function for generating unique id
  const generateNewOrderId = () => {
    if (generatedIds.includes(id)) {
      generateNewOrderId.call(this);
    } else {
      setInvoiceObjectFN({ orderNo: id });
    }
  };

  // function for update the invoice oject state
  const setInvoiceObjectFN = (val) => {
    setInvoiceObject((prev) => {
      return { ...prev, ...val };
    });
  };

  // function for saving new invoice
  const onSaveInvoice = (e) => {
    setInvoiceArray((prev) => {
      return [{ ...invoiceObject, date: new Date() }, ...prev];
    });
    setSearchArray((prev) => {
      return [{ ...invoiceObject }, ...prev];
    });
    setGeneratedIds((prev) => {
      return [...prev, id];
    });
    onCloseModal(e);
  };

  // usseffect for updatign local storage
  useEffect(() => {
    localStorage.setItem("storedInvoice", JSON.stringify(invoiceArray));
    localStorage.setItem("IDs", JSON.stringify(generatedIds));
    // eslint-disable-next-line
  }, [invoiceArray]);

  return (
    <InvoiceContext.Provider
      value={{
        invoiceArray,
        onSaveInvoice,
        invoiceObject,
        setInvoiceObject,
        setInvoiceObjectFN,
        generatedIds,
        generateNewOrderId,
        onCloseModal,
        showModal,
        setShowModal,
        searchInvoiceList,
        searchArray,
      }}
    >
      {props.children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContextProvider;
