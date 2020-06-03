import React from "react";
import WeatherDesc from "./WeatherDesc";

const Display = ({ data, lang }) => {
  const { sys, wind, timezone, main, weather, name } = data.data;
  const { active, language, value } = data;
  const isEmpty = Reflect.ownKeys(data.data).length === 0 && data.data.constructor === Object;
  let sunriseTime;
  let sunsetTime;
  let date;
  if (!isEmpty) {
    const lang = navigator.language || navigator.languages[0];
    date = new Date().toLocaleString(lang);
    const time = new Date().getTimezoneOffset() * 60 + timezone;
    const setSunrise = sys.sunrise + time;
    const setSunset = sys.sunset + time;
    sunriseTime = new Date(setSunrise * 1000).toLocaleTimeString(lang);
    sunsetTime = new Date(setSunset * 1000).toLocaleTimeString(lang);
  }
  const showError = <span className="notFound">{language ? `Nie ma w bazie ${value}` : `${value} not found`}</span>;
  let displayLanguageVersion = null;
  if (!isEmpty && lang === "pl") {
    displayLanguageVersion = (
      <div className="results">
        <p className="state">
          Stan na: <span>{date}</span>
        </p>
        <WeatherDesc desc={weather} />
        <p>
          Miasto:
          <span>
            {" "}
            {name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()}, {sys.country}
          </span>
        </p>
        <p>
          Temperatura: <span>{main.temp.toFixed(1)} &#176;C</span>
        </p>
        <p>
          Siła wiatru: <span>{wind.speed.toFixed(1)} m/s</span>
        </p>
        <p>
          Ciśnienie: <span>{main.pressure.toFixed(0)} hPa</span>
        </p>
        <p>
          Wilgotność: <span>{main.humidity} %</span>
        </p>
        <p>
          Wschód słońca: <span>{sunriseTime}</span>
        </p>
        <p>
          Zachód słońca: <span>{sunsetTime}</span>
        </p>
      </div>
    );
  } else if (!isEmpty && lang === "eng") {
    displayLanguageVersion = (
      <div className="results">
        <p className="state">
          Date: <span>{date}</span>
        </p>
        <WeatherDesc desc={weather} />
        <p>
          City:
          <span>
            {" "}
            {name}, {sys.country}
          </span>
        </p>
        <p>
          Temperature: <span>{main.temp.toFixed(0)} &#176;C</span>
        </p>
        <p>
          Wind speed: <span>{wind.speed.toFixed(0)} m/s</span>
        </p>
        <p>
          Pressure: <span>{main.pressure.toFixed(0)} hPa</span>
        </p>
        <p>
          Humidity: <span>{main.humidity} %</span>
        </p>
        <p>
          Sunrise: <span>{sunriseTime}</span>
        </p>
        <p>
          Sunset: <span>{sunsetTime}</span>
        </p>
      </div>
    );
  }
  return <div>{active ? showError : displayLanguageVersion}</div>;
};

export default Display;
