import { useState } from "react";
import Button from "../../components/Button";

const ChatFlow = ({ activeTab }) => {
  const [isSetFlowPopupVisible, setSetFlowPopupVisibility] = useState(false);

  const handleSetFlowButtonClick = () => {
    setSetFlowPopupVisibility(true);
  };

  const closeSetFlowPopup = () => {
    setSetFlowPopupVisibility(false);
  };
  return (
    <>
      <div
        className={
          activeTab === "setFlow"
            ? "h-[70px] mt-5 slideDown bg-gray-700 max-w-full rounded-md flex"
            : "hidden"
        }
      >
        {/* 1 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <div className="mb-3 h-[60px] image-container">
            <img
              className="round-image stroke-black"
              width={60}
              height={60}
              alt="profile pic"
            />
          </div>
        </div>
        {/* 2 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <strong>Username</strong>
        </div>
        {/* 3 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <strong>ID</strong>
        </div>
        {/* 4 */}
        <div className="w-2/5 bg-gray-300 p-4 flex flex-col">
          <div className=" ml-auto">
            <Button onClick={handleSetFlowButtonClick}>Set Flow</Button>
          </div>
        </div>
      </div>

      {/* Set Flow Popup */}
      {isSetFlowPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            {/* Image, Username, ID, and Done button in a row */}
            <div className="flex items-center mb-3">
              {/* 1. Profile Picture */}
              <div className="mr-3 h-[60px]">
                <img
                  className="rounded-full border border-black"
                  width={60}
                  height={60}
                  src="URL_TO_PROFILE_PICTURE"
                  alt="profile pic"
                />
              </div>

              {/* 2. Username */}
              <div className="mr-3">
                <strong>Username</strong>
              </div>

              {/* 3. ID */}
              <div className="mr-3">
                <strong>ID</strong>
              </div>

              {/* 4. Done button */}
              <div>
                <Button onClick={handleSetFlowButtonClick}>Assign</Button>
              </div>
            </div>

            {/* Close button separately below */}
            <Button onClick={closeSetFlowPopup} className="mt-3">
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatFlow;
