import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDashboardData } from "../../redux/actions/dashboard";
import { RootStoreI } from "../../redux/reducers";
import Loader from "../../components/loader";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InsightCard from "./components/insightCard";
import HeadTitle from "../../components/HeadTitle";
import { compDataI } from "../../redux/actions/dashboard/dashboardTypes";
import { NavLink } from "react-router-dom";
import CustomTable, { columnI } from "../../components/table";


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
  })
);

const columns: columnI[] = [
  {
    id: "companyId",
    label: "Company Id",
    minWidth: 170,
  },
  {
    id: "companyName",
    label: "Company Name",
    minWidth: 300,
  },
  {
    id: "agents",
    label: "Total Agents",
    minWidth: 70,
  },
  {
    id: "responses",
    label: "Total Responses",
    minWidth: 70,
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 70,
  },
];

function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    loadingCompData,
    compData,
    error,
    totalAgents,
    totalOrganizations,
  } = useSelector((state: RootStoreI) => state.dashboard);

  const [tableData, setTableData] = useState<columnTypesI[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    if (compData) {
      formatForTable(compData, searchText);
    } else {
      formatForTable([], searchText);
    }
  }, [compData, searchText]);

  const getDashboardData = () => {
    dispatch(GetDashboardData());
  };

  const formatForTable = (data: compDataI[], searchText?: string) => {
    const formattedData: columnTypesI[] = [];
    let originalData = [];
    if (searchText) {
      originalData = data.filter((d) => d && d.companyId.includes(searchText));
    } else {
      originalData = data;
    }

    originalData.forEach((d) => {
      if (d) {
        formattedData.push({
          ...d,
          action: (
            <NavLink className="custom-link" to={`dashboard/${d.companyId}`}>
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

  return (
    <div className="dashboard-container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <HeadTitle> Total Organization </HeadTitle>
              <InsightCard
                loading={loadingCompData}
                data={totalOrganizations}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <HeadTitle> Total Agents </HeadTitle>
              <InsightCard loading={loadingCompData} data={totalAgents} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ minHeight: "350px" }}>
              <div className="head-container">
                <HeadTitle> Company Details </HeadTitle>
                <div>
                  {" "}
                  <input
                    type="text"
                    value={searchText}
                    placeholder="Search CompanyId"
                    name="searchText"
                    onChange={(e) => handleSearch(e)}
                  />{" "}
                </div>
              </div>
              {loadingCompData ? (
                <Loader />
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

export default Dashboard;
