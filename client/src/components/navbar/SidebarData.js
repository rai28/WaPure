import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "New Report",
    path: "/new-report",
    // pen icon
    icon: <IoIcons.IoIosAdd />,
    cName: "nav-text",
  },
  {
    title: "Old Reports",
    path: "/reports/history",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/profile",
    icon: <FaIcons.FaCog />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    icon: <FaIcons.FaSignOutAlt />,
    path: "#",
    cName: "nav-text",
  },
];
