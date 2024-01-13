import { RxCaretDown } from "react-icons/rx";
import moment from "moment";
import { useStateContext } from "../../ContextProvider";
import MessageMenu from "./MessageMenu";
import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";

const MessageFromMe = ({ messageData, noMenu = false }) => {
  const { User } = useStateContext();
  const [doesHaveRecipients, setDoesHaveRecipients] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState({});
  const handleContextMenu = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget?.querySelector(".caret-down-icon"));
  };

  useEffect(() => {
    if (data?.recipients?.length > 0) {
      setDoesHaveRecipients(true);
    } else {
      setDoesHaveRecipients(false);
    }
  }, [data]);

  useEffect(() => {
    setData(messageData);
  }, [messageData]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`rounded-md relative ${
        data?.type?.startsWith("image") ? "max-w-[280px]" : "max-w-[550px]"
      } mb-2 flex pl-3 pr-1 w-max self-end flex-col ${
        User?.role !== 1
          ? "bg-[#3d3d3d]"
          : doesHaveRecipients
          ? "bg-[#00b300]"
          : "bg-[#3d3d3d]"
      } text-white `}
    >
      <div className="flex mt-1 items-start justify-between w-full">
        <div className="flex flex-col w-full">
          {data?.type?.startsWith("image") ? (
            <img
              alt=""
              className="rounded object-cover w-full m-2 ml-0"
              src={data?.file}
            />
          ) : (data?.type !== "text") ? (
            <div className="flex flex-wrap flex-col items-center m-2 justify-center">
               <FaFile size={30}/>
               <p className="text-center mt-3 whitespace-pre-wrap text-sm">{data?.fileName}</p>
               <p onClick={() => window.open(data?.file)} className="cursor-pointer text-primary">Download</p>
            </div>
          ) : <></>}
          <p className={`mr-2 ${data?.type === "deleted" && 'text-[#9f9f9f] italic text-sm mt-1'}`}>{data?.content}</p>
        </div>
        {!noMenu && (
          <MessageMenu
            data={data}
            setData={setData}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            forMe={true}
          />
        )}
      </div>
      <span className="font-extralight text-xs m-0.5 self-end">
        {moment(data?.createdAt).format("hh:mm A")}
      </span>

      <svg
        className="absolute top-0 -right-[9px]"
        width="15"
        height="18"
        viewBox="0 0 9 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.22202 0C0.22202 0 5.95996 0 7.42201 0C8.88407 0 9.22198 1.5 7.87199 3C6.52199 4.5 0.721384 9.5 0.22202 11C-0.277344 12.5 0.22202 0 0.22202 0Z"
          fill={
            User?.role !== 1
              ? "#3d3d3d"
              : doesHaveRecipients
              ? "#00b300"
              : "#3d3d3d"
          }
        />
      </svg>
    </div>
  );
};

export default MessageFromMe;
