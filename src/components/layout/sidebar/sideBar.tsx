import React from "react";
import CompanyTitle from "./companyTitle";
import SideBarItems from "./sideBarItems";
import { NavLink } from "react-router-dom";
import SidebarList from "./sidebarList";

function SideBar(props: any) {
  return (
    <div className="sidebar">
      <CompanyTitle />

      <div className="sidebar-menu-list">
        <SidebarList />
        {/* {SideBarItems.map((item) => (
          <NavLink
            activeClassName="active-sidebar-item" 
            className="sideBarItem"
            to={item.route} 
            key={item.route}
          >
            <div style={{ width: 50, height: 20 }}>{item.icon}</div>
            <div style={{ height: 20 }}>{item.name}</div>
          </NavLink>
        ))} */}
      </div>
    </div>
  );
}

export default SideBar;
