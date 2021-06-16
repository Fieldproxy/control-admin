import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetailI } from "../../../redux/actions/managerdetails/managerdetail";
import { RootStoreI } from "../../../redux/reducers";
import Loader from "../../../components/loader";
import CustomTable, { columnI } from "../../../components/table";
import HeadTitle from "../../../components/HeadTitle";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface columnTypesI extends userDetailI {
  deviceDetails?: JSX.Element[] | JSX.Element;
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
  firstName: "",
  lastName: "",
  email: "",
  companyId: "",
  contact: "",
  ts: new Date(),
};

function AgentDetails() {
  // const classes = useStyles();
  const storeEmitter = (state: RootStoreI) => state.managerdetail;
  const { loadingManagerDetail, userData } = useSelector(storeEmitter);
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState<columnTypesI[]>([]);
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [selectedUser, setSelectedUser] = useState<userDetailI>(
    // initialSelectedUserState
  // );

  // const [modalStyle] = React.useState(getModalStyle);

  const columns: columnI[] = [
    {
      id: "firstName",
      label: "First Name",
      minWidth: 170,
    },
    {
      id: "lastName",
      label: "Last Name",
      minWidth: 170,
    },

    {
      id: "email",
      label: "email",
      minWidth: 70,
    },
    {
      id: "contact",
      label: "contact",
      minWidth: 70,
    },
    {
      id: "ts",
      label: "Date",
      minWidth: 70,
    },
  ];

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
        (d) => d && d.email && d.email.includes(searchText)
      );
    } else {
      originalData = data;
    }

    originalData.forEach((d) => {
      if (d) {
        formattedData.push({
          ...d,
          ts: new Date(d.ts).toLocaleString(),
          
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
    <div>
      <div className="head-container">
        <HeadTitle> Agent Details </HeadTitle>
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

      {loadingManagerDetail ? (
        <Loader />
      ) : (
        <CustomTable
          rows={userData ? tableData : []}
          maxHeight={500}
          columns={columns}
        />
      )}
      {/* <Modal
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
          {selectedUser.deviceDetails ? (
            <PrettyPrintJson data={selectedUser.deviceDetails} />
          ) : (
            " No Device Details Found "
          )}
        </div>
      </Modal> */}
    </div>
  );
}

export default AgentDetails;
