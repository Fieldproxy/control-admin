import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgentDetails } from "../../redux/actions/agentDetails";
import { userDetailI } from "../../redux/actions/agentDetails/agentDetailTypes";
import { RootStoreI } from "../../redux/reducers";
import Loader from "../../components/loader";
import { RouteComponentProps } from "react-router-dom";
import CustomTable, { columnI } from "../../components/table";
import HeadTitle from "../../components/HeadTitle";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";

interface MatchParams {
  companyId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface columnTypesI extends userDetailI {
  deviceDetails: JSX.Element[] | JSX.Element;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
    paper2: {
      position: "absolute",
      width: 700,
      height: 500,
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const PrettyPrintJson = ({ data }: any) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const initialSelectedUserState: userDetailI = {
  lastUpdated: "",
  deviceDetails: "",
  userId: "",
  deviceToken: "",
};

function AgentDetail(props: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const storeEmitter = (state: RootStoreI) => state.agentDetail;
  const { loadingAgentDetail, userData } = useSelector(storeEmitter);
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState<columnTypesI[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<userDetailI>(
    initialSelectedUserState
  );
  const [modalStyle] = React.useState(getModalStyle);

  const columns: columnI[] = [
    {
      id: "userId",
      label: "User Id",
      minWidth: 170,
    },
    {
      id: "lastUpdated",
      label: "Last Updated",
      minWidth: 170,
    },

    {
      id: "deviceDetails",
      label: "Device Details",
      minWidth: 70,
    },
  ];

  useEffect(() => {
    dispatch(getAgentDetails(props.match.params.companyId));
  }, []);

  useEffect(() => {
    if (userData) {
      formatForTable(userData, searchText);
    } else {
      formatForTable([], searchText);
    }
  }, [userData, searchText]);

  const formatForTable = (data: userDetailI[], searchText: string) => {
    const formattedData: columnTypesI[] = [];
    let originalData = [];
    if (searchText) {
      originalData = data.filter(
        (d) => d && d.userId && d.userId.includes(searchText)
      );
    } else {
      originalData = data;
    }

    originalData.forEach((d) => {
      if (d) {
        formattedData.push({
          ...d,
          lastUpdated: new Date(d.lastUpdated).toLocaleString(),
          deviceDetails: (
            <span className="custom-link" onClick={() => openModal(d)}>
              {" "}
              View{" "}
            </span>
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

  const openModal = (d: userDetailI) => {
    setShowModal(true);
    setSelectedUser(d);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(initialSelectedUserState);
  };

  return (
    <div className="dashboard-container">
      {loadingAgentDetail ? (
        <Loader />
      ) : (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <div className="head-container">
              <HeadTitle> Company Details </HeadTitle>
              <div>
                <input
                  type="text"
                  value={searchText}
                  placeholder="Search userId"
                  name="searchText"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <CustomTable rows={userData ? tableData : []} maxHeight={500} columns={columns} />
          </Paper>
        </div>
      )}

      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper2}>
          <h4>
            {" "}
            Device Details of {selectedUser.userId} on{" "}
            {new Date(selectedUser.lastUpdated).toLocaleString()}{" "}
          </h4>
           { selectedUser.deviceDetails ? <PrettyPrintJson data={selectedUser.deviceDetails} /> : ' No Device Details Found ' }
        </div>
      </Modal>
    </div>
  );
}

export default AgentDetail;
