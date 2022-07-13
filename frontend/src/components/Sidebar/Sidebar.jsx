import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SidebarRow from "./SidebarRow";
import { ReactComponent as HomeIcon } from "../../assets/images/home.svg";
import { ReactComponent as StatsIcon } from "../../assets/images/stats.svg";
import { ReactComponent as ProjectsIcon } from "../../assets/images/projects.svg";
import { ReactComponent as ChatIcon } from "../../assets/images/chat.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendar.svg";

const Sidebar = () => {
  const [, , removeCookie] = useCookies(["session"]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      removeCookie("session");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("unable to logout");
    }
  };

  const SIDEBAR_LINKS = [
    {
      title: "Home",
      Icon: HomeIcon,
      route: "",
    },
    {
      title: "Stats",
      Icon: StatsIcon,
      route: "",
    },
    {
      title: "Projects",
      Icon: ProjectsIcon,
      route: "",
    },

    {
      title: "Chat",
      Icon: ChatIcon,
      route: "",
    },

    {
      title: "Calendar",
      Icon: CalendarIcon,
      route: "",
    },

    {
      title: "Settings",
      Icon: SettingsIcon,
      route: "",
    },
    {
      title: "Logout",
      Icon: LogoutIcon,
      route: "",
      onClick: handleLogout,
    },
  ];

  return (
    <aside className="sidebar">
      <ul className="sidebar__list">
        <h1 className="sidebar__logo">.tasker</h1>
        {SIDEBAR_LINKS.slice(0, 5).map((link, index) => (
          <SidebarRow key={index} title={link.title} Icon={link.Icon} />
        ))}
      </ul>

      <ul className="sidebar__list">
        {SIDEBAR_LINKS.slice(5, 7).map((link, index) => (
          <SidebarRow
            key={index}
            title={link.title}
            Icon={link.Icon}
            onClick={link?.onClick ? link?.onClick : null}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
