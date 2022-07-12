import React from "react";

const TextField = ({ type, placeholder, onChange, value, name }) => {
  return (
    <input
      className="textfield"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
};

TextField.defaultProps = {
  placeholder: "Enter your text",
  type: "text",
};
export default TextField;
