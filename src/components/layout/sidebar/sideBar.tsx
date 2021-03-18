import React from "react";
import CompanyTitle from "./companyTitle";
import SidebarList from "./sidebarList";

function SideBar(props: any) {
  return (
    <div className="sidebar">
      <CompanyTitle />
      <div className="sidebar-menu-list">
        <SidebarList />
      </div>
    </div>
  );
}

export default SideBar;
