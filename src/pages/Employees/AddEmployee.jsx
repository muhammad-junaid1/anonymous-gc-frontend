import { useRef, useState } from "react";
import Button from "../../components/Button.jsx";
import { FaRandom } from "react-icons/fa";
import axios from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import DefaultImg from "../../assets/user.png";

const AddEmployee = ({ activeTab, setActiveTab }) => {
  const [selectedImage, setSelectedImage] = useState(
    "src/assets/Default_Profile_Pic.svg"
  );
  const [btnLoading, setBtnLoading] = useState(false);
  const [values, setValues] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const fileInputRef = useRef();

  const handleInputDisplayName = (e) => {
    setValues({
      ...values,
      displayName: e.target.value,
      username: e.target.value?.toLowerCase()?.replaceAll(" ", ".")?.trim(),
    });
  };

  const handleInputUsername = (e) => {
    setValues({ ...values, username: e.target.value });
  };

  const handleInputPassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const setRandomPassword = () => {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    setValues({ ...values, password: result });
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage({
        url: e.target.result,
        file,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtnLoading(true);

    try {
      const data = new FormData();

      data.append("displayName", values?.displayName);
      data.append("username", values?.username);
      data.append("role", values?.role);
      data.append("password", values?.password);
      if (selectedImage) {
        data.append("file", selectedImage?.file);
      }
      const response = await axios.post("/users", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setValues(null);
      setSelectedImage(null);
      fileInputRef.current.value = "";

      toast.success("User created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setBtnLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className={activeTab === "addEmployee" ? "slideDown" : "hidden"}
    >
      <h1 className="text-primary mt-5 mb-2 font-bold uppercase text-xs">
        Profile pic
      </h1>
      {selectedImage && (
        <div className="mb-3 image-container w-[100px] h-[100px]">
          <img
            className="round-image stroke-black"
            width={100}
            src={selectedImage?.url || DefaultImg}
            height={100}
            alt="profile pic"
          />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onInput={handleSelectImage}
        className="mt-2"
      />

      <h1 className="text-primary mt-6 mb-2 font-bold uppercase text-xs">
        Other details
      </h1>

      <label className="block text-sm mt-4">Display Name</label>
      <input
        className="border-[0.5px] w-2/6 border-gray-400 rounded-[4px] p-2"
        type="text"
        name="displayName"
        value={values?.displayName || ""}
        onInput={handleInputDisplayName}
        required
      />

      <label className="block text-sm mt-3">User ID</label>

      <input
        className="border-[0.5px] w-2/6 border-gray-400 rounded-[4px] p-2"
        type="text"
        value={values?.username || ""}
        name="username"
        onInput={handleInputUsername}
        required
      />
      <label className="block text-sm mt-3">Password</label>

      <div className="relative w-2/6">
        <FaRandom
          onClick={setRandomPassword}
          className="absolute cursor-pointer right-3 top-[50%] -translate-y-[50%]"
        />

        <input
          required
          name="password"
          maxLength={8}
          minLength={8}
          className="border-[0.5px] w-full border-gray-400 rounded-[4px] p-2"
          type="text"
          value={values?.password || ""}
          onInput={handleInputPassword}
        />
      </div>

      <div className="mt-4">
        <Button
          props={{ className: "w-2/6", type: "submit", disabled: btnLoading }}
        >
          {btnLoading ? (
            <CircularProgress size={18} style={{ color: "white" }} />
          ) : (
            <span>Create</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddEmployee;
