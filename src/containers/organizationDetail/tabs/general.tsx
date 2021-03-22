import React, { useState, EventHandler } from "react";
import { useSelector } from "react-redux";
import { RootStoreI } from "../../../redux/reducers";
import Loader from "../../../components/loader";
import NoData from "../../../components/noData";
import HeadTitle from "../../../components/HeadTitle";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch } from "react-redux";
import { EditOrganizationDetail } from "../../../redux/actions/organizations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "left",
      padding: theme.spacing(2),
      wordBreak: "break-word",
    },
    input: {
      width: 500,
      height: 30,
    },
  })
);

function General() {
  const storeEmitter = (state: RootStoreI) => state.organizations;
  const { loadingCompanyDetail, compDetail } = useSelector(storeEmitter);
  const [showEdit, setShowEdit] = useState(false);
  const [notionLink, setNotionLink] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setNotionLink(target.value);
  };

  const toggleEdit = () => {
    setNotionLink(
      compDetail && compDetail.notionLink ? compDetail.notionLink : ""
    );
    setShowEdit(true);
  };

  const saveNotionLink = () => {
    if (compDetail) {
      dispatch(EditOrganizationDetail(compDetail.companyId, notionLink));
      cancelSave();
    }
  };

  const cancelSave = () => {
    setShowEdit(false);
    setNotionLink("");
  };

  return (
    <div>
      <div className="head-container">
        <HeadTitle> Company Details </HeadTitle>
      </div>
      {loadingCompanyDetail ? (
        <div style={{ height: 400 }}>
          {" "}
          <Loader />{" "}
        </div>
      ) : compDetail ? (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <label> Company - {compDetail.companyName} </label>
            </Grid>
            <Grid item xs={6}>
              <label> Company Id - {compDetail.companyId}</label>
            </Grid>
            <Grid item xs={6}>
              <label>
                {" "}
                Admin - {compDetail.firstName} {compDetail.lastName}
              </label>
            </Grid>

            <Grid item xs={6}>
              <label> Contact - {compDetail.contact} </label>
            </Grid>

            <Grid item xs={12}>
              <label>
                {" "}
                Managers -{" "}
                {compDetail.managerList && Array.isArray(compDetail.managerList)
                  ? compDetail.managerList.join(", ")
                  : ""}{" "}
              </label>
            </Grid>
            <Grid item xs={3}>
              <label> Agents - {compDetail.agents} </label>
            </Grid>
            <Grid item xs={3}>
              <label> Managers - {compDetail.totalManagers} </label>
            </Grid>
            <Grid item xs={3}>
              <label> Responses - {compDetail.responses} </label>
            </Grid>
            <Grid item xs={3}>
              <label> Account Type - {compDetail.type} </label>
            </Grid>
            <Grid item xs={12}>
              <label>Notion Link</label>
              {showEdit ? (
                <div>
                  <input
                    type="text"
                    value={notionLink}
                    name="notionLink"
                    onChange={handleChange}
                    placeholder="Enter Notion link"
                    className={classes.input}
                  />
                  <IconButton onClick={saveNotionLink}>
                    {" "}
                    <SaveIcon />{" "}
                  </IconButton>
                  <IconButton onClick={cancelSave}>
                    {" "}
                    <CancelIcon />{" "}
                  </IconButton>
                </div>
              ) : (
                <div>
                  {" "}
                  {compDetail.notionLink}{" "}
                  <IconButton onClick={toggleEdit}>
                    {" "}
                    <EditIcon />{" "}
                  </IconButton>{" "}
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      ) : (
        <NoData data="Company Details" />
      )}
    </div>
  );
}

export default General;
