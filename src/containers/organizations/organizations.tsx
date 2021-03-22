import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOrganizationList } from "../../redux/actions/organizations";
import { RootStoreI } from "../../redux/reducers";
import Loader from "../../components/loader";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InsightCard from "./components/insightCard";
import HeadTitle from "../../components/HeadTitle";
import { compDataI } from "../../redux/actions/organizations/organizationTypes";
import { NavLink } from "react-router-dom";
import CustomTable, { columnI } from "../../components/table";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@material-ui/lab/Autocomplete";

interface columnTypesI extends compDataI {
  action: JSX.Element[] | JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      height: "100%",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    insightPaper: {
      padding: theme.spacing(1),
      margin: "0 auto",
      // width: 200,
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const columns: columnI[] = [
  {
    id: "companyId",
    label: "Company Id",
    minWidth: 130,
  },
  {
    id: "companyName",
    label: "Company Name",
    minWidth: 200,
  },
  {
    id: "totalManagers",
    label: "Managers",
    minWidth: 70,
  },
  {
    id: "agents",
    label: "Agents",
    minWidth: 70,
  },

  {
    id: "responses",
    label: "Responses",
    minWidth: 70,
  },
  {
    id: "type",
    label: "Account Type",
    minWidth: 100,
  },
  {
    id: "createdAt",
    label: "Onboarded At",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 70,
  },
];

function Organizations() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    loadingCompData,
    compData,
    error,
    totalAgents,
    totalOrganizations,
  } = useSelector((state: RootStoreI) => state.organizations);

  const [tableData, setTableData] = useState<columnTypesI[]>([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getOrganizationList();
  }, []);

  useEffect(() => {
    if (compData) {
      formatForTable(compData, searchText, status);
    } else {
      formatForTable([], searchText, status);
    }
  }, [compData, searchText, status]);

  const getOrganizationList = () => {
    dispatch(GetOrganizationList());
  };

  const formatForTable = (
    data: compDataI[],
    searchText?: string,
    status?: string
  ) => {
    const formattedData: columnTypesI[] = [];
    let originalData = [...data];
    if (searchText) {
      originalData = data.filter((d) => d && d.companyId.includes(searchText));
    }
    if (status) {
      originalData = originalData.filter((d) => d && d.type === status);
    }

    originalData.forEach((d) => {
      if (d) {
        formattedData.push({
          ...d,
          action: (
            <NavLink
              className="custom-link"
              to={`organizations/${d.companyId}`}
            >
              {" "}
              View{" "}
            </NavLink>
          ),
        });
      }
    });
    setTableData(formattedData);
  };

  const handleSearch = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setSearchText(target.value);
  };

  const statusOptions = ["archieved", "paid", "trail"];

  const handleChangeStatus = (
    event: React.ChangeEvent<{}>,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    setStatus(value || "");
  };

  return (
    <div className="dashboard-container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.insightPaper}>
              <HeadTitle> Total Organization </HeadTitle>
              <InsightCard
                loading={loadingCompData}
                data={totalOrganizations}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.insightPaper}>
              <HeadTitle> Total Agents </HeadTitle>
              <InsightCard loading={loadingCompData} data={totalAgents} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ minHeight: "350px" }}>
              <div className="head-container">
                <div style={{ width: 400 }}>
                  <HeadTitle> Company Details </HeadTitle>
                </div>
                <div className="search-bar">
                  <div>
                    <Autocomplete
                      options={statusOptions}
                      id="flat-demo"
                      style={{ width: 150 }}
                      value={status}
                      onChange={handleChangeStatus}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Type"
                          margin="dense"
                        />
                      )}
                    />
                  </div>
                  <div>
                    {" "}
                    <input
                      type="text"
                      className="searchText"
                      value={searchText}
                      placeholder="Search CompanyId"
                      name="searchText"
                      onChange={(e) => handleSearch(e)}
                    />{" "}
                  </div>
                </div>
              </div>
              {loadingCompData ? (
                <div style={{ height: 300 }}>
                  <Loader />
                </div>
              ) : (
                <CustomTable
                  columns={columns}
                  rows={compData ? tableData : []}
                  maxHeight={360}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
      {error && error.message ? <div> {error.message} </div> : ""}
    </div>
  );
}

export default Organizations;
