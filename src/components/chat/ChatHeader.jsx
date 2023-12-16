import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";
import { useStateContext } from "../../ContextProvider";
import { socket } from "../../App";

const ChatHeader = () => {
  const { User } = useStateContext();
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState("");

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

  const fetchOnlineUsers = async () => {
    try {
      const response = await axios.get("/users?online=1");
      const onlineUsers = response?.data?.data;
      setOnlineUsers(onlineUsers);

      if (socket) {
        socket.on("chat_getOnlineUsers", (users) => {
          setOnlineUsers(users?.length);
        });
      }
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
    if (User?.role === 1) {
      fetchUsers();
      fetchOnlineUsers();

      if (socket) {
        let timeout = null;
        const cb = () => {
          setIsTyping("");
          timeout = null;
        };
        socket.on("chat_is_typing", (username) => {
          setIsTyping(username);
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(cb, 3000);
        });
      }
    }
  }, []);
  return (
    <div className="chat-header shadow border-b border-gray-300 px-3 py-2 flex items-center justify-between">
      {User?.role === 1 && (
        <div className="relative mt-1">
          {users?.slice(0, 6)?.map((user, index) => (
            <div
              style={{
                transform: isTyping ? "translateY(-70%)" : "translateY(-50%)",
                left: index * 15,
              }}
              key={user?._id}
              className={`image-container absolute ${
                isTyping ? "top-[30%]" : "top-[50%]"
              } w-[28px] h-[28px]`}
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
              className={`absolute cursor-pointer w-max text-sm ${
                isTyping ? "top-[30%]" : "top-[50%]"
              }`}
              style={{
                left: 7 * 16,
                transform: isTyping ? "translateY(-70%)" : "translateY(-50%)",
              }}
            >
              {users?.length - 6} more
            </p>
          )}
          {!!isTyping && (
            <p className={`absolute fadeIn text-xs text-primary left-0 w-max -bottom-[28px]`}>
              {isTyping} is typing...
            </p>
          )}
        </div>
      )}
      <div className="flex flex-1 text-center flex-col items-center">
        <p className="font-extralight text-lg mt-1">Chat Group</p>
        {User?.role === 1 && (
          <p className="text-sm font-bold mb-0">
            {onlineUsers ? onlineUsers - 1 : onlineUsers}{" "}
            <span className="text-green-500">Online</span>
          </p>
        )}
      </div>
      <div>
        <IconButton>
          <BsThreeDots size={22} style={{ color: "black" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatHeader;
