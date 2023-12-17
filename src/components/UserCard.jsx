import { CircularProgress, IconButton } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import axios from "../axiosConfig";
import { toast } from "react-toastify";
import { useState } from "react";

const UserCard = ({
  data,
  onClick,
  className,
  width,
  type = "",
  fetchFlows,
}) => {
  const [btnloading, setbtnloading] = useState(false);
  const deleteFlow = async () => {
    try {
      setbtnloading(true);
      const response = await axios.delete("/flows/" + data?._id);
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
      fetchFlows();
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

  console.log(data)

  return (
    <div
      onClick={(e) => {

        if(!e.target.closest(".delete-btn")){
          onClick();
        }
      }}
      style={{ width: width + "%" }}
      className={`bg-[#e7e7e7] shadow cursor-pointer rounded justify-between py-3 flex items-center pl-4 ${
        type === "flow" ? "pr-3" : "pr-8"
      } ${className}`}
    >
      <div className="flex items-center">
        <div className=" w-[60px] mr-4 h-[60px] image-container">
          <img
            src={data?.profile_picture}
            className="round-image stroke-black"
            alt="profile pic"
          />
        </div>
        {/* 3 */}
        <div>
          <div className="flex items-center">
            <strong className="mr-1"> {data?.displayName}</strong>
            <small>@{data?.username}</small>
          </div>
          <p className="text-primary">{data?.recipients}</p>
        </div>
      </div>
      {type === "flow" &&
        (btnloading ? (
          <CircularProgress className="mr-2" size={18} />
        ) : (
          <IconButton className="delete-btn" onClick={deleteFlow}>
            <FaTrashAlt size={18} style={{ color: "red" }} />
          </IconButton>
        ))}
    </div>
  );
};

export default UserCard;
