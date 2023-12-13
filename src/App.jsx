import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import { useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "./ContextProvider";
import { useEffect, useState } from "react";
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
  const { User, setUser } = useStateContext();

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
      socket.emit("chat_add_user", User);
    }
  }, [User]);

  return (
    <>
      <ToastContainer />

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
    </>
  );
}

export default App;
