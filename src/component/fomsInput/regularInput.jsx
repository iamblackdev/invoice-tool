import "./styles.scss";
import React from "react";

const RegularInput = ({
  type,
  name,
  value,
  onChange,
  labelText,
  placeholder,
  disabled,
  className,
  required,
  percentage,
}) => {
  return (
    <>
      <div className={`input-wrapper ${className || ""}`}>
        <label className={`label ${required && "required"}`}>{labelText}</label>
        {percentage && <span className="percent">%</span>}
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default RegularInput;
