import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
// import { CgProfile } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="p-5 rounded min-h-screen">
      <strong className="text-2xl">Settings</strong>

{/* ***************************************[1]**************************************** */}
<div>
      <h1 className="mt-4 text-sky-700 font-medium">Profile pic</h1>
       {/* <CgProfile />  */}
      <img className="mt-4" src="" alt="profile pic" />
      <input  className="mt-4 " type="file" />
</div>
{/* ***************************************[2]**************************************** */}
        <h1 className="mt-4 text-sky-700 font-medium">General</h1>
        <label for="username" className="block mt-4">Username</label>
        <input  className="border-[0.5px] w-3/12 border-gray-400 rounded-[4px] p-2" type="text" />
{/* ***************************************[3]**************************************** */}
<h1 className="mt-4 text-sky-700 font-medium">Email</h1>
<div className="flex">

    <div className="w-3/12 ">
        <label for="username" className="block mt-4">Primary</label>
        <TextInput></TextInput>
    </div>


    <div className="w-3/12 ml-10">
        <label for="username" className="block mt-4">Secondary</label>
        <TextInput></TextInput>
    </div>

</div>
{/* ***************************************[4]**************************************** */}
<div className="mt-4">

  <div className="ml-0 inline">
      <Button>Update</Button>
  </div>

  <div className="ml-5 inline">
      <Button className="mt-40">Save</Button>
  </div>

</div>



  </div>
  );
};
export default Settings;