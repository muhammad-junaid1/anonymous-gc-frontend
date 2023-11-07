import Logo from "../assets/logo.png";

const Sidebar = () => {
  return (
    <div className="sticky top-0 w-[200px] h-screen border-r border-gray-200">
      <div className="m-3">
        <img src={Logo} width={32} height={32} />
      </div>
    </div>
  );
};

export default Sidebar;
