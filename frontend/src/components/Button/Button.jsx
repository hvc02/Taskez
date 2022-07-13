import React from "react";

const Button = ({
  text,
  variant,
  onClick,
  disabled,
  fullwidth,
  isLoading,
  type,
}) => {
  const btnClass = `btn btn--${variant} ${fullwidth ? `btn--fullwidth` : ""}`;
  return (
    <button
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
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
  type: "button",
};

export default Button;
