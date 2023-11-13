import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useStateContext } from "../../ContextProvider";
import Avatar from "../../assets/user.png";
import { toast } from "react-toastify";
import axios from "../../axiosConfig";
import { CircularProgress } from "@mui/material";

const Settings = () => {
  const { User, setUser } = useStateContext();
  const [values, setValues] = useState({
    username: User?.username,
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    url: "",
    file: null,
  });

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async (e) => {
      try {
        const data = new FormData();

        data.append("file", file);
        setLoading(true);
        await axios.post("/upload-file", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSelectedImage({
          url: e.target.result,
          file,
        });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong, try again please!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading(false);
    };
  };

  const handleSubmit = async () => {
    try {
      setSaveBtnLoading(true);
      const response = await axios.post("/profile", JSON.stringify(values));
      setUser({...User, ...response.data?.data});
      toast.success("Settings updated!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try again please!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
      setSaveBtnLoading(false);
  };

  useEffect(() => {
    if (Object.values(values)?.some((value) => !value)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [values]);

  return (
    <div className="p-5 rounded min-h-screen">
      <strong className="text-2xl">Settings</strong>

      <div className="mt-8">
        <h1 className="text-primary mb-2 font-bold uppercase text-xs">
          Profile pic
        </h1>
        {loading ? (
          <div className="mb-2">
            <CircularProgress size={24} color="success" />
          </div>
        ) : (
          <div className="mb-2 image-container">
            <img
              className="round-image"
              width={100}
              height={100}
              src={selectedImage?.url || User?.profile_picture || Avatar}
              alt="profile pic"
            />
          </div>
        )}

        <input onInput={handleUpload} type="file" />
      </div>
      <div className="mt-8">
        <h1 className="text-primary mb-2 font-bold uppercase text-xs">
          General
        </h1>
        <label htmlFor="username" className="block">
          Username
        </label>
        <input
          required
          value={values?.username}
          name="username"
          onInput={handleInput}
          className="border-[0.5px] w-3/12 border-gray-400 rounded-[4px] p-2"
          type="text"
        />
      </div>
      {/* <div className="mt-8">
        <h1 className="text-primary font-bold uppercase text-xs mb-2">Email</h1>
        <div className="flex">
          <div className="w-3/12 ">
            <label htmlFor="username" className="block">
              Primary
            </label>
            <input
          required
          value={values?.email}
          name="username"
          onInput={handleInput}
          className="border-[0.5px] w-3/12 border-gray-400 rounded-[4px] p-2"
          type="text"
        />
          </div>
          <div className="w-3/12 ml-10">
            <label htmlFor="username" className="block">
              Secondary
            </label>
            <TextInput></TextInput>
          </div>
        </div>
      </div> */}
      <div className="mt-4">
        <Button
          onClick={handleSubmit}
          props={{
            disabled: isDisabled,
          }}
          className="mt-4"
        >
        {saveBtnLoading ? <CircularProgress size={18} style={{color: "white"}}/> : <span>Save</span>}
        </Button>
      </div>
    </div>
  );
};
export default Settings;
