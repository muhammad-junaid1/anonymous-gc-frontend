import { RxCaretDown } from "react-icons/rx";

const MessageFromOther = () => {
  return (
    <div className="rounded-md relative mb-2 flex pl-2 pr-1 w-max flex-col bg-[#7b7b7b] text-white ">
      <div className="flex mt-1 items-center justify-between">
        <p className="mr-2">Yeah Sure.</p>
        <RxCaretDown size={28} style={{ color: "white" }} />
      </div>
      <span className="font-extralight text-sm m-0.5 self-end">11:52 PM</span>

      <svg
        className="absolute top-0 -left-[9px]"
        width="15"
        height="18"
        viewBox="0 0 9 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.22202 0C0.22202 0 5.95996 0 7.42201 0C8.88407 0 9.22198 1.5 7.87199 3C6.52199 4.5 0.721384 9.5 0.22202 11C-0.277344 12.5 0.22202 0 0.22202 0Z"
          fill="#7b7b7b"
        />
      </svg>
    </div>
  );
};

export default MessageFromOther;
