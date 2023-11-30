import { useState } from "react";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa";
import CreateFlowModal from "../../components/chatflow/CreateFlowModal";
import UserCard from "../../components/UserCard";

const ChatFlow = ({ activeTab }) => {
  const [isSetFlowPopupVisible, setSetFlowPopupVisibility] = useState(false);
  const [createFlowModal, setCreateFlowModal] = useState({ isOpen: false });

  const handleSetFlowButtonClick = () => {
    setSetFlowPopupVisibility(true);
  };

  const closeSetFlowPopup = () => {
    setSetFlowPopupVisibility(false);
  };
  return (
    <>
      <div
        className={activeTab === "setFlow" ? "slideDown max-w-full" : "hidden"}
      >
        <div className="mt-5">
          <Button onClick={() => setCreateFlowModal({ isOpen: true })}>
            <div className="flex items-center">
              <FaPlus size={16} className="mr-1" />
              Create Flow
            </div>
          </Button>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <UserCard width={30} data={{
            
            displayName: "Ubaid", 
            profile_picture: "http://localhost:5000/images/6548dad94b2200313936be41_Screenshot2023-11-17153915.png",
            username: "ubaid123"
          }}/>
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

      <CreateFlowModal
        createFlowModal={createFlowModal}
        handleClose={() => setCreateFlowModal({ isOpen: false })}
      />
    </>
  );
};

export default ChatFlow;
