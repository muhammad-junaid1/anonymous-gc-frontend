import { RxCaretDown } from "react-icons/rx";
import moment from "moment";
import { useStateContext } from "../../ContextProvider";
import MessageMenu from "./MessageMenu";
import { useState } from "react";

const MessageFromMe = ({ data }) => {
  const { User } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget?.querySelector(".caret-down-icon"));
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className="rounded-md relative max-w-[550px] mb-2 flex pl-3 pr-1 w-max self-end flex-col bg-[#007AFF] text-white "
    >
      <div className="flex mt-1 items-center justify-between">
        <p className="mr-2">{data?.content}</p>
        {User?.role === 1 && (
          <MessageMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            forMe={true}
          />
        )}
      </div>
      <span className="font-extralight text-sm m-0.5 self-end">
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
          fill="#007AFF"
        />
      </svg>
    </div>
  );
};

export default MessageFromMe;
