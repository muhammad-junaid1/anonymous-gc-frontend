import { Modal, Backdrop, IconButton, Tooltip } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import UserAvatar from "../../assets/user.png";
import MessageFromOther from "./MessageFromOther";
import MessageFromMe from "./MessageFromMe";
import Loader from "../utils/Loader";
import { DataGrid } from "@mui/x-data-grid";
import NothingHere from "../../assets/nothing_here.png";
import Button from "../Button";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "../../axiosConfig";

const style = {
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

const ForwardMessageModal = ({ forwardMessageModal = {}, setDoesHaveRecipients, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [flowRecipientsLoading, setFlowRecipientsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const selectionModelRef = useRef([]);
  const selectRows = (users, flowRecipients) => {
    if (users?.length > 0) {
      let indexes = [];

      users?.forEach((user, index) => {
        if (flowRecipients?.includes(user?._id)) {
          indexes.push(index + 1);
        }
      });
      setSelectedRows(indexes?.map((index) => users[index - 1]?._id));
      selectionModelRef.current = indexes;
    }
  };
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users");
      const users = response?.data?.data;

      const usersFormatted = users
        ?.filter((user) => user?._id !== forwardMessageModal?.data?.from?._id)
        ?.map((user, index) => {
          return {
            id: index + 1,
            ...user,
          };
        });
      setUsers(usersFormatted);
      selectRows(
        usersFormatted,
        forwardMessageModal?.data?.recipients?.map((recip) => recip?._id)
      );

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
  ];

  const handleUpdateRecipients = async () => {
    try {
      setBtnLoading(true);

      await axios.post(
        `/messages/${forwardMessageModal?.data?._id}`,
        JSON.stringify({
          recipients: selectedRows,
        })
      );

      setBtnLoading(false);
      handleClose();
      setDoesHaveRecipients(true);
      toast.success("Recipients are updated successfuly", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Sorry something went wrong!", {
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

  const handleSelectFlowRecipients = async () => {
    try {
      setFlowRecipientsLoading(true);
      const response = await axios.get(
        `/flows/${forwardMessageModal?.data?.from?.flow}`
      );
      const flow = response?.data?.data;

      selectRows(users, flow?.recipients);
      setFlowRecipientsLoading(false);
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
  }, []);
  return (
    <Modal
      keepMounted
      open={forwardMessageModal?.isOpen}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div
        style={style}
        className={`w-[calc(100%-20px)] md:w-[70%] overflow-y-scroll h-[90%] bg-white absolute top-1/2 left-1/2 px-5 pt-8 pb-6 rounded-md`}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: 7,
            top: 10,
            color: "black",
          }}
          onClick={handleClose}
        >
          <IoMdClose size={18} />
        </IconButton>
        {!loading && [
          forwardMessageModal?.forMe ? (
            <MessageFromMe noMenu data={forwardMessageModal?.data} />
          ) : (
            <MessageFromOther noMenu data={forwardMessageModal?.data} />
          ),
        ]}

        <div className="mt-4">
          {!loading ? (
            [
              users?.length === 0 ? (
                <div className="flex slideDown items-center relative flex-col">
                  <img src={NothingHere} width={400} alt="" />
                  <h1 className="text-lg absolute bottom-4">Nothing here!</h1>
                </div>
              ) : (
                <div className="">
                  <div className="text-lg mb-4 flex justify-center items-center text-center">
                    <span>Select Recipients</span>
                    {forwardMessageModal?.data?.from?.flow ? (
                      <Tooltip title="Use recipients from the flow">
                        <IconButton onClick={handleSelectFlowRecipients}>
                          <IoMdAddCircleOutline
                            size={20}
                            className="text-primary"
                          />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <></>
                    )}
                  </div>
                  {selectedRows?.length > 0 && (
                    <div className="flex items-center justify-center">
                      <Button onClick={handleUpdateRecipients}>
                        {btnLoading ? (
                          <CircularProgress
                            size={18}
                            style={{ color: "white" }}
                          />
                        ) : (
                          <span>Assign the selected recipients</span>
                        )}
                      </Button>
                    </div>
                  )}

                  {flowRecipientsLoading ? (
                    <div className="flex mt-20 justify-center">
                      <CircularProgress size={22} />
                    </div>
                  ) : (
                    <DataGrid
                      className="slideDown mt-8"
                      disableRowSelectionOnClick
                      rows={users}
                      loading={loading}
                      width="auto"
                      checkboxSelection
                      rowSelectionModel={selectionModelRef.current}
                      onRowSelectionModelChange={(ids) => {
                        selectionModelRef.current = ids;
                        setSelectedRows(ids?.map((id) => users[id - 1]?._id));
                      }}
                      columns={columns}
                      sx={{
                        boxShadow: 2,
                        "& .MuiDataGrid-virtualScrollerContent .MuiSvgIcon-root":
                          {
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
                  )}
                </div>
              ),
            ]
          ) : (
            <Loader color="black" />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ForwardMessageModal;
