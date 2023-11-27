import { useState } from "react";
import AddEmployee from "./AddEmployee";
import ViewEmployees from "./ViewEmployees";
import ChatFlow from "./ChatFlow";

const Employees = () => {
  const [activeTab, setActiveTab] = useState("viewEmployee");


  return (
    <div className="px-8 py-5 rounded min-h-screen">
      <strong className="text-2xl">Employees</strong>

      <div className="mt-10">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-300 ">
          <li className="me-2">
            <a
              href="#"
              className={
                activeTab === "addEmployee"
                  ? "inline-block p-2  rounded-t-md active bg-gray-800 text-gray-300"
                  : "inline-block p-2 text-gray-400 bg-gray-100 rounded-t-md active"
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
                  ? "inline-block p-2  rounded-t-md active bg-gray-800 text-gray-300"
                  : "inline-block p-2 text-gray-400 bg-gray-100 rounded-t-md active"
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
                  ? "inline-block p-2 rounded-t-md active bg-gray-800 text-gray-300"
                  : "inline-block p-2 text-gray-400 bg-gray-100 rounded-t-md active"
              }
              onClick={() => setActiveTab("setFlow")}
            >
              Chat Flows
            </a>
          </li>
        </ul>
      </div>
      {/* Add Employees */}
      <AddEmployee setActiveTab={setActiveTab} activeTab={activeTab}/>
      {/* View Employees */}
     <ViewEmployees activeTab={activeTab}/>
      {/* Chat Flow */}
      <ChatFlow activeTab={activeTab}/>
    
    </div>
  );
};

export default Employees;
