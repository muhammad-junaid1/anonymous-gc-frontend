import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import { useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "./ContextProvider";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "./axiosConfig";
import Auth from "./pages/Auth";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Loader from "./components/utils/Loader";
import Settings from "./pages/Settings";
import Employees from "./pages/Employees";
import Chat from "./pages/Chat";
import { io } from "socket.io-client";
import { FaInbox } from "react-icons/fa";
import { useIdleTimer } from "react-idle-timer";
import { Link } from "react-router-dom";
import ringtone from "./assets/new-message-ringtone.mp3";

const allRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/settings",
    element: <Settings />,
    isAdmin: true,
  },
  {
    path: "/employees",
    element: <Employees />,
    isAdmin: true,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
];

export const socket = io(import.meta.env.VITE_BACKEND_URL);

function App() {
  const token = localStorage.getItem("auth-token");
  const location = useLocation();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receivedMessages, setReceivedMessages] = useState(0);
  const { User, setUser } = useStateContext();

  const ringtoneElem = useRef();

  const [blink, setBlink] = useState(false);
  const { isIdle } = useIdleTimer({
    timeout: 60000,
    throttle: 500,
  });

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/profile");
      setRoutes(
        response.data?.data?.role === 1
          ? allRoutes
          : allRoutes?.filter((route) => !route?.isAdmin)
      );
      setUser(response.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again please!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (
      !token &&
      location.pathname !== "/" &&
      allRoutes?.find((route) => route?.path === location?.pathname)
    ) {
      window.location.href = "/";
    } else {
      if (token) {
        fetchProfile();
      }
    }
  }, []);

  const showNavbarSidebar = () => {
    if (!routes?.find((route) => route?.path === location?.pathname)) {
      return false;
    }
    switch (location.pathname) {
      case "/":
        return false;

      default:
        return true;
    }
  };

  useEffect(() => {
    if (User) {
      if (socket) {
        socket.emit("chat_add_user", User);

        socket.on("chat_message", () => {
          if (User?.role === 1) {
            if (
              (location?.pathname === "/chat" && isIdle) ||
              location?.pathname !== "/chat"
            ) {
              setBlink(true);
              setTimeout(() => {
                setBlink(false);
              }, 500);

              setReceivedMessages((messages) => messages + 1);
              ringtoneElem?.current?.play();
            }
          }
        });
      }
    }
  }, [User]);

  useEffect(() => {
    setTimeout(() => {
      document.body.click();
    }, 1000);
  }, []);

  return (
    <>
      <ToastContainer />

        <audio ref={ringtoneElem} className="hidden">
        <source src={ringtone} type="audio/ogg" />
        <source src={ringtone} type="audio/mpeg" />
      </audio>

      <div className="flex">
        {showNavbarSidebar() && !loading && <Sidebar />}
        <main
          className={`flex-1 ${showNavbarSidebar() && "pt-14"} bg-gray-100`}
        >
          {showNavbarSidebar() && !loading && <Navbar />}
          <Routes>
            <Route path="/" element={<Auth />} />
            {routes?.length > 0 &&
              routes?.map((route) => (
                <Route
                  key={route?.path}
                  path={route?.path}
                  element={
                    loading ? <Loader color="black" /> : token && route?.element
                  }
                />
              ))}
            <Route
              path="*"
              element={loading ? <Loader color="black" /> : <h1>404 Error</h1>}
            />
          </Routes>
        </main>
      </div>

      {receivedMessages && (
        <div className={`message-received-float ${blink ? "animate" : ""}`}>
          <Link
            className="p-[12px]"
            onClick={() => {
              setReceivedMessages(0);
            }}
            to="/chat"
          >
            <FaInbox size={22} />
          </Link>

          <div className="border border-[#1C1C1C] bg-black p-1 w-[18px] h-[18px] rounded-full absolute top-0 left-0 flex justify-center items-center text-white">
            {receivedMessages}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
