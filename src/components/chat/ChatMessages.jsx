import { useEffect, useRef, useState } from "react";
import { socket } from "../../App";
import { useStateContext } from "../../ContextProvider";
import axios from "../../axiosConfig";
import MessageFromMe from "./MessageFromMe";
import MessageFromOther from "./MessageFromOther";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { User } = useStateContext();
  const messagesContainerRef = useRef();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/messages");
      const messages = response?.data?.data;
      setMessages(messages);

      if (socket) {
        socket.on("chat_message", (newMessage) => {
          if (User?.role === 1 || newMessage?.from?._id === User?._id) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        });
      }
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
    fetchMessages();
  }, []);

  useEffect(() => {
    if (messagesContainerRef?.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="chat-body min-h-[0] flex-1">
      <div
        ref={messagesContainerRef}
        className="overflow-y-scroll scroll-smooth pt-4 px-10 h-full flex flex-col"
      >
        {loading ? (
          <div className=" flex items-center h-full justify-center">
            <CircularProgress style={{ color: "grey" }} size={28} />
          </div>
        ) : messages?.length ? (
          messages?.map((message) => {
            if (message?.from?._id === User?._id) {
              return <MessageFromMe data={message} key={message?._id} />;
            } else {
              return <MessageFromOther data={message} key={message?._id} />;
            }
          })
        ) : (
          <div className="text-xl flex items-center h-full justify-center text-slate-300">
            Nothing to show here
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;