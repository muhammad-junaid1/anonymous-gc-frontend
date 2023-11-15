import {MdOutlineDashboard, MdSettings} from "react-icons/md";
import SidebarItem from "./sidebar/SidebarItem";
import {FiSettings} from "react-icons/fi";
import {IoPeople , IoPeopleOutline } from "react-icons/io";
import {RiDashboardFill} from "react-icons/ri";
import { useLocation } from "react-router";

const sidebarItems = [
  {
    text: "Dashboard", 
    link: "/dashboard", 
    icon: <MdOutlineDashboard size={16}/>, 
    activeIcon: <RiDashboardFill className="text-primary" size={16}/>
  }, 
  {
    text: "Settings", 
    link: "/settings", 
    icon: <FiSettings size={16}/>, 
    activeIcon: <MdSettings className="text-primary" size={16}/>
  },
  {
    text: "Employees", 
    link: "/employees", 
    icon: <IoPeopleOutline  size={16}/>, 
    activeIcon: <IoPeople  className="text-primary" size={16}/>
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
