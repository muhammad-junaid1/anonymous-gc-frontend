import moment from "moment";
import { useStateContext } from "../../ContextProvider";
import { useEffect, useState } from "react";
import MessageMenu from "./MessageMenu";
import UserCard from "../UserCard";
import DefaultImg from "../../assets/user.png";

const MessageFromOther = ({ messageData, noMenu = false }) => {
  const { User } = useStateContext();
  const [doesHaveRecipients, setDoesHaveRecipients] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromDetails, setFromDetails] = useState(false);
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
  }, [data?.recipients]);

  useEffect(() => {
    setData(messageData);
  }, [messageData]);

  const handleHoverUserAvatar = () => {
    setFromDetails(true);
  }

  return (
    <>
      <div className="flex relative items-center mb-2 ">
      {User?.role === 1 &&
        <div
        onMouseEnter={handleHoverUserAvatar}
        onMouseLeave={() => setFromDetails(false)}
          className="image-container cursor-pointer mr-3 self-start w-[40px] h-[40px]"
        >
          <img
            src={data?.from?.profile_picture || DefaultImg}
            className="round-image"
            alt=""
          />
          
        </div>
      }
        <div
          onContextMenu={handleContextMenu}
          className={`rounded-md relative ${data?.type === "image" ? 'max-w-[280px]' : 'max-w-[550px]'} flex pl-2 pr-1 w-max flex-col ${
            doesHaveRecipients ? "bg-[#00b300]" : "bg-[#3d3d3d]"
          } text-white`}
        >
          <div className={`flex mt-1 items-center ${User?.role === 1 ? 'justify-between': 'justify-end'} w-full`}>
          {User?.role === 1 &&
            <strong
              className={`underline pr-2 ${
                doesHaveRecipients
                  ? "decoration-[#8bd08b]"
                  : "decoration-[#838383]"
              }`}
            >
              {data?.from?.displayName}
            </strong>
          }
            {!noMenu && (
              <MessageMenu
                data={data}
                setData={setData}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
              />
            )}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="pr-1">
            {data?.type==="image" ? <img alt="" className="my-2 w-full object-cover rounded" src={data?.image}/> : <></>}
              <p className={`mr-2 ${data?.type === "deleted" && 'text-[#9f9f9f] italic text-sm mt-1'}`}>{data?.content}</p>
            </div>
          </div>
          <span className="font-extralight text-xs m-0.5 self-end">
            {moment(data?.createdAt).format("hh:mm A")}
          </span>
          <svg
            className="absolute -left-[9px] -top-[1px]"
            width="15"
            height="18"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.9999 0.5C8.9999 0.5 3.26197 0.5 1.79991 0.5C0.337859 0.5 -5.98431e-05 2 1.34994 3.5C2.69993 5 8.50054 10 8.9999 11.5C9.49927 13 8.9999 0.5 8.9999 0.5Z"
              fill={doesHaveRecipients ? "#00b300" : "#3d3d3d"}
            />
          </svg>
        </div>

        {fromDetails ? <div className="bg-white z-[10000] rounded absolute translate-y-[45%] shadow-lg top-0 left-5 p-1">
            <UserCard data={data?.from}/>
          </div> : <></>}
      </div>

    </>
  );
};

export default MessageFromOther;
