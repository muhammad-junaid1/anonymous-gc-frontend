import { Link } from "react-router-dom";

const SidebarItem = ({link, icon, activeIcon, children, active}) => {
    return <Link to={link} className="cursor-pointer px-4 py-1.5 flex items-center">
       {active ? activeIcon : icon} <span className={`pl-2 ${active && 'font-bold text-primary'}`}>{children}</span>
    </Link>;
}

export default SidebarItem;