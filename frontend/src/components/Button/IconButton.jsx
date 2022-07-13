import React from "react";

const IconButton = ({ text, variant = "icon", onClick, disabled, Icon }) => {
  const btnClass = `btn btn--${variant} `;
  return (
    <button className={btnClass} onClick={onClick} disabled={disabled}>
      <img src={Icon} alt="icon-btn" />
      {text && text}
    </button>
  );
};

export default IconButton;
