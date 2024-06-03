import './App.css'
import { useEffect, useState } from "react";
import axios from 'axios'

function App() {

  let [loading, setLoading] = useState(false);
  let [active, setActive] = useState(false);
  let [cityName, setCityName] = useState("Kathmandu");
  let [imgURL, setImgURL] = useState("");
  let [weatherData, setWeatherData] = useState(null);
  let [dataError, setDataError] = useState(false);

  //api used
  useEffect(() => {
    setLoading(true);
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2a1f42ab95bf5a4ae08ebfe370c3afa4&units=metric`;

    axios
      .get(apiURL)
      .then((res) => {
        if (res.statusText === "OK") {
          console.log(res.data);
          setDataError(false);
          setWeatherData({ ...res.data });
          setImgURL( //sab icons etc api le dinxa by below link or url
            `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
          );
        }
      })
      .catch(() => {
        console.log("Error");
        setDataError(true);
      })
      .finally(() => {
        setLoading(false);
        setActive(false);
      });
  }, [active]);

  function handleCityChange(e) {
    setCityName(e.target.value);
  }
  function handleCitySet() {
      setActive(true);
  }


  return (
    <div
    className={`flex flex-col items-center gap-3 w-screen h-screen bg-blue-200`} //tailwind css use gareko
  >
    <div className="text-3xl font-bold text-center text-gray-600 bg-opacity-60 bg-white p-6 rounded-lg drop-shadow-md z-1 w-2/5 mt-10">
      <h1>Weather Forecast</h1>
    </div>

    <div className=" text-lg rounded-xl drop-shadow-lg bg-opacity-60 bg-white p-6 text-gray-600 w-2/5">
      <div className="flex flex-row justify-center items-center gap-2 mb-1 drop-shadow-sm">
        <label htmlFor="city__field">Place Name: </label>
        <input
          id="city__field"
          className="rounded-md bg-gray-100 p-2"
          type="text"
          value={cityName}
          onChange={(e) => handleCityChange(e)}
        />
        <button
          className="rounded-md bg-gray-500 p-2 text-white drop-shadow-lg"
          onClick={handleCitySet}
        >
          OK
        </button>
      </div>
      {loading ? (
        "Loading..."
      ) : weatherData ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col align-middle justify-center gap-1">
            <img
              className="drop-shadow-lg"
              src={imgURL}
              alt="Weather Image"
            />
            <p className="text-gray-600 text-center drop-shadow-lg">
              {weatherData.weather[0].main} Sky
            </p>
          </div>
          <div className="w-3/5 m-auto drop-shadow-lg">
            <p className="flex justify-between">
              <b>Temperature: </b>
              {weatherData.main.temp} °C
            </p>
            <p className="flex justify-between">
              <b>Wind Speed: </b>
              {weatherData.wind.speed} km/h
            </p>
            <p className="flex justify-between">
              <b>Humidity: </b>
              {weatherData.main.humidity} %
            </p>
          </div>
          <h2 className="text-3xl font-bold text-center drop-shadow-lg">
            {weatherData.name}
          </h2>
        </div>
      ) : (
        "No Data"
      )}
    </div>
    {dataError ? (
      <div className="error__msg text-lg text-center rounded-lg drop-shadow-lg bg-opacity-60 bg-white p-3 text-red-600 w-2/5">
        No Data Found
      </div>
    ) : (
      ""
    )}
  </div>
);

}

export default App
