import React from "react";
import PageviewIcon from '@material-ui/icons/Pageview';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import EmailIcon from '@material-ui/icons/Email';

type SideBarItemI = {
  name: string;
  route: string;
  navKey: string;
  icon: JSX.Element[] | JSX.Element;
}[];

const SideBarItems: SideBarItemI = [
  {
    name: "Dashboard",
    route: "/dashboard",
    navKey: "dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Identifierstate",
    route: "/identifierstate",
    navKey: "Identifierstate",
    icon: <PageviewIcon />,
  }
];

export default SideBarItems;
