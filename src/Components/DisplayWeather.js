import React from "react";
import WeatherDesc from "./WeatherDesc";

const Display = props => {
   const { temp, city, humidity, sunset, sunrise, wind, date, pressure, active, desc, language, country } = props.items;
   const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
   const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
   const showError = <span className="notFound">{language ? `Nie ma w bazie ${city}` : `${city} not found`}</span>;
   let displayLanguageVersion = null;
   if (!active && city && language) {
      displayLanguageVersion = (
         <div className="results">
            <p className="state">
               Stan na: <span>{date}</span>
            </p>

            <WeatherDesc desc={desc} />
            <p>
               Miasto:
               <span>
                  {" "}
                  {city.slice(0, 1).toUpperCase() + city.slice(1).toLowerCase()}, {country}
               </span>
            </p>
            <p>
               Temperatura: <span>{temp.toFixed(1)} &#176;C</span>
            </p>
            <p>
               Siła wiatru: <span>{wind.toFixed(1)} m/s</span>
            </p>
            <p>
               Ciśnienie: <span>{pressure.toFixed(0)} hPa</span>
            </p>
            <p>
               Wilgotność: <span>{humidity} %</span>
            </p>
            <p>
               Wschód słońca: <span>{sunriseTime}</span>
            </p>
            <p>
               Zachód słońca: <span>{sunsetTime}</span>
            </p>
         </div>
      );
   } else if (!active && city && !language) {
      displayLanguageVersion = (
         <div className="results">
            <p className="state">
               State on: <span>{date}</span>
            </p>
            <WeatherDesc desc={desc} />
            <p>
               City:
               <span>
                  {" "}
                  {city}, {country}
               </span>
            </p>
            <p>
               Temperature: <span>{temp.toFixed(0)} &#176;C</span>
            </p>
            <p>
               Wind speed: <span>{wind.toFixed(0)} m/s</span>
            </p>
            <p>
               Pressure: <span>{pressure.toFixed(0)} hPa</span>
            </p>
            <p>
               Humidity: <span>{humidity} %</span>
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
