import React, { Component } from "react";
import pol from "./icons/poland.png";
import eng from "./icons/united-kingdom.png";
import GetValue from "./Components/GetValue";
import DisplayWeather from "./Components/DisplayWeather";

let API = "";

class Weather extends Component {
   state = {
      active: false,
      value: "",
      date: "",
      city: "",
      temp: "",
      humidity: "",
      sunrise: "",
      sunset: "",
      wind: "",
      pressure: "",
      desc: "",
      country: "",
      language: true
   };
   changeLanguage = () => {
      this.setState(prevState => ({
         language: !prevState.language
      }));
   };

   handleSubmit = e => {
      const { language } = this.state;
      e.preventDefault();
      this.changeLang();
      if (this.state.value.length < 1) {
         if (language) {
            alert("Należy wpisać co namniej jedną literę");
            return;
         } else if (!language) {
            alert("You need to enter at least one letter");
            return;
         }
      }
      fetch(API)
         .then(response => {
            if (response.ok) {
               return response;
            }
            throw Error(response.status);
         })
         .then(response => response.json())
         .then(data => {
            const time = new Date().toLocaleString();
            this.setState({
               date: time,
               city: this.state.value,
               temp: data.main.temp,
               humidity: data.main.humidity,
               sunrise: data.sys.sunrise,
               sunset: data.sys.sunset,
               desc: data.weather,
               wind: data.wind.speed,
               pressure: data.main.pressure,
               country: data.sys.country,
               active: false
               //value: ""
            });
         })
         .catch(err => {
            this.setState(prevState => ({
               city: prevState.value,
               active: true
            }));
         });
   };
   changeLang = () => {
      const { language, value } = this.state;
      if (language) {
         API = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=65145ede2045440196d67207a0169147&units=metric&lang=pl`;
      } else if (!language) {
         API = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=65145ede2045440196d67207a0169147&units=metric`;
      }
   };

   getValue = e => {
      this.setState({
         value: e.target.value
      });
   };
   render() {
      const { value, language } = this.state;

      return (
         <>
            <div className="main">
               <div className="lang" onClick={this.changeLanguage}>
                  {language ? <img src={eng} alt="eng" /> : <img src={pol} alt="pl" />}
               </div>
               <div className="baner">{language ? <h1>Chmurka App</h1> : <h1>Cloud App</h1>}</div>
               <GetValue click={this.getValue} value={value} lang={language} submit={this.handleSubmit} />
               <DisplayWeather items={this.state} />
            </div>
            <footer>
               {" "}
               Created by AdrianTech
               <div className="icons">Icons made by Chris Veigt from www.flaticon.com is licensed by CC 3.0 BY</div>
            </footer>
         </>
      );
   }
}
export default Weather;
