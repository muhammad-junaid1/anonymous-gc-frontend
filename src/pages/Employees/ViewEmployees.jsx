import UserAvatar from "../../assets/user.png";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, IconButton } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import NothingHere from "../../assets/nothing_here.png";
import DeleteUserModal from "../../components/employees/DeleteUserModal";
import UpdateUserModal from "../../components/employees/UpdateUserModal";
import Loader from "../../components/utils/Loader";

const ViewEmployees = ({ activeTab }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserModal, setDeleteUserModal] = useState({
    isOpen: false,
    userID: null,
  });
  const [updateUserModal, setUpdateUserModal] = useState({
    isOpen: false,
    data: null,
  });

  const selectionModelRef = useRef();

  const columns = [
    {
      field: "id",
      headerName: "#",
      minWidth: 40,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return <strong>{cellValues?.formattedValue}</strong>;
      },
    },
    {
      field: "profile_picture",
      headerName: "Picture",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div className="image-container w-[50px] h-[50px]">
            <img
              className="round-image"
              src={cellValues?.formattedValue || UserAvatar}
              width={50}
              alt=""
            />
          </div>
        );
      },
    },

    {
      field: "displayName",
      headerName: "Display Name",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return <p>{cellValues?.formattedValue}</p>;
      },
    },

    {
      field: "username",
      headerName: "User ID",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return <p>{cellValues?.formattedValue}</p>;
      },
    },

    {
      field: "password",
      headerName: "Password",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return <p>{cellValues?.formattedValue}</p>;
      },
    },
    {
      field: "",
      headerName: "Actions",
      minWidth: 100,
      headerAlign: "center",
      flex: 1,
      type: "actions",
      renderCell: (cellValues) => {
        return (
          <div className="flex items-center">
            <IconButton onClick={() => setUpdateUserModal({
              isOpen: true, 
              data: cellValues?.row
            })}>
              <FiEdit style={{ color: "#006cff" }} size={18} />
            </IconButton>
            <IconButton
              onClick={() =>
                setDeleteUserModal({
                  isOpen: true,
                  userID: cellValues?.row?._id,
                })
              }
            >
              <FaTrashAlt style={{ color: "red" }} size={18} />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users");
      const users = response?.data?.data;

      const usersFormatted = users?.map((user, index) => {
        return {
          id: index + 1,
          ...user,
        };
      });
      setUsers(usersFormatted);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);
  return (
    <>
      <div className={activeTab === "viewEmployee" ? "mt-5" : "hidden"}>
        {!loading ? [
          users?.length === 0 ? (
            <div className="flex slideDown items-center relative flex-col">
              <img src={NothingHere} width={400} alt="" />
              <h1 className="text-lg absolute bottom-4">Nothing here!</h1>
            </div>
          ) : (
            <DataGrid
              className="slideDown"
              disableSelectionOnClick={true}
              rows={users}
              loading={loading}
              width="auto"
              checkboxSelection
              selectionModel={selectionModelRef.current}
              onSelectionModelChange={(ids) => {
                selectionModelRef.current = ids;
              }}
              columns={columns}
              sx={{
                boxShadow: 2,
                "& .MuiDataGrid-virtualScrollerContent .MuiSvgIcon-root": {
                  color: "black",
                },
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  justifyContent: "center",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
              }}
              columnWidths={{
                checkbox: "30px",
              }}
            />
          ),
        ] : <Loader color="black" />}
      </div>

      <DeleteUserModal
        fetchUsers={fetchUsers}
        deleteUserModal={deleteUserModal}
        handleClose={() => setDeleteUserModal({ isOpen: false })}
      />
      <UpdateUserModal
        fetchUsers={fetchUsers}
        updateUserModal={updateUserModal}
        handleClose={() => setUpdateUserModal({ isOpen: false })}
      />
    </>
  );
};

export default ViewEmployees;
