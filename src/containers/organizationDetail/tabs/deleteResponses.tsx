import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

import {RootStoreI} from "../../../redux/reducers";
import Loader from "../../../components/loader";
import HeadTitle from "../../../components/HeadTitle";
import {Button, IconButton, Input, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import {ApiUrl} from "../../../config/apiUrl";
import useNotifier from "../../../hooks/notifierHook";
import {GetOrganizationDetail, GetWorkflowDetails} from "../../../redux/actions/organizations";

interface propsI {
  companyId: string;
}

interface deleteStateI {
  workflowId?: string;
  workflowName?: string;
  taskId?: string;
  taskName?: string;
  questionId?: string;
  questionName?: string;
  userId?: string;
  displayCount?: number;
  fromDate?: string;
  toDate?: string;
}

type keysType = "workflowId" | "taskId" | "questionId" | "userId" | "fromDate" | "toDate";
type namesType = "workflowName" | "questionName" | "taskName" | "";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    modal: {
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
      position: "absolute",
      width: 700,
      height: 500,
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    filterContainer: {
      textAlign: "left",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      padding: "16px",
    },
    select: {
      minWidth: 250,
      margin: theme.spacing(2),
    },
    footer: {
      display: "flex",
      justifyContent: "flex-start",
    },
    footerButton: {
      margin: "16px",
    },
    textField: {
      margin: theme.spacing(2),
      width: 250,
    },
  })
);

interface deleteConfirmI {
  showDialog: boolean;
  isAll: boolean;
  totalResponsesCount: number;
}

interface deleteSafePasswordI {
  showPassword: boolean;
  password: string;
  error?: string;
}

interface catalogDeleteConfirmI {
  showCatalogModal: boolean;
  password: string;
  showPassword: boolean;
  error?: string;
  catagoriesCount: number;
  productsCount: number;
  skuCount: number;
}

function DeleteResponses(props: propsI) {
  const initialDeleteState: deleteStateI = {
    workflowId: "",
    taskId: "",
    questionId: "",
    userId: "",
    workflowName: "",
    taskName: "",
    questionName: "",
    fromDate: "",
    toDate: "",
  };

  const initialConfirmationDialogState: deleteConfirmI = {
    showDialog: false,
    isAll: false,
    totalResponsesCount: 15,
  };

  const initialDeleteSafePassword: deleteSafePasswordI = {
    showPassword: false,
    password: "",
    error: "",
  };

  const initialCatalogConfirmModal: catalogDeleteConfirmI = {
    showCatalogModal: false,
    password: "",
    showPassword: false,
    error: "",
    catagoriesCount: 0,
    productsCount: 0,
    skuCount: 0,
  };

  const classes = useStyles();
  const fireMessage = useNotifier("deleteResponse");
  const storeEmitter = (state: RootStoreI) => state.workflowsAndTaskList;
  const userStoreEmitter = (state: RootStoreI) => state.agentDetail;
  const dispatch = useDispatch();

  const {userData} = useSelector(userStoreEmitter);
  const {loadingWorkflowsAndTaskList, workflows, tasks, error} = useSelector(storeEmitter);

  const [deleteData, setDeleteData] = useState<deleteStateI>(initialDeleteState);
  const [showFilterAndDelete, setShowFilterAndDelete] = useState<boolean>(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<deleteConfirmI>(
    initialConfirmationDialogState
  );
  const [deleteSafePassword, setDeleteSafePassword] =
    useState<deleteSafePasswordI>(initialDeleteSafePassword);

  const [deleteCatalogConfirm, setDeleteCatalogConfirm] = useState<catalogDeleteConfirmI>(
    initialCatalogConfirmModal
  );

  // fetchers

  const getDeletableResponseCount = async (isAll: boolean): Promise<number> => {
    try {
      let params = {};
      if (!isAll) {
        params = {...deleteData};
      }
      const res = await axios.post(`${ApiUrl.getDeletableResponsesCount}/${props.companyId}`, {
        ...params,
      });
      if (res.status === 200) {
        const {responseCount} = res.data.data;
        return responseCount;
      } else {
        throw new Error("Cannot get response count");
      }
    } catch (err) {
      fireMessage(err.message, "error");
      return 0;
    }
  };

  const confirmAndDelete = async () => {
    try {
      const {isAll} = showConfirmationDialog;
      const {password} = deleteSafePassword;
      if (!password) {
        throw new Error("Please Enter the password");
      }
      let params: any = {password};
      if (!isAll) {
        params = {
          ...params,
          ...deleteData,
          fromDate: deleteData.fromDate ? new Date(deleteData.fromDate).toISOString() : "",
          toDate: deleteData.toDate ? new Date(deleteData.toDate).toISOString() : "",
        };
      }
      const res = await axios.post(`${ApiUrl.secureDeleteResponses}/${props.companyId}`, {
        ...params,
      });
      if (res && res.status === 200) {
        if (res.data.status) {
          if (!isAll && deleteData.questionId) {
            if (res.data.error) {
              throw new Error(res.data.error.message);
            } else {
              const {matchedCount, modifiedCount} = res.data.data;
              if (matchedCount !== undefined && modifiedCount !== undefined) {
                const message = `Deleted ${modifiedCount} responses for question ${deleteData.questionName} from ${matchedCount} entries`;
                fireMessage(message, "success");
              }
            }
          } else {
            if (res.data.error) {
              throw new Error(res.data.error.message);
            } else {
              const {deletedCount} = res.data.data;
              if (deletedCount !== undefined) {
                const message = `Deleted ${deletedCount} entries.`;
                fireMessage(message, "success");
              }
            }
          }
          setShowFilterAndDelete(false);
          setDeleteData(initialDeleteState);
          closeDeleteConfirm();
          dispatch(GetOrganizationDetail(props.companyId));
          dispatch(GetWorkflowDetails(props.companyId));
        } else if (res.data.error) {
          throw new Error(res.data.error.message);
        }
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      fireMessage(err.message, "error");
    }
  };

  const deleteCatalogTrigger = async () => {
    try {
      const res = await axios.get(`${ApiUrl.getCatalogCount}/${props.companyId}`);
      if (res && res.status === 200) {
        console.log(res.data);
        if (res.data.status) {
          const {catagoriesCount, productsCount, skuCount} = res.data.data;
          if (catagoriesCount + productsCount + skuCount > 0) {
            setDeleteCatalogConfirm({
              ...initialCatalogConfirmModal,
              catagoriesCount,
              productsCount,
              skuCount,
              showCatalogModal: true,
            });
          } else {
            throw new Error("No Catalog data present in this organization");
          }
        } else {
          throw new Error(res.data.error);
        }
      } else {
        throw new Error("Getting catalog data failed");
      }
    } catch (err) {
      setDeleteCatalogConfirm(initialCatalogConfirmModal);
      fireMessage(err.message, "error");
    }
  };

  const confirmAndDeleteCatalog = async () => {
    try {
      const {password} = deleteCatalogConfirm;
      if (!password) {
        throw new Error("Please Enter the password");
      }
      const res = await axios.post(`${ApiUrl.deleteAllCatalogueData}/${props.companyId}`, {
        password,
      });
      if (res && res.status === 200) {
        if (res.data.status) {
          closeDeleteCatalogConfirm();
          fireMessage("Catalog Data deleted successfully!", "success");
        } else {
          throw new Error(res.data.error.message);
        }
      } else {
        throw new Error("Delete Catalog data failed!");
      }
    } catch (err) {
      fireMessage(err.message, "error");
    }
  };

  const showAllDeleteConfirm = async () => {
    const totalResponsesCount = await getDeletableResponseCount(true);
    if (totalResponsesCount !== null && totalResponsesCount > 0) {
      setShowConfirmationDialog({
        showDialog: true,
        isAll: true,
        totalResponsesCount,
      });
    } else {
      fireMessage("No entries found for the selected organization", "warning");
    }
  };

  const showDeleteFilteredConfirm = async () => {
    const {fromDate, toDate} = deleteData;
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      return fireMessage("From Date and To Date is not in valid range", "warning");
    }
    const totalResponsesCount = await getDeletableResponseCount(false);
    if (totalResponsesCount !== null && totalResponsesCount > 0) {
      setShowConfirmationDialog({
        showDialog: true,
        isAll: false,
        totalResponsesCount,
      });
    } else {
      fireMessage("There are no responses for the applied condition", "info");
    }
  };

  const closeDeleteConfirm = () => {
    setShowConfirmationDialog(initialConfirmationDialogState);
    setDeleteSafePassword(initialDeleteSafePassword);
  };

  const closeDeleteCatalogConfirm = () => {
    setDeleteCatalogConfirm(initialCatalogConfirmModal);
  };

  const toggleFilterAndDelete = () => {
    setShowFilterAndDelete(prevState => !prevState);
    setDeleteData(initialDeleteState);
  };

  const resetDeleteData = () => {
    setDeleteData(initialDeleteState);
  };

  // handlers

  const handleChange = (name: keysType, event: React.ChangeEvent<{value: unknown}>) => {
    let data = {...deleteData};
    let nameId: namesType = "";
    let nameValue = "";
    const value = event.target.value as string;

    switch (name) {
      case "workflowId":
        nameId = "workflowName";
        const workflow = workflows.find(d => d.workflowId === value);
        if (workflow) {
          nameValue = workflow.name;
        }
        data = {...initialDeleteState};
        break;
      case "taskId":
        nameId = "taskName";
        const task = tasks.find(t => t.taskid === value);
        if (task) {
          nameValue = task.taskname;
        }
        data["questionId"] = "";
        data["questionName"] = "";
        break;
      case "questionId":
        nameId = "questionName";
        const taskSelected = tasks.find(t => t.taskid === data.taskId);
        if (taskSelected) {
          let question = taskSelected.questionDetails.find(q => q.questionid === value);
          if (question) {
            nameValue = question.question;
          }
        }
        break;
      default:
        break;
    }

    data[name] = value;
    if (nameId) {
      data[nameId] = nameValue;
    }
    setDeleteData(data);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteSafePassword(prevState => ({...prevState, password: event.target.value}));
  };

  const handleChangeCatalogPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteCatalogConfirm(prevState => ({...prevState, password: event.target.value}));
  };

  const handleClickShowPassword = () => {
    setDeleteSafePassword(prevState => ({...prevState, showPassword: !prevState.showPassword}));
  };

  const handleClickShowPasswordCatalog = () => {
    setDeleteCatalogConfirm(prevState => ({...prevState, showPassword: !prevState.showPassword}));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="head-container">
        <HeadTitle> Delete Response </HeadTitle>
      </div>
      {loadingWorkflowsAndTaskList ? (
        <Loader />
      ) : error && error.message ? (
        <div style={{color: "red"}}>{error.message}</div>
      ) : (
        <div className={classes.paper}>
          {showFilterAndDelete ? (
            <Fragment>
              <div className={classes.filterContainer}>
                <div style={{width: "100%"}}>
                  <div>
                    <InputLabel id="demo-simple-select-label">Select Workflow</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={deleteData.workflowId}
                      name="workflowId"
                      className={classes.select}
                      onChange={e => handleChange("workflowId", e)}>
                      {workflows.map(w => (
                        <MenuItem key={w.workflowId} value={w.workflowId}>
                          {w.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <InputLabel id="demo-simple-select-label-task">Select Task</InputLabel>
                    <Select
                      labelId="demo-simple-select-label-task"
                      id="demo-simple-select-task"
                      value={deleteData.taskId}
                      name="taskId"
                      className={classes.select}
                      onChange={e => handleChange("taskId", e)}>
                      {deleteData.workflowId
                        ? tasks
                            .filter(t => t.workflowId === deleteData.workflowId)
                            .map(t => (
                              <MenuItem key={t.taskid} value={t.taskid}>
                                {t.taskname}
                              </MenuItem>
                            ))
                        : tasks.map(t => (
                            <MenuItem key={t.taskid} value={t.taskid}>
                              {t.taskname}
                            </MenuItem>
                          ))}
                    </Select>
                  </div>
                  {deleteData.taskId ? (
                    <div>
                      <InputLabel id="demo-simple-select-label-question">
                        Select Catalogue Question
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label-question"
                        id="demo-simple-select-question"
                        value={deleteData.questionId}
                        name="questionId"
                        className={classes.select}
                        onChange={e => handleChange("questionId", e)}>
                        {tasks
                          .find(t => t.taskid === deleteData.taskId)
                          ?.questionDetails.filter(d => d.type === "catalogue") //catalogue
                          .map(q => (
                            <MenuItem key={q.questionid} value={q.questionid}>
                              {q.question}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div style={{width: "100%"}}>
                  <div>
                    <TextField
                      id="datetime-local"
                      label="From Date"
                      type="datetime-local"
                      value={deleteData.fromDate}
                      className={classes.textField}
                      onChange={e => handleChange("fromDate", e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      id="datetime-local-toDate"
                      label="To Date"
                      type="datetime-local"
                      value={deleteData.toDate}
                      className={classes.textField}
                      onChange={e => handleChange("toDate", e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div>
                    <InputLabel id="demo-simple-select-label-task">Select User</InputLabel>
                    <Select
                      labelId="demo-simple-select-label-user"
                      id="demo-simple-select-uer"
                      value={deleteData.userId}
                      name="userId"
                      className={classes.select}
                      onChange={e => handleChange("userId", e)}>
                      {userData.map(u => (
                        <MenuItem key={u.userId} value={u.userId}>
                          {u.userId}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <hr />
              <div className={classes.footer}>
                <Button className={classes.footerButton} size="small" onClick={resetDeleteData}>
                  {" "}
                  Reset{" "}
                </Button>
                <Button
                  className={classes.footerButton}
                  onClick={toggleFilterAndDelete}
                  color="secondary"
                  size="small"
                  variant="outlined">
                  {" "}
                  Cancel{" "}
                </Button>
                <Button
                  size="small"
                  className={classes.footerButton}
                  variant="contained"
                  onClick={showDeleteFilteredConfirm}
                  color="secondary">
                  {" "}
                  Delete Responses{" "}
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.footer}>
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.footerButton}
                  onClick={showAllDeleteConfirm}>
                  {" "}
                  Delete All Responses{" "}
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  className={classes.footerButton}
                  onClick={toggleFilterAndDelete}>
                  {" "}
                  Filter And Delete Responses{" "}
                </Button>
              </div>
              <hr />
              <div className={classes.footer}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.footerButton}
                  onClick={deleteCatalogTrigger}>
                  Delete Catalog
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      )}

      <Modal
        open={deleteCatalogConfirm.showCatalogModal}
        onClose={closeDeleteCatalogConfirm}
        aria-labelledby="Delete Catalog"
        aria-describedby="Confirmation to delete Catalog">
        <div className={classes.modal}>
          <h4>Confirm Delete Catalog</h4>
          <div>
            This action will delete {deleteCatalogConfirm.skuCount} SKU's of{" "}
            {deleteCatalogConfirm.productsCount} products from{" "}
            {deleteCatalogConfirm.catagoriesCount} categories in total. Are you sure to delete?
          </div>
          <p> Please enter the delete-safe password to confirm. </p>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={deleteCatalogConfirm.showPassword ? "text" : "password"}
            value={deleteCatalogConfirm.password}
            onChange={handleChangeCatalogPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordCatalog}
                  onMouseDown={handleMouseDownPassword}>
                  {deleteCatalogConfirm.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <div className={classes.footer}>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className={classes.footerButton}
              onClick={closeDeleteCatalogConfirm}>
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              className={classes.footerButton}
              onClick={confirmAndDeleteCatalog}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showConfirmationDialog.showDialog}
        onClose={closeDeleteConfirm}
        aria-labelledby="Delete Responses"
        aria-describedby="Confirmation to delete responses">
        <div className={classes.modal}>
          <h4>Confirm Delete Responses</h4>
          {showConfirmationDialog.isAll ? (
            <Fragment>
              <div>Are you sure delete all the responses from this organization?</div>
            </Fragment>
          ) : (
            <Fragment>
              <div>
                {" "}
                Are you sure delete responses{" "}
                {deleteData.workflowName ? (
                  <span>
                    {" "}
                    from the workflow <strong>{deleteData.workflowName}</strong>{" "}
                  </span>
                ) : (
                  ""
                )}
                {deleteData.taskName ? (
                  <span>
                    {" "}
                    in the task <strong> {deleteData.taskName} </strong>{" "}
                  </span>
                ) : (
                  ""
                )}{" "}
                {deleteData.questionName ? (
                  <span>
                    {" "}
                    of the question <strong>{deleteData.questionName}</strong>{" "}
                  </span>
                ) : (
                  ""
                )}
                {deleteData.userId ? (
                  <span>
                    {" "}
                    submitted by the user <strong>{deleteData.userId}</strong>{" "}
                  </span>
                ) : (
                  ""
                )}
                {deleteData.fromDate ? (
                  <span>
                    {" "}
                    submitted from <strong> {new Date(deleteData.fromDate).toString()}</strong>{" "}
                  </span>
                ) : (
                  ""
                )}
                {deleteData.toDate ? (
                  <span>
                    till <strong>{new Date(deleteData.toDate).toString()}</strong>{" "}
                  </span>
                ) : (
                  ""
                )}{" "}
                ?
              </div>
            </Fragment>
          )}
          <p>
            {" "}
            This action will delete <strong>
              {" "}
              {showConfirmationDialog.totalResponsesCount}{" "}
            </strong>{" "}
            responses from the organization.{" "}
          </p>
          <p> Please enter the delete-safe password to confirm. </p>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={deleteSafePassword.showPassword ? "text" : "password"}
            value={deleteSafePassword.password}
            onChange={handleChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {deleteSafePassword.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <div className={classes.footer}>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className={classes.footerButton}
              onClick={closeDeleteConfirm}>
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              className={classes.footerButton}
              onClick={confirmAndDelete}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteResponses;
