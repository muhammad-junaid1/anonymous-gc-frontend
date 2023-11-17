import React, { useState } from "react";
import Button from "../../components/Button";

const Employees = () => {
  const [activeTab, setActiveTab] = useState("addEmployee");
  const [isSetFlowPopupVisible, setSetFlowPopupVisibility] = useState(false);

  const handleSetFlowButtonClick = () => {
    setSetFlowPopupVisibility(true);
  };

  const closeSetFlowPopup = () => {
    setSetFlowPopupVisibility(false);
  };

  return (
    <div className="px-8 py-5 rounded min-h-screen">
      <strong className="text-2xl">Employees</strong>

      <div className="mt-10">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2">
            <a
              href="#"
              className={
                activeTab === "addEmployee"
                  ? "inline-block p-4  rounded-t-lg active bg-gray-800 text-gray-300"
                  : "inline-block p-4 text-gray-400 bg-gray-100 rounded-t-lg active"
              }
              onClick={() => setActiveTab("addEmployee")}
            >
              Add Employees
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className={
                activeTab === "viewEmployee"
                  ? "inline-block p-4  rounded-t-lg active bg-gray-800 text-gray-300"
                  : "inline-block p-4 text-gray-400 bg-gray-100 rounded-t-lg active"
              }
              onClick={() => setActiveTab("viewEmployee")}
            >
              View Employees
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className={
                activeTab === "setFlow"
                  ? "inline-block p-4  rounded-t-lg active bg-gray-800 text-gray-300"
                  : "inline-block p-4 text-gray-400 bg-gray-100 rounded-t-lg active"
              }
              onClick={() => setActiveTab("setFlow")}
            >
              Chat Flow
            </a>
          </li>
        </ul>
      </div>
      {/* Add Employees */}
      <div className={activeTab === "addEmployee" ? "" : "hidden"}>
        <h1 className="text-primary mt-5 mb-2 font-bold uppercase text-xs">
          Profile pic
        </h1>
        <div className="mb-3 image-container">
          <img
            className="round-image stroke-black"
            width={100}
            height={100}
            alt="profile pic"
          />
        </div>

        <input type="file" />

        <label className="block text-sm mt-4">Display Name</label>
        <input
          className="border-[0.5px] w-3/12 border-gray-400 rounded-[4px] p-2"
          type="text"
        />

        <label className="block text-sm mt-4">ID</label>
        <input
          className="border-[0.5px] w-3/12 border-gray-400 rounded-[4px] p-2"
          type="text"
        />

        <label className="block text-sm mt-4">Password</label>
        <input
          className="border-[0.5px] w-3/12 border-gray-400 rounded-[4px] p-2"
          type="text"
        />

        <div className="mt-5">
          <Button>Save</Button>
        </div>
      </div>
      {/* View Employees */}
      <div
        className={
          activeTab === "viewEmployee"
            ? "h-[70px] mt-5 bg-gray-700 max-w-full rounded-md flex"
            : "hidden"
        }
      >
        {/* 1 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <div className="mb-3 h-[60px] image-container">
            <img
              className="round-image stroke-black"
              width={60}
              height={60}
              alt="profile pic"
            />
          </div>
        </div>

        {/* 2 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <strong>Username</strong>
        </div>

        {/* 3 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <strong>ID</strong>
        </div>

        {/* 4 */}
        <div className="w-2/5 bg-gray-300 p-4 flex flex-col">
          <div className=" ml-auto">
            <Button>Delete</Button>
          </div>
        </div>
      </div>
      {/* Chat Flow */}
      <div
        className={
          activeTab === "setFlow"
            ? "h-[70px] mt-5 bg-gray-700 max-w-full rounded-md flex"
            : "hidden"
        }
      >
        {/* 1 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <div className="mb-3 h-[60px] image-container">
            <img
              className="round-image stroke-black"
              width={60}
              height={60}
              alt="profile pic"
            />
          </div>
        </div>

        {/* 2 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <strong>Username</strong>
        </div>

        {/* 3 */}
        <div className="w-1/5 bg-gray-300 p-4">
          <strong>ID</strong>
        </div>

        {/* 4 */}
        <div className="w-2/5 bg-gray-300 p-4 flex flex-col">
          <div className=" ml-auto">
            <Button onClick={handleSetFlowButtonClick}>Set Flow</Button>
          </div>
        </div>
      </div>
      {/* Set Flow Popup */}
      {/* Set Flow Popup */}
      {isSetFlowPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            {/* Image, Username, ID, and Done button in a row */}
            <div className="flex items-center mb-3">
              {/* 1. Profile Picture */}
              <div className="mr-3 h-[60px]">
                <img
                  className="rounded-full border border-black"
                  width={60}
                  height={60}
                  src="URL_TO_PROFILE_PICTURE"
                  alt="profile pic"
                />
              </div>

              {/* 2. Username */}
              <div className="mr-3">
                <strong>Username</strong>
              </div>

              {/* 3. ID */}
              <div className="mr-3">
                <strong>ID</strong>
              </div>

              {/* 4. Done button */}
              <div>
                <Button onClick={handleSetFlowButtonClick}>Assign</Button>
              </div>
            </div>

            {/* Close button separately below */}
            <Button onClick={closeSetFlowPopup} className="mt-3">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
