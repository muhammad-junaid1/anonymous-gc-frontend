import ChatFooter from "../../components/chat/ChatFooter";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";

const Chat = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatHeader />
      <ChatMessages />
      <ChatFooter />
    </div>
  );
};

export default Chat;
