import React, { ReactNode, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import BusinessIcon from "@material-ui/icons/Business";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
    },
    nested: {
      marginLeft: theme.spacing(4),
      marginTop: "5px",
      marginBottom: "5px",
      width: "86%",
      padding: 0,
    },
    rootLinks: {
      margin: "5px 0px",
      padding: 0,
    },
    link: {
      textDecoration: "none",
      color: "white",
    },
  })
);

type SidebarItemI = {
  type: string;
  name: string;
  to: string;
  icon: ReactNode;
  items?: {
    type: string;
    name: string;
    to: string;
    icon: ReactNode;
  }[];
};

type ItemPropsI = {
  data?: SidebarItemI[];
  className?: string;
};

function ItemRenderer(props: ItemPropsI) {
  const classes = useStyles();
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <React.Fragment>
      {props.data ? (
        props.data.map((d) => {
          if (d.type === "group") {
            return (
              <React.Fragment key={d.to}>
                <ListItem
                  button
                  onClick={toggleCollapse}
                  className={props.className}
                >
                  <NavLink
                    to={d.to}
                    className="sideBarItem"
                    activeClassName="active-sidebar-item"
                  >
                    <ListItemIcon className="sidebar-icon">
                      {d.icon}
                    </ListItemIcon>
                    <ListItemText primary={d.name} />
                    {collapse ? <ExpandLess /> : <ExpandMore />}
                  </NavLink>
                </ListItem>

                <Collapse in={collapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ItemRenderer data={d.items} className={classes.nested} />
                  </List>
                </Collapse>
              </React.Fragment>
            );
          } else {
            return (
              <ListItem button key={d.to} className={props.className}>
                <NavLink
                  to={d.to}
                  className="sideBarItem"
                  activeClassName="active-sidebar-item"
                >
                  <ListItemIcon className="sidebar-icon">{d.icon}</ListItemIcon>
                  <ListItemText primary={d.name} />
                </NavLink>
              </ListItem>
            );
          }
        })
      ) : (
        <ListItem></ListItem>
      )}{" "}
    </React.Fragment>
  );
}

function SidebarList() {
  const classes = useStyles();
  const links = [
    {
      type: "main",
      name: "Organizations",
      to: "/organizations",
      icon: <BusinessIcon />,
    },
    {
      type: "main",
      name: "leads",
      to: "/leads",
      icon: <DashboardIcon />,
     
    },
  ];

  // items: [
  //   {
  //     type: "sub",
  //     name: "Overview",
  //     icon: <EqualizerIcon />,
  //     to: "/dashboard/overview",
  //   },
  //   {
  //     type: "sub",
  //     name: "Insights",
  //     icon: <StarBorder />,
  //     to: "/dashboard/insights",
  //   },
  // ],
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ItemRenderer data={links} className={classes.rootLinks} />
    </List>
  );
}

export default SidebarList;
