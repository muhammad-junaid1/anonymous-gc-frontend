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

const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

function App() {
  const token = localStorage.getItem("auth-token");
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { setUser } = useStateContext();

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/profile");
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
      routes?.find((route) => route?.path === location?.pathname)
    ) {
      window.location.href = "/";
    } else {
      if (token) {
        fetchProfile();
      }
    }
  }, []);

  const showNavbarSidebar = () => {
    if(!(routes?.find((route) => route?.path === location?.pathname))) {
      return false;
    }
    switch (location.pathname) {
      case "/":
        return false;

      default:
        return true;
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex">
        {showNavbarSidebar() && !loading && <Sidebar />}
        <main className="flex-1">
          {showNavbarSidebar() && !loading && <Navbar />}
          <Routes>
            <Route path="/" element={<Auth />} />
            {routes?.map((route) => (
              <Route
                key={route?.path}
                path={route?.path}
                element={
                  loading ? <Loader color="black" /> : token && <Dashboard />
                }
              />
            ))}
            <Route path="*" element={<h1>404 Error</h1>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
