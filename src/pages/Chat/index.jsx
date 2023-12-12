import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router";
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import MessageFromMe from "../../components/chat/MessageFromMe";
import MessageFromOther from "../../components/chat/MessageFromOther";

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
    <div className="flex flex-col" style={{ height: "calc(100vh - 60px)" }}>
      <div className="chat-header border-b border-gray-300 px-3 py-2 flex items-center justify-between">
        <div className="relative">
          {users?.slice(0, 6)?.map((user, index) => (
            <div
              style={{ transform: "translateY(-50%)", left: index * 25 }}
              key={user?._id}
              className={`image-container absolute top-[50%] w-[40px] h-[40px]`}
            >
              <img
                src={user?.profile_picture}
                className="round-image border border-black"
                alt=""
              />
            </div>
          ))}
          {users?.length > 6 && (
            <p
              onClick={() => navigate("/employees")}
              className="absolute cursor-pointer w-max top-[50%]"
              style={{ left: 175, transform: "translateY(-50%)" }}
            >
              {users?.length - 6} more
            </p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <p className="font-extralight text-lg mb-1">Chat Group</p>
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

      <div className="chat-body min-h-[0] flex-1">
        <div className="overflow-y-scroll pt-4 px-10 h-full flex flex-col">
            

            <MessageFromMe/>
            <MessageFromOther/>


        </div>
      </div>

      <div className="chat-footer flex justify-center items-center py-5">
        <form className="w-[70%] bg-[#F9F9F9] flex items-center justify-between rounded-lg shadow-lg p-3">
          <IconButton>
            <FaRegSmile size={20} />
          </IconButton>
          <input
            className="flex-1 mx-2 bg-transparent"
            type="text"
            placeholder="Start typing..."
          />
          <IconButton type="submit">
            <VscSend style={{ color: "black" }} size={22} />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Chat;
