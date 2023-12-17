import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa";
import CreateFlowModal from "../../components/chatflow/CreateFlowModal";
import UserCard from "../../components/UserCard";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import Step2 from "../../components/chatflow/Step2";
import NothingHere from "../../assets/nothing_here.png";
import UpdateRecipientsModal from "../../components/chatflow/UpdateRecipientsModal";
import Loader from "../../components/utils/Loader";

const ChatFlow = ({ activeTab }) => {
  const [loading, setLoading] = useState(true);
  const [flows, setFlows] = useState([]);
  const [recipientsModal, setRecipientsModal] = useState({ open: false });
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

  useEffect(() => {
    if (activeTab === "setFlow") {
      fetchFlows();
    }
  }, [activeTab]);
  if (loading) {
    return <Loader color="black" />;
  }
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
          {flows?.length === 0 ?  <div className="flex w-full justify-center slideDown items-center relative flex-col">
              <img src={NothingHere} width={400} alt="" />
              <h1 className="text-lg absolute bottom-4">Nothing here!</h1>
            </div> : flows?.map((flow) => (
            <UserCard
              onClick={() =>
                setRecipientsModal({ open: true, flow })
              }
              key={flow?._id}
              width={30}
              fetchFlows={fetchFlows}
              type="flow"
              data={{
                _id: flow?._id,
                displayName: flow?.user?.displayName,
                profile_picture: flow?.user?.profile_picture,
                username: flow?.user?.username,
                recipients: flow?.recipients?.length + " recipient(s)",
              }}
            />
          ))}
        </div>
      </div>

      {createFlowModal?.isOpen && (
        <CreateFlowModal
          fetchFlows={fetchFlows}
          createFlowModal={createFlowModal}
          handleClose={() => setCreateFlowModal({ isOpen: false })}
        />
      )}

      {recipientsModal?.open && (
        <UpdateRecipientsModal
          recipientsModal={recipientsModal}
          fetchFlows={fetchFlows}
          flow={recipientsModal?.flow}
          handleClose={() => setRecipientsModal({ open: false })}
          selectedEmployee={recipientsModal?.flow?.user}
        />
      )}
    </>
  );
};

export default ChatFlow;
