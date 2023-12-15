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
  const [recipientsUpdated, setRecipientsUpdated] = useState(false);
  const { User } = useStateContext();
  const messagesContainerRef = useRef();

  const setChatMessagesGrouped = (data) => {
    const groupedMessages = {};
    data?.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString();

      const message = { ...msg, date };

      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }

      groupedMessages[date].push(message);
    });

    const messagesWithDateSeparators = [];
    for (let i in groupedMessages) {
      messagesWithDateSeparators.push({
        type: "date-separator",
        date: groupedMessages[i][0]?.date,
      });
      messagesWithDateSeparators.push(...groupedMessages[i]);
    }

    setMessages(messagesWithDateSeparators);
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/messages");
      const messages = response?.data?.data;
      setChatMessagesGrouped(messages);
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

  const handleReloadChat = () => {
    setRecipientsUpdated(false);
    fetchMessages();
  }

  useEffect(() => {
    fetchMessages();

    if(socket) {
      socket.on("chat_recipients_updated", (status) => {
        setRecipientsUpdated(status);
      })
    }
  }, []);

  useEffect(() => {
    if (messagesContainerRef?.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="chat-body relative pb-3 min-h-[0] flex-1" style={{
      backgroundImage: "url(https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)", 
      backgroundPosition: "center", 
      backgroundColor: "rgba(255, 255, 255, 0.7)", 
      backgroundBlendMode: "overlay", 
      backgroundRepeat: "repeat"
    }}>
      <div
      style={{
        filter: recipientsUpdated && 'opacity(0.4)'
      }}
        ref={messagesContainerRef}
        className={`overflow-y-scroll pb-14 scroll-smooth pt-4 px-10 h-full flex flex-col ${recipientsUpdated && 'select-none pointer-events-none'}`}
      >
        {loading ? (
          <div className=" flex items-center h-full justify-center">
            <CircularProgress style={{ color: "grey" }} size={28} />
          </div>
        ) : messages?.length ? (
          messages?.map((message) => {
            if(message?.type === "date-separator") {
              return <div key={message?._id} className="flex mb-3 items-center justify-between">
                <div className="h-0.5 bg-[#dcdcdc80] flex-1"></div>
                <small className="px-2 font-bold">{message?.date}</small>
                <div className="h-0.5 bg-[#dcdcdc80] flex-1"></div>
              </div>
            } else if (message?.from?._id === User?._id) {
              return <MessageFromMe messageData={message} key={message?._id} />;
            } else {
              return <MessageFromOther messageData={message} key={message?._id} />;
            }
          })
        ) : (
          <div className="text-xl flex items-center h-full justify-center text-slate-300">
            Nothing to show here
          </div>
        )}
      </div>
          {recipientsUpdated &&
          <div className="absolute recipients-update-popup -bottom-5 left-0 right-0 w-full flex justify-center items-center">
            <div className="w-[40%] flex items-center justify-between bg-black text-white rounded shadow px-3 py-2">
                <p className="mb-0">Chat has some recent updates.</p> 
                <div className="flex items-center">
                  <p onClick={() => setRecipientsUpdated(false)} className="text-red-500 mr-5 cursor-pointer">Cancel</p>
                  <p onClick={handleReloadChat} className="text-green-500 cursor-pointer">Reload the chat</p>
                </div>
            </div>
          </div>
          }
    </div>
  );
};

export default ChatMessages;
