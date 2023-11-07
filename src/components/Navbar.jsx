import Button from "./Button";
import { useStateContext } from "../ContextProvider";

const Navbar = () => {
    const {User} = useStateContext();
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    document.location.href = "/";
  };

  return (
    <div className="p-3 border-b border-gray-200 flex items-center justify-between">
      <p>Welcome <strong>{User?.username}</strong></p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Navbar;
