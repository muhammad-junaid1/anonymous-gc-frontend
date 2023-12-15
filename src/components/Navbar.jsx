import { useStateContext } from "../ContextProvider";
import {FaCrown} from "react-icons/fa";


const Navbar = () => {
  const { User } = useStateContext();

  return (
    <div className="fixed w-full z-[1000] top-0 left-0 p-3 pl-5 bg-white shadow flex items-center justify-between">
      <div className="flex items-center">
        <a href="/dashboard">
          {/* <img alt="" className="mr-3" src={Logo} width={30} height={30} /> */}
          <div className="image-container w-[38px] h-[38px] shadow-lg mr-3">
            <img className="round-image" alt="" src={User?.profile_picture}/>
          </div>
        </a>
        <p className="flex items-center">
          Welcome <strong className="ml-1 mr-2">{User?.displayName}</strong> {User?.role === 1 && <FaCrown style={{color: "#FFD700"}} size={20}/>}
        </p>
      </div>
     
    </div>
  );
};

export default Navbar;
