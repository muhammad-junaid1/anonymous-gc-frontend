import Weather from "./Weather";
import Info from "./Info";
import { useStateContext } from "../../ContextProvider";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const {weather, bgImg} = useStateContext();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "rgb(0 88 209)",
        backgroundBlendMode: "overlay",
       
      }}
      className="min-h-screen flex justify-center items-center"
    >
      {showContent && (
        <div className="flex h-full justify-center flex-col items-center">
          <Weather weatherData={weather} />
          <Info />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
