import { CircularProgress, IconButton } from "@mui/material";
import { VscSend } from "react-icons/vsc";
import { FaFile, FaRegSmile } from "react-icons/fa";
import { useRef, useState } from "react";
import EmojiBox from "./EmojiBox";
import { IoMdAttach } from "react-icons/io";
import { socket } from "../../App";
import { FaTimes } from "react-icons/fa";
import { useStateContext } from "../../ContextProvider";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";

const ChatFooter = () => {
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const [messageInputVal, setMessageInputVal] = useState("");
  const {
    User,
    messageBeingSent,
    setMessageBeingSent,
    replyMessage,
    setReplyMessage,
  } = useStateContext();
  const messageInputRef = useRef();
  const filePicker = useRef();
  const [fileBeingSent, setFileBeingSent] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    url: null,
  });

  const typing = useRef(false);
  const timeout = useRef(undefined);

  function insertEmoji(emoji) {
    const inputField = messageInputRef.current;
    var cursorPosition = inputField.selectionStart;

    var textBeforeCursor = inputField.value.substring(0, cursorPosition);
    var textAfterCursor = inputField.value.substring(cursorPosition);

    var updatedText = textBeforeCursor + emoji + textAfterCursor;

    inputField.value = updatedText;
    setMessageInputVal(updatedText);

    inputField.setSelectionRange(
      cursorPosition + emoji.length,
      cursorPosition + emoji.length
    );
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      if (selectedFile?.file) {
        setFileBeingSent(true);
        const formData = new FormData();
        formData.append("type", selectedFile?.file?.type);
        formData.append("content", messageInputVal);
        formData.append("from", User?._id);
        formData.append("fileName", selectedFile?.file?.name);
        formData.append("file", selectedFile?.file);

        await axios.post(
          `/sendFile?isReply=${
            replyMessage ? replyMessage?.from?._id : "false"
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setFileBeingSent(false);

        setSelectedFile({
          file: null,
          url: null,
        });
      } else {
        const data = {
          message: {
            type: "text",
            content: messageInputVal,
            from: User?._id,
            recipients: [],
          },
          isReply: replyMessage ? replyMessage?.from?._id : false,
        };
        if (socket) {
          socket.emit("chat_send_message", data);
          setMessageBeingSent(true);
        }
      }
      setMessageInputVal("");
      setReplyMessage(null);
    } catch (error) {
      console.log(error);
      setFileBeingSent(false);
      handleUnSelectImage();
      toast.error("Something went wrong, try again please!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (data) => {
      setSelectedFile({
        file,
        url: data.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInput = (e) => {
    setMessageInputVal(e.target.value);

    function timeoutFunction() {
      typing.current = false;
    }

    if (typing.current == false) {
      typing.current = true;
      socket.emit("chat_is_typing", User?.displayName);
      timeout.current = setTimeout(timeoutFunction, 5000);
    } else {
      clearTimeout(timeout);
      timeout.current = setTimeout(timeoutFunction, 5000);
    }
  };

  const handleUnSelectImage = () => {
    setSelectedFile({
      file: null,
      url: null,
    });
    filePicker.current.value = "";
  };

  return (
    <div className="chat-footer flex h-[16vh] justify-center relative items-center py-5">
      <form
        onSubmit={handleSendMessage}
        className="w-[70%] bg-[#F9F9F9] flex relative items-center justify-between rounded-lg shadow-xl p-3"
      >
        {!!selectedFile?.file && (
          <div className="absolute -translate-y-[105%] left-0 top-0 rounded bg-white shadow-lg p-2">
            {selectedFile?.file?.type?.startsWith("image") ? (
              <img
                alt=""
                src={selectedFile?.url}
                width={200}
                className="object-contain rounded"
              />
            ) : (
              <div className="flex flex-wrap p-4 items-center justify-center flex-col">
                <FaFile size={39} />
                <p className="text-center mt-3 text-sm text-gray-600 whitespace-pre-wrap">
                  {selectedFile?.file?.name}
                </p>
              </div>
            )}
            <IconButton
              onClick={!fileBeingSent && handleUnSelectImage}
              sx={{
                position: "absolute",
                "&:hover": {
                  background: "red",
                },
                background: "red",
                padding: "3px",
              }}
              className="-top-0 -right-0"
            >
              <FaTimes size={18} style={{ color: "white" }} />
            </IconButton>
          </div>
        )}

        {!selectedFile?.file && (
          <IconButton
            className="relative -right-[5px]"
            onClick={() => {
              filePicker.current?.click();
            }}
          >
            <IoMdAttach size={20} />
          </IconButton>
        )}

        <input
          type="file"
          multiple={false}
          onInput={handleSelectImage}
          hidden
          ref={filePicker}
        />
        <IconButton
          className="emoji-btn"
          onClick={() => {
            setShowEmojiBox(!showEmojiBox);
          }}
        >
          <FaRegSmile size={20} />
        </IconButton>
        <input
          ref={messageInputRef}
          className="flex-1 mx-2 bg-transparent"
          type="text"
          placeholder="Start typing..."
          value={messageInputVal}
          onInput={handleInput}
        />
        {fileBeingSent || messageBeingSent ? (
          <CircularProgress size={22} style={{ color: "black" }} />
        ) : (
          <IconButton type="submit">
            <VscSend style={{ color: "black" }} size={22} />
          </IconButton>
        )}
      </form>
      {showEmojiBox && (
        <EmojiBox
          insertEmoji={insertEmoji}
          showEmojiBox={showEmojiBox}
          handleClose={() => setShowEmojiBox(false)}
        />
      )}
    </div>
  );
};

export default ChatFooter;
