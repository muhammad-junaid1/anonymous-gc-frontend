import moment from "moment";
import { useStateContext } from "../../ContextProvider";
import { useEffect, useState } from "react";
import MessageMenu from "./MessageMenu";
const MessageFromOther = ({ data }) => {
  const { User } = useStateContext();
  const [doesHaveRecipients, setDoesHaveRecipients] = useState(false);
  
  useEffect(() => {
    if(data?.recipients > 0){
      setDoesHaveRecipients(true);
    }
  }, [data?.recipients]);
  return (
    <div className="flex items-center mb-2 ">
      <div className="image-container mr-3 self-start w-[40px] h-[40px]">
        <img
          src={data?.from?.profile_picture}
          className="round-image"
          alt=""
        />
      </div>
      <div className={`rounded-md relative max-w-[550px] flex pl-3 pr-1 w-max flex-col ${doesHaveRecipients ? 'bg-[#00b300]' : 'bg-[#3d3d3d]'} text-white`}>
        <div className="flex mt-1 items-center justify-between">
          <strong>{data?.from?.displayName}</strong>
          {User?.role === 1 && (
            <MessageMenu/>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="mr-2">{data?.content}</p>
        </div>
        <span className="font-extralight text-sm m-0.5 self-end">
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
            fill={doesHaveRecipients ? '#00b300' : '#3d3d3d'}
          />
        </svg>
      </div>
    </div>
  );
};

export default MessageFromOther;
