import { useEffect, useRef, useState } from "react";
import { socket } from "../../App";
import { useStateContext } from "../../ContextProvider";
import axios from "../../axiosConfig";
import MessageFromMe from "./MessageFromMe";
import MessageFromOther from "./MessageFromOther";
import { toast } from "react-toastify";
import { GoArrowDown } from "react-icons/go";
import { CircularProgress } from "@mui/material";

const ChatMessages = () => {
  const [messages, setMessages] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [recipientsUpdated, setRecipientsUpdated] = useState(false);
  const [newMessages, setNewMessages] = useState(0);
  const { User, setReceivedMessages, setMessageBeingSent } = useStateContext();
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

    setMessages({ data: messagesWithDateSeparators, scroll: true });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/messages");
      const messages = response?.data?.data;
      setChatMessagesGrouped(messages);
      scrollBottom();
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
  };

  useEffect(() => {
    if (!scrollToBottom) {
      setNewMessages(0);
    }
  }, [scrollToBottom]);

  useEffect(() => {
    fetchMessages();

    if (socket) {
        socket.on("chat_message", (newMessage) => {
          if (newMessage?.from?._id === User?._id) {
            setMessages(({ data }) => ({
              data: [...data, newMessage],
              scroll: true,
            }));
          } else if (User?.role === 1 && newMessage?.from?._id !== User?._id) {
            setNewMessages((prevMessages) => prevMessages + 1);
            setMessages(({ data }) => ({
              data: [...data, newMessage],
              scroll: false,
            }));
          }
        });

      socket.on("chat_recipients_updated", ({ update }) => {
        setRecipientsUpdated(update);
      });

      socket.on("chat_message_deleted", (id) => {
        setMessages(({ data }) => {
          const messagesCopy = [...data];

          const messageIdx = data?.findIndex((message) => message?._id === id);
          if (messageIdx >= 0) {
            messagesCopy[messageIdx] = {
              ...messagesCopy[messageIdx],
              type: "deleted",
              content: "This message was deleted",
              recipients: [],
              image: "",
            };
          }

          return { data: messagesCopy, scroll: false };
        });
      });
    }
  }, []);

  const scrollBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight -
      messagesContainerRef.current.offsetHeight;
  };

  useEffect(() => {
    if (messages?.scroll) {
      if (messagesContainerRef.current) {
        setTimeout(() => scrollBottom(), 0);
        setReceivedMessages(0);
        setMessageBeingSent(false);
        socket.emit("chat_mark_read", User?._id);
      }
    }
  }, [messages]);

  const handleScroll = (e) => {
    if (
      e.currentTarget.scrollTop <
      e.currentTarget.scrollHeight - 100 - e.currentTarget.offsetHeight
    ) {
      setScrollToBottom(true);
    } else {
      setScrollToBottom(false);
    }
  };
  return (
    <>
      <div
        className="chat-body relative pb-3 min-h-[73vh] h-[73vh]"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backgroundBlendMode: "overlay",
          backgroundRepeat: "repeat",
        }}
      >
        <div
          style={{
            filter: (recipientsUpdated) && "opacity(0.4)",
          }}
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className={`overflow-y-scroll pb-14 scroll-smooth pt-4 px-10 h-full flex flex-col ${
            recipientsUpdated && "select-none pointer-events-none"
          }`}
        >
          {loading ? (
            <div className=" flex items-center h-full justify-center">
              <CircularProgress style={{ color: "grey" }} size={28} />
            </div>
          ) : messages?.data?.length ? (
            messages?.data?.map((message) => {
              if (message?.type === "date-separator") {
                return (
                  <div
                    key={message?._id}
                    className="flex mb-3 items-center justify-between"
                  >
                    <div className="h-0.5 bg-[#dcdcdc80] flex-1"></div>
                    <small className="px-2 font-bold">{message?.date}</small>
                    <div className="h-0.5 bg-[#dcdcdc80] flex-1"></div>
                  </div>
                );
              } else if (message?.from?._id === User?._id) {
                return (
                  <MessageFromMe
                    noMenu={message?.type === "deleted"}
                    messageData={message}
                    key={message?._id}
                  />
                );
              } else {
                return (
                  <MessageFromOther
                    noMenu={message?.type === "deleted"}
                    messageData={message}
                    key={message?._id}
                  />
                );
              }
            })
          ) : (
            <div className="text-xl flex items-center h-full justify-center text-slate-300">
              Nothing to show here
            </div>
          )}

          {!!scrollToBottom && (
            <div
              onClick={scrollBottom}
              className="bg-black z-50 shadow-lg w-max p-2 absolute right-10 bottom-7 cursor-pointer rounded-lg flex items-center justify-center"
            >
              <GoArrowDown size={20} style={{ color: "white" }} />
              {!!newMessages && (
                <div className="absolute z-[100] -top-1 flex justify-center items-center -right-1 rounded-full text-white w-[20px] h-[20px] bg-primary shadow-lg">
                  {newMessages}
                </div>
              )}
            </div>
          )}
        </div>
        {recipientsUpdated && (
          <div className="absolute recipients-update-popup -bottom-5 left-0 right-0 w-full flex justify-center items-center">
            <div className="w-[70%] flex items-center justify-between bg-black text-white rounded shadow px-3 py-2">
              <p className="mb-0">Chat has some recent updates.</p>
              <div className="flex items-center">
                <p
                  onClick={() => setRecipientsUpdated(false)}
                  className="text-red-500 mr-5 cursor-pointer"
                >
                  Cancel
                </p>
                <p
                  onClick={handleReloadChat}
                  className="text-green-500 cursor-pointer"
                >
                  Reload the chat
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatMessages;
