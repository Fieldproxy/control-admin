import React from "react";

type defaultPropsI = {
  children: JSX.Element[] | JSX.Element | String;
};

function HeadTitle(props: defaultPropsI) {
  return (
    <div
      style={{
        fontWeight: 600,
        textAlign: "left",
        fontSize: "16px",
        color: "#232937",
        padding: 10,
      }}
    >
      {" "}
      {props.children}{" "}
    </div>
  );
}

export default HeadTitle;
