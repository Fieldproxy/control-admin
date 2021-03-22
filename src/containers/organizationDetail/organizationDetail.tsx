import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAgentDetails } from "../../redux/actions/agentDetails";
import { GetOrganizationDetail } from "../../redux/actions/organizations"; 
import { RouteComponentProps } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CustomTabs from "../../components/customTabs";
import AgentDetails from "./tabs/agentDetails";
import General from "./tabs/general";

interface MatchParams {
  companyId: string;
}

interface PropsI extends RouteComponentProps<MatchParams> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1, 2),
      textAlign: "center",
      height: 560,
      overflow: "auto",
      color: theme.palette.text.secondary,
    },
  })
);

function OrganizationDetail(props: PropsI) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tabs = ["General", "Agents", "Insights"];

  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    dispatch(GetAgentDetails(props.match.params.companyId));
    dispatch(GetOrganizationDetail(props.match.params.companyId));
  }, []);

  const renderTabData = (tabIdx: number) => {
    switch (tabIdx) {
      case 0:
        return <General />;
      case 1:
        return <AgentDetails />;
      default:
        return <div> Tab Data </div>;
    }
  };

  return (
    <div className="dashboard-container">
      <CustomTabs
        handleChange={handleChangeTab}
        currentTab={currentTab}
        tabs={tabs}
      />
      <div className={classes.root}>
        <Paper className={classes.paper}>{renderTabData(currentTab)}</Paper>
      </div>
    </div>
  );
}

export default OrganizationDetail;
