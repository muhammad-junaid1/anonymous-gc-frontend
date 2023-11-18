import {MdOutlineDashboard, MdSettings, MdOutlinePeople, MdPeople} from "react-icons/md";
import SidebarItem from "./sidebar/SidebarItem";
import {FiSettings} from "react-icons/fi";
import {RiDashboardFill} from "react-icons/ri";
import { useLocation } from "react-router";
import { MdOutlineChatBubbleOutline, MdChatBubble } from "react-icons/md";

const sidebarItems = [
  {
    text: "Dashboard", 
    link: "/dashboard", 
    icon: <MdOutlineDashboard size={16}/>, 
    activeIcon: <RiDashboardFill className="text-primary" size={16}/>
  }, 
  {
    text: "Employees", 
    link: "/employees", 
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
    icon: <FiSettings size={16}/>, 
    activeIcon: <MdSettings className="text-primary" size={16}/>
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sticky pt-[4.5rem] shadow top-0 w-[200px] h-screen">
      {sidebarItems?.map((item) => {
        return <SidebarItem active={location.pathname === item?.link} key={item?.link} {...item}>{item?.text}</SidebarItem>;
      })}
    </div>
  );
};

export default Sidebar;
