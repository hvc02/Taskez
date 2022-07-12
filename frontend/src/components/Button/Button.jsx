import React from "react";

const Button = ({ text, variant, onClick, disabled, fullwidth, isLoading }) => {
  const btnClass = `btn btn--${variant} ${fullwidth ? `btn--fullwidth` : ""}`;
  return (
    <button className={btnClass} onClick={onClick} disabled={disabled}>
      {!isLoading && text}
      {isLoading && <Loader />}
    </button>
  );
};

const Loader = () => {
  return <div className="btn__loader"></div>;
};

Button.defaultProps = {
  text: "Click me",
  disabled: false,
  fullwidth: false,
};

export default Button;
