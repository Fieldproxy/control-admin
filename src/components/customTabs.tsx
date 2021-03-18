import React from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#845ec2",
  },
})(Tabs);

interface StyledTabProps {
  label: string;
}
const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
     
      "&:hover": {
        color: "#b39cd0",
        opacity: 1,
      },
      "&$selected": {
        color: "#845ec2",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#845ec2",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
}));

type PropsI = {
  handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  currentTab: number;
  tabs: string[];
};

export default function CustomTabs(props: PropsI) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs
          value={props.currentTab}
          onChange={props.handleChange}
          aria-label="ant example"
        >
          {props.tabs.map((t) => (
            <AntTab label={t} key={t} />
          ))}
        </AntTabs>
      </div>
    </div>
  );
}
