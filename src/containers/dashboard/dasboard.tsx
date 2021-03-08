import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDashboardData } from "../../redux/actions/dashboard";
import { RootStoreI } from "../../redux/reducers";
import Loader from "../../components/loader";
import axios from "axios";
import { ApiUrl } from "../../config/apiUrl";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InsightCard from "./components/insightCard";
import CompanyTable from "./components/companyTable";
import HeadTitle from "../../components/HeadTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

type AgentItemI = {
  agentId: String;
  organizationId: String;
  lastLogin: String;
  totalResponses: Number;
  deviceDetails: {};
  currentVersion: Number;
  currentBackendUrl: String;
  totalKmsTravelled: Number;
};

type InsightsI = {
  totalAgents: number;
  totalOrganizations: number;
};

const initialInsights: InsightsI = {
  totalAgents: 0,
  totalOrganizations: 0,
};

function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [insights, setInsights] = useState(initialInsights);
  const { loadingCompData, compData, error } = useSelector(
    (state: RootStoreI) => state.dashboard
  );

  useEffect(() => {
    getDashboardData();
    getAgentData();
  }, []);

  useEffect(() => {
    if (compData && compData.length) {
      getInsights();
    }
    return () => {
      setInsights(initialInsights);
    };
  }, [compData]);

  const getInsights = () => {
    let [totalAgents, totalOrganizations] = [0, 0];
    if (compData) {
      totalOrganizations = compData.length;
      compData.forEach((c) => {
        if (c && c.agents) {
          totalAgents += c.agents;
        }
      });
    }
    setInsights({ totalAgents, totalOrganizations });
  };

  const getDashboardData = () => {
    dispatch(GetDashboardData());
  };

  const getAgentData = async() => {
    const res = await axios.post(ApiUrl.deviceDetails, {});
    console.log({res});
  }


  return (
    <div className="dashboard-container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <HeadTitle> Total Organization </HeadTitle>
              <InsightCard
                loading={loadingCompData}
                data={insights.totalOrganizations}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <HeadTitle> Total Agents </HeadTitle>
              <InsightCard
                loading={loadingCompData}
                data={insights.totalAgents}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <HeadTitle> Company Details </HeadTitle>
              {loadingCompData ? (
                <Loader />
              ) : (
                <CompanyTable rows={compData ? compData : []} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <HeadTitle> Agent Details </HeadTitle>
            </Paper>
          </Grid>
        </Grid>
      </div>
      {error && error.message ? <div> {error.message} </div> : ""}
    </div>
  );
}

export default Dashboard;
