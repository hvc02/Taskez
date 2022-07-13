import React from "react";

const SidebarRow = ({ title, Icon, onClick }) => {
  return (
    <li className="sidebar__row">
      <Icon />
      <p onClick={onClick} className="sidebar__title">
        {title}
      </p>
    </li>
  );
};

export default SidebarRow;
