import {MdOutlineDashboard, MdSettings, MdOutlinePeople, MdPeople} from "react-icons/md";
import SidebarItem from "./sidebar/SidebarItem";
import {FiSettings} from "react-icons/fi";
import {RiDashboardFill} from "react-icons/ri";
import { useLocation } from "react-router";
import { MdOutlineChatBubbleOutline, MdChatBubble } from "react-icons/md";
import { useStateContext } from "../ContextProvider";
import { useEffect, useState } from "react";
import Button from "./Button";
import { BiPowerOff } from "react-icons/bi";


const allSidebarItems = [
  {
    text: "Dashboard", 
    link: "/dashboard", 
    icon: <MdOutlineDashboard size={16}/>, 
    activeIcon: <RiDashboardFill className="text-primary" size={16}/>
  }, 
  {
    text: "Employees", 
    link: "/employees", 
    isAdmin: true,
    icon: <MdOutlinePeople  size={16}/>, 
    activeIcon: <MdPeople  className="text-primary" size={16}/>
  },
  {
    text: "Chat", 
    link: "/chat", 
    icon: <MdOutlineChatBubbleOutline  size={16}/>, 
    activeIcon: <MdChatBubble  className="text-primary" size={16}/>
  },
  {
    text: "Settings", 
    link: "/settings", 
    isAdmin: true,
    icon: <FiSettings size={16}/>, 
    activeIcon: <MdSettings className="text-primary" size={16}/>
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [sidebarItems, setSidebarItems] = useState([]);
  const {User} = useStateContext();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    document.location.href = "/";
  };

  useEffect(() => {
    if(User) {
      setSidebarItems(User?.role === 1 ? allSidebarItems : allSidebarItems?.filter(item => !item?.isAdmin));
    }
  }, [User]);
  return (
    <div className="sticky pt-[4.5rem] flex flex-col justify-between shadow top-0 w-[200px] h-screen">
      <div>
        {sidebarItems?.map((item) => {
          return <SidebarItem active={location.pathname === item?.link} key={item?.link} {...item}>{item?.text}</SidebarItem>;
        })}
      </div>
       <Button
        style={{
          background: "red",
          margin: "0 20px 30px 20px",
          padding: "10px 0"
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

export default Sidebar;
