import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      const users = response?.data?.data;
      setUsers(users);
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
    <div className="min-h-screen">
      <div className="chat-header border-b border-gray-300 py-4 px-3 flex items-center justify-between">
        <div className="relative">
          {users?.slice(0, 6)?.map((user, index) => (
            <div style={{transform: "translateY(-50%)", left: index * 25}} key={user?._id} className={`image-container absolute top-[50%] w-[40px] h-[40px]`}>
              <img src={user?.profile_picture} className="round-image border border-black" alt="" />
            </div>
          ))}
          {users?.length > 6 && <p onClick={() => navigate("/employees")} className="absolute cursor-pointer w-max top-[50%]" style={{left: 175, transform: "translateY(-50%)"}}>{users?.length - 6} more</p>}
        </div>
        <div className="flex flex-col items-center">
          <p className="font-extralight text-2xl mb-1">Chat Group</p>
          <p className="text-sm font-bold">
            2 <span className="text-green-500">Online</span>
          </p>
        </div>
        <div>
          <IconButton>
            <BsThreeDots size={22} style={{ color: "black" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Chat;
