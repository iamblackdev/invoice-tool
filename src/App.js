import { useContext, useState } from "react";
import "./app.scss";
import AppHeader from "./component/appHeader/appHeader";
import InvoiceDetails from "./component/invoiceDetails/invoiceDetails";
import InvoiceList from "./component/invoiceList/invoiceList";
import NewInvoiceModal from "./component/newInvoiceForm/newInvoiceModal";
import { InvoiceContext } from "./context/invoiceContext";

function App() {
  const { showModal, setShowModal, onCloseModal } = useContext(InvoiceContext);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <>
      {showModal && <NewInvoiceModal onClose={(e) => onCloseModal(e)} />}
      <div className="app">
        <AppHeader />
        <div className="content">
          <div className="add-button" onClick={() => setShowModal(true)}>
            <img src="/images/plus-white.png" alt="add" />
          </div>
          <InvoiceList onSelect={(val) => setSelectedInvoice(val)} />
          {selectedInvoice ? (
            <InvoiceDetails {...selectedInvoice} />
          ) : (
            <div className="empty">
              <span>No invoice selected</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
