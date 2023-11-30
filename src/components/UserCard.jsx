const UserCard = ({ data, onClick, className, width }) => {
  return (
    <div
      onClick={onClick}
      style={{width: width + "%"}}
      className={"bg-gray-300 cursor-pointer rounded py-3 flex items-center pl-4 pr-8 " + className}
    >
      <div className=" w-[60px] mr-4 h-[60px] image-container">
        <img
          src={data?.profile_picture}
          className="round-image stroke-black"
          alt="profile pic"
        />
      </div>
      {/* 3 */}
      <div>
        <div className="flex items-center">
          <strong className="mr-1"> {data?.displayName}</strong>
          <small>@{data?.username}</small>
        </div>
        <p className="text-primary">{data?.recipients}</p>
      </div>
    </div>
  );
};

export default UserCard;
