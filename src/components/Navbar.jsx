import Button from "./Button";
import { useStateContext } from "../ContextProvider";
import { BiPowerOff } from "react-icons/bi";
import Logo from "../assets/logo.png";
import {FaCrown} from "react-icons/fa";

const Navbar = () => {
  const { User } = useStateContext();
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    document.location.href = "/";
  };

  return (
    <div className="fixed w-full z-[1000] top-0 left-0 p-3 bg-white shadow flex items-center justify-between">
      <div className="flex items-center">
        <a href="/">
          <img alt="" className="mr-3" src={Logo} width={30} height={30} />
        </a>
        <p className="flex items-center">
          Welcome <strong className="ml-1 mr-2">{User?.displayName}</strong> {User?.role === 1 && <FaCrown style={{color: "#FFD700"}} size={20}/>}
        </p>
      </div>
      <Button
        style={{
          background: "red",
        }}
        onClick={handleLogout}
      >
        <div className="flex items-center">
          <BiPowerOff className="mr-1" size={18} color="white" />
          Logout
        </div>
      </Button>
    </div>
  );
};

export default Navbar;
