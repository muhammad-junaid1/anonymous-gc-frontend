import { CircularProgress, IconButton } from "@mui/material";
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import EmojiBox from "./EmojiBox";
import { IoMdImage } from "react-icons/io";
import { socket } from "../../App";
import { FaTimes } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { useStateContext } from "../../ContextProvider";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";
import { uploadFile } from "../../services";

const ChatFooter = () => {
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const [messageInputVal, setMessageInputVal] = useState("");
  const { User, messageBeingSent, setMessageBeingSent } = useStateContext();
  const messageInputRef = useRef();
  const imagePicker = useRef();
  const [imageBeingSent, setImageBeingSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    file: null,
    url: null,
  });

  // ****************************state variable to store the selected file******************************

  const [selectedFile, setSelectedFile] = useState("");

  const fileInputRef = useRef();

  const uploadFile = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getFile = async () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("name", selectedFile.name);
        formData.append("file", selectedFile);

        try {
          let response = await uploadFile(formData);
        } catch (error) {
          console.error("File upload failed:", error);
        }
      }
    };

    getFile();
  }, [selectedFile]);

  // ****************************************************************************************************

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
      if (selectedImage?.file) {
        setImageBeingSent(true);
        const formData = new FormData();
        formData.append("type", "image");
        formData.append("content", messageInputVal);
        formData.append("from", User?._id);
        // formData.append("recipients", []);
        formData.append("file", selectedImage?.file);

        await axios.post("/sendImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setImageBeingSent(false);

        setSelectedImage({
          file: null,
          url: null,
        });
      } else {
        const message = {
          type: "text",
          content: messageInputVal,
          from: User?._id,
          recipients: [],
        };
        if (socket) {
          socket.emit("chat_send_message", message);
          setMessageBeingSent(true);
        }
      }
      setMessageInputVal("");
    } catch (error) {
      console.log(error);
      setImageBeingSent(false);
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
      setSelectedImage({
        file,
        url: data.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleInput = (e) => {
    setMessageInputVal(e.target.value);
    // setTimeout(() => {
    //   socket.emit("chat_is_typing", User?.displayName);
    // }, 1000);

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
    setSelectedImage({
      file: null,
      url: null,
    });
    imagePicker.current.value = "";
  };

  return (
    <div className="chat-footer flex h-[16vh] justify-center relative items-center py-5">
      <form
        onSubmit={handleSendMessage}
        className="w-[70%] bg-[#F9F9F9] flex relative items-center justify-between rounded-lg shadow-xl p-3"
      >
        {!!selectedImage?.url && (
          <div className="absolute -translate-y-[105%] left-0 top-0 rounded bg-white shadow-lg p-2">
            <img
              alt=""
              src={selectedImage?.url}
              width={200}
              className="object-contain rounded"
            />
            <IconButton
              onClick={!imageBeingSent && handleUnSelectImage}
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

        {!selectedImage?.url && (
          <IconButton
            className="relative -right-[5px]"
            onClick={() => {
              imagePicker.current?.click();
            }}
          >
            <IoMdImage size={20} />
          </IconButton>
        )}

        {/* code here */}

        <button
          style={{ color: "grey", margin: "10px" }}
          onClick={() => uploadFile()}
        >
          <FaFileUpload size={20} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        {/* code here */}
        <input
          type="file"
          multiple={false}
          accept="image/*"
          onInput={handleSelectImage}
          hidden
          ref={imagePicker}
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
        {imageBeingSent || messageBeingSent ? (
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
