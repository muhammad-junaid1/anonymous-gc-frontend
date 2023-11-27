import { useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  IconButton,
  Button as MuiButton,
  CircularProgress,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";
import UserCard from "../UserCard";
import Loader from "../utils/Loader";

const style = {
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

const CreateFlowModal = ({ createFlowModal = {}, handleClose }) => {
  const [btnloading, setbtnloading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const handleCreateFlow = async () => {
    try {
      setbtnloading(true);
      const response = await axios.delete("/flows");
      toast.success(response.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong", {
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
    setbtnloading(false);
  };

  const goToSecondStep = () => {};

  const fetchEmployeesList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users?without-flow=1");
      const users = response?.data?.data;
      setEmployees(users);
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
    if (createFlowModal?.isOpen) {
      fetchEmployeesList();
    }
  }, [createFlowModal?.isOpen]);

  return (
    <Modal
      keepMounted
      open={createFlowModal?.isOpen}
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
        className={`w-[calc(100%-20px)] md:w-[60%] bg-white absolute top-1/2 left-1/2 px-5 pt-12 pb-6 rounded-md`}
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

        <h1 className="text-lg text-center">Step 1: Select Employee</h1>

        <div className="py-4 flex gap-4 flex-wrap items-start h-[230px] overflow-y-scroll">
          {loading ? (
            <Loader color="black" />
          ) : employees?.length > 0 ? (
            employees?.map((emp) => (
              <UserCard
                onClick={() => setSelectedEmployee(emp?._id)}
                className={selectedEmployee === emp?._id && "border-2 bg-blue-100 border-primary"}
                key={emp?._id}
                data={emp}
              />
            ))
          ) : (
            <p>No data yet.</p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-center space-x-2">
          <Button
            props={{ className: "w-full", disabled: !selectedEmployee }}
            style={{
              color: "white",
            }}
            onClick={goToSecondStep}
          >
            {btnloading ? (
              <CircularProgress size={18} sx={{ color: "white" }} />
            ) : (
              <span>Next</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateFlowModal;
