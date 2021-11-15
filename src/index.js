import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import InvoiceContextProvider from "./context/invoiceContext";

ReactDOM.render(
  <React.StrictMode>
    <InvoiceContextProvider>
      <App />
    </InvoiceContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
