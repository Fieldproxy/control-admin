import React, {useState, Fragment} from "react";
import {useSelector} from "react-redux";
import {RootStoreI} from "../../../redux/reducers";
import Loader from "../../../components/loader";
import NoData from "../../../components/noData";
import HeadTitle from "../../../components/HeadTitle";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import {useDispatch} from "react-redux";
import {EditOrganizationDetail} from "../../../redux/actions/organizations";

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
  const {loadingCompanyDetail, compDetail} = useSelector(storeEmitter);
  const [showEdit, setShowEdit] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showCatalogReady, setShowCatalogReady] = useState(false);
  const [mobileNumberValidation, setMobileNumberValidation] = useState(false);
  const [notionLink, setNotionLink] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setNotionLink(target.value);
  };

  const handleChangeCatalog = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCatalog(event.target.checked);
  };

  const handleChangeCatalogReady = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCatalogReady(event.target.checked);
  };

  const handleChangeMobileNumberValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumberValidation(event.target.checked);
  };

  const isNotNull = (data: any) => {
    return data !== undefined && data !== null && data !== "";
  };

  const toggleEdit = () => {
    setNotionLink(compDetail && isNotNull(compDetail.notionLink) ? compDetail.notionLink : "");
    setShowCatalog(
      compDetail && isNotNull(compDetail.enableCatalogue) ? compDetail.enableCatalogue : false
    );
    setShowCatalogReady(
      compDetail && isNotNull(compDetail.readyCatalogue) ? compDetail.readyCatalogue : false
    );
    setMobileNumberValidation(
      compDetail && isNotNull(compDetail.mobileNumberValidation)
        ? compDetail.mobileNumberValidation
        : false
    );
    setShowEdit(true);
  };

  const saveOrgDetails = () => {
    if (compDetail) {
      const params = {
        mobileNumberValidation,
        notionLink: notionLink,
        enableCatalogue: showCatalog,
        readyCatalogue: showCatalogReady,
      };

      dispatch(EditOrganizationDetail(compDetail.companyId, params));
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
        <div style={{height: 400}}>
          {" "}
          <Loader />{" "}
        </div>
      ) : compDetail ? (
        <div className={classes.root}>
          <p> Company - {compDetail.companyName} </p>
          <p> Company Id - {compDetail.companyId} </p>
          <p>
            {" "}
            Admin - {compDetail.firstName} {compDetail.lastName}
          </p>
          <p> Contact - {compDetail.contact} </p>
          <p>
            {" "}
            Managers -{" "}
            {compDetail.managerList && Array.isArray(compDetail.managerList)
              ? compDetail.managerList.join(", ")
              : ""}{" "}
          </p>
          <p> Agents - {compDetail.agents} </p>
          <p> Managers - {compDetail.totalManagers} </p>
          <p> Responses - {compDetail.responses} </p>
          <p> Account Type - {compDetail.type} </p>
          <p>
            <label>Notion Link</label>
            {showEdit ? (
              <input
                type="text"
                value={notionLink}
                name="notionLink"
                style={{marginLeft: "16px"}}
                onChange={handleChange}
                placeholder="Enter Notion link"
                className={classes.input}
              />
            ) : (
              <label> {compDetail.notionLink} </label>
            )}{" "}
          </p>
          <p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showEdit ? showCatalog : compDetail.enableCatalogue}
                  onChange={handleChangeCatalog}
                  name="checkedB"
                  color="primary"
                  disabled={!showEdit}
                />
              }
              label="Enable Product Catalog"
            />
          </p>
          <p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showEdit ? showCatalogReady : compDetail.readyCatalogue}
                  onChange={handleChangeCatalogReady}
                  name="checkedB"
                  color="primary"
                  disabled={!showEdit}
                />
              }
              label="Is Catalog Ready"
            />
          </p>
          <p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showEdit ? mobileNumberValidation : compDetail.mobileNumberValidation}
                  onChange={handleChangeMobileNumberValidation}
                  name="checkedB"
                  color="primary"
                  disabled={!showEdit}
                />
              }
              label="Enable Mobile Number Validation"
            />
          </p>
          <hr />
          <div>
            {showEdit ? (
              <Fragment>
                <Button color="secondary" startIcon={<CancelIcon />} onClick={cancelSave}>
                  cancel
                </Button>
                <Button
                  style={{marginLeft: "16px"}}
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={saveOrgDetails}>
                  {" "}
                  Save{" "}
                </Button>
              </Fragment>
            ) : (
              <Button startIcon={<EditIcon />} onClick={toggleEdit}>
                {" "}
                Edit{" "}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <NoData data="Company Details" />
      )}
    </div>
  );
}

export default General;
