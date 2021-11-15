import React from "react";
import "./styles.scss";

const Teaxtarea = ({
  className,
  value,
  onChange,
  labelText,
  placeholder,
  rows,
  cols,
  required,
}) => {
  return (
    <div className={`input-wrapper ${className || ""}`}>
      <label className={`label ${required && "required"}`}>{labelText}</label>

      {/* TEXTAREA FIELD */}
      <textarea
        placeholder={placeholder}
        // cols={cols}
        // rows={rows}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default Teaxtarea;
