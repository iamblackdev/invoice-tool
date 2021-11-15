import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { InvoiceContext } from "../../context/invoiceContext";
import InvoiceCard from "../InvoiceCard/invoiceCard";

import "./styles.scss";

const InvoiceList = ({ onSelect }) => {
  const { searchArray, searchInvoiceList } = useContext(InvoiceContext);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <aside className="invoice-list-wrapper">
      <div className="search-wrapper">
        <img src="/images/search-icon.png" alt="search" className="icon" />
        <input
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => {
            searchInvoiceList(e.target.value);
            setSearchTerm(e.target.value);
          }}
          onBlur={() => {
            searchInvoiceList("");
            setSearchTerm("");
          }}
        />
      </div>
      <div className="invoice-list">
        <div className="count">
          INVOICES - <span>{searchArray?.length}</span>
        </div>
        {searchArray?.map((invoice, idx) => (
          <InvoiceCard
            onClick={() => {
              onSelect(invoice);
              setSelectedInvoiceId(idx);
            }}
            active={selectedInvoiceId === idx}
            key={idx}
            {...invoice}
          />
        ))}
        {searchArray.length < 1 && (
          <div className="empty">
            <span>No invoice</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default InvoiceList;
