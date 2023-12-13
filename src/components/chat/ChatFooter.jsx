import { IconButton } from "@mui/material";
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import {useRef, useState } from "react";
import EmojiBox from "./EmojiBox";


const ChatFooter = () => {
    const [showEmojiBox, setShowEmojiBox] = useState(false);
    const messageInputRef = useRef();

function insertEmoji(emoji) {
  const inputField = messageInputRef.current;
    var cursorPosition = inputField.selectionStart;

    var textBeforeCursor = inputField.value.substring(0, cursorPosition);
    var textAfterCursor = inputField.value.substring(cursorPosition);

    var updatedText = textBeforeCursor + emoji + textAfterCursor;

    inputField.value = updatedText;

    inputField.setSelectionRange(cursorPosition + emoji.length, cursorPosition + emoji.length);
}

  return (
    <div className="chat-footer flex justify-center relative items-center py-5">
      <form className="w-[70%] bg-[#F9F9F9] flex items-center justify-between rounded-lg shadow-xl p-3">
        <IconButton className="emoji-btn" onClick={() => {
          setShowEmojiBox(!showEmojiBox);
          }}>
          <FaRegSmile size={20} />
        </IconButton>
        <input
        ref={messageInputRef}
          className="flex-1 mx-2 bg-transparent"
          type="text"
          placeholder="Start typing..."
        />
        <IconButton type="submit">
          <VscSend style={{ color: "black" }} size={22} />
        </IconButton>
      </form>
      {showEmojiBox && <EmojiBox insertEmoji={insertEmoji} showEmojiBox={showEmojiBox} handleClose={() => setShowEmojiBox(false)}/>
      }
    </div>
  );
};

export default ChatFooter;
