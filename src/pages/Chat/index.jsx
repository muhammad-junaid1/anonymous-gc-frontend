import React, { useState } from "react";
import Button from "../../components/Button";

const Chat = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const [selectedReceiver, setSelectedReceiver] = useState("Receiver");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleTextChange = (e) => {
    setTextMessage(e.target.value);
  };

  const handleReceiverChange = (e) => {
    setSelectedReceiver(e.target.value);
  };

  const isSendButtonDisabled = () => {
    return !selectedFile || !textMessage || !selectedReceiver;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-8 py-5 rounded min-h-screen flex flex-col">
      <strong className="text-2xl">Chat</strong>
      <div className="flex-grow"></div>
      <div className="h-[70px]  bg-gray-300 max-w-full rounded-md flex">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 p-2"
        >
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            value={textMessage}
            onChange={handleTextChange}
            placeholder="Type your message..."
          />
          <select value={selectedReceiver} onChange={handleReceiverChange}>
            <option value="Receiver" disabled>
              Select receiver
            </option>
            <option value="User1">User 1</option>
            <option value="User2">User 2</option>
          </select>
          <Button type="submit" disabled={isSendButtonDisabled()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
