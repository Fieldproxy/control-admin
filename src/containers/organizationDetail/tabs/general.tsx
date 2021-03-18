import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetailI } from "../../../redux/actions/agentDetails/agentDetailTypes";
import { RootStoreI } from "../../../redux/reducers";
import Loader from "../../../components/loader";
import CustomTable, { columnI } from "../../../components/table";
import HeadTitle from "../../../components/HeadTitle";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function General() {
  const storeEmitter = (state: RootStoreI) => state.organizations;
  const { loadingCompanyDetail, compDetail, compDetailError } = useSelector(
    storeEmitter
  );
  return (
    <div >
      {loadingCompanyDetail ? <div style={{ height: 400 }}> <Loader /> </div> : <div> Company data </div>}
    </div>
  );
}

export default General;
