import React from "react";
import SideBar from "./sidebar";
import { RouteComponentProps } from "react-router-dom";

export interface RouteI extends RouteComponentProps {
  children: JSX.Element[] | JSX.Element;
  page?:string
}

function Layout(props: RouteI) {
  return (
    <div className="layout-wrapper">
      <SideBar history={props.history} />
      {props.children}
    </div>
  );
}

export default Layout;
