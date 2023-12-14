import MessageFromMe from "../../components/chat/MessageFromMe";
import MessageFromOther from "../../components/chat/MessageFromOther";
import ChatFooter from "../../components/chat/ChatFooter";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";

const Chat = () => {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 60px)" }}>
      <ChatHeader />
      <ChatMessages />
      <ChatFooter />
    </div>
  );
};

export default Chat;
