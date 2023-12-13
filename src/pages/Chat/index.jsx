import MessageFromMe from "../../components/chat/MessageFromMe";
import MessageFromOther from "../../components/chat/MessageFromOther";
import ChatFooter from "../../components/chat/ChatFooter";
import ChatHeader from "../../components/chat/ChatHeader";

const Chat = () => {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 60px)" }}>
      <ChatHeader />

      <div className="chat-body min-h-[0] flex-1">
        <div className="overflow-y-scroll pt-4 px-10 h-full flex flex-col">
          <MessageFromMe />
          <MessageFromOther />
          <MessageFromOther />
          <MessageFromMe />
          <MessageFromMe />
          <MessageFromMe />
          <MessageFromOther />
          <MessageFromOther />
          <MessageFromMe />
          <MessageFromMe />
          <MessageFromOther />
          <MessageFromMe />
          <MessageFromMe />
          <MessageFromMe />
        </div>
      </div>

      <ChatFooter />
    </div>
  );
};

export default Chat;
