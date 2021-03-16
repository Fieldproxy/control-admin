import React, { useEffect } from "react";
import "./styles/App.scss";
import Routes from "./routes";
import { useDispatch } from "react-redux";
import { logInExistUser } from "./redux/actions/authenticate";

function App() {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   logInIfExist();
  // }, []);

  // const logInIfExist = () => {
  //   console.log("called");
  //   const alreadyLogged = localStorage.getItem("controlAdminIn");
  //   if (alreadyLogged && alreadyLogged === "logged In") {
  //     dispatch(logInExistUser());
  //   }
  // };


  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
