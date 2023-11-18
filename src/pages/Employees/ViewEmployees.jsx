import Button from "../../components/Button";
import UserAvatar from "../../assets/user.png";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

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
];

const ViewEmployees = ({ activeTab }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectionModelRef = useRef();

  const fetchUsers = async () => {
    try {
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
  // if(loading){
  //   return <div className="flex justify-center items-center h-[50vh]"><CircularProgress size={24} style={{color: "black"}}/></div>;
  // }
  return (
    <div
      className={
        activeTab === "viewEmployee" ? "mt-5 max-w-full flex" : "hidden"
      }
    >
      <DataGrid
        // autoHeight
        disableSelectionOnClick
        rows={users}
        // onRowClick={handleRowClick}
        // rowCount={users?.length}
        loading={loading}
        // rowsPerPageOptions={[30, 50, 75, 100]}
        // pagination
        width="auto"
        // getRowHeight={() => "auto"}
        checkboxSelection
        selectionModel={selectionModelRef.current}
        onSelectionModelChange={(ids) => {
          selectionModelRef.current = ids;
          // setSelectedRows(
          //   ids.map((id) => pageState?.data[id - pageState?.from]?.leadId)
          // );
        }}
        columns={columns}
        // components={{
        //   Toolbar: GridToolbar,
        //   Pagination: CustomPagination,
        // }}
        // disableColumnFilter
        sx={{
          boxShadow: 2,
          "& .MuiDataGrid-virtualScrollerContent .MuiSvgIcon-root": {
            color: "#ffffff",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold"
          }
        }}
        columnWidths={{
          checkbox: "30px",
        }}
      />
    </div>
  );
};

export default ViewEmployees;
