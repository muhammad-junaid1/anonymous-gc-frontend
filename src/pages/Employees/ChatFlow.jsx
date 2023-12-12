import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa";
import CreateFlowModal from "../../components/chatflow/CreateFlowModal";
import UserCard from "../../components/UserCard";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";

const ChatFlow = ({ activeTab }) => {
  const [loading, setLoading] = useState(true);
  const [flows, setFlows] = useState([]);
  const [createFlowModal, setCreateFlowModal] = useState({ isOpen: false });

  const fetchFlows = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/flows");
      const flows = response?.data?.data;
      setFlows(flows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect (() => {
    fetchFlows();
  }, []);

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
        {flows?.map((flow) => <UserCard key={flow?._id}
            width={30}
            data={{
              displayName: "Ubaid",
              profile_picture:
                "http://localhost:5000/images/6548dad94b2200313936be41_Screenshot2023-11-17153915.png",
              username: "ubaid123",
            }}
          />)}
          
        </div>
      </div>

      {createFlowModal?.isOpen && (
        <CreateFlowModal
        fetchFlows={fetchFlows}
          createFlowModal={createFlowModal}
          handleClose={() => setCreateFlowModal({ isOpen: false })}
        />
      )}
    </>
  );
};

export default ChatFlow;
