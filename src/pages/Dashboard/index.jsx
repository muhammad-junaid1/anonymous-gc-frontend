import Weather from "./Weather";
import Info from "./Info";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [weather, setWeather] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [bgImg, setBgImg] = useState("");

  const getSidebarBgImage = async () => {
    const OPENWEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER;
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((result) => {
          const weather = result?.current?.weather[0];
          const weather_description = weather?.description || "weather";
          const weatherIcon = weather?.icon;
          const temp = result?.current?.temp;
          const desc = weather?.main;
          setWeather({
            weatherIcon,
            temp,
            desc,
          });

          const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_KEY;
          fetch(
            `https://api.unsplash.com/search/photos?query=${weather_description}&auto=format&q=0&client_id=${UNSPLASH_API_KEY}&per_page=20&orientation=landscape&fit=cover`
          )
            .then((response) => response.json())
            .then((result) => {
              const randomImg =
                result?.results[
                  Math.floor(Math.random() * result?.results?.length)
                ]?.links?.download;
              const image = new Image();
              image.src = randomImg;
              image.onload = () => {
                setBgImg(randomImg);
                setTimeout(() => {
                  setShowContent(true);
                }, 1500);
              };
            })
            .catch((error) => console.log(error));
        })
        .catch((err) => console.log(err));
    });
  };

  // useEffect(() => {
  //   if (weather?.weatherIcon || weather?.desc || weather?.temp) {
  //     setTimeout(() => {
  //       setShowSidebar(true);
  //       setTimeout(() => {
  //         setShowContent(true);
  //       }, 1000);
  //     }, 700);
  //   }
  // }, [weather]);

  useEffect(()=> {
    getSidebarBgImage();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
        borderImage:
          "linear-gradient(to bottom, #0a58ff, rgb(222, 222, 222), #0a58ff) 1 100%",
      }}
      className="min-h-screen"
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
