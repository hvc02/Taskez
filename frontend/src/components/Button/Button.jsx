import React from "react";

const Button = ({ text, variant, onClick, disabled, fullwidth }) => {
  const btnClass = `btn btn--${variant} ${fullwidth ? `btn--fullwidth` : ""}`;
  return (
    <button className={btnClass} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Click me",
  disabled: false,
  fullwidth: false,
};

export default Button;
