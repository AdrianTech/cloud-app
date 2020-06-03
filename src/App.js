import React, { Component } from "react";
import pol from "./icons/poland.png";
import eng from "./icons/united-kingdom.png";
import GetValue from "./Components/GetValue";
import DisplayWeather from "./Components/DisplayWeather";

class Weather extends Component {
  state = {
    active: false,
    data: {},
    value: "",
    desc: ""
  };
  componentDidMount() {
    const city = localStorage.getItem("city");
    const lang = localStorage.getItem("lang");
    if (city) this.handleSubmit();
    if (!lang) localStorage.setItem("lang", "pl");
  }
  handleSubmit = async () => {
    let API;
    const { value } = this.state;
    if (value) localStorage.setItem("city", value);
    const city = localStorage.getItem("city");
    const lang = localStorage.getItem("lang");
    if (!city) return;
    if (lang === "eng") {
      API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=65145ede2045440196d67207a0169147&units=metric`;
      if (this.state.value.length < 2 && !city) {
        alert("Miasto powinno mieć co najmniej dwie litery");
        return;
      }
    } else {
      API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=65145ede2045440196d67207a0169147&units=metric&lang=pl`;
      if (this.state.value.length < 2 && !city) {
        alert("City must have at least 3 characters");
        return;
      }
    }
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) {
        this.setState({
          data,
          desc: data.weather,
          active: false
        });
      } else {
        this.setState(prevState => ({
          city: prevState.value,
          active: true
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };
  setLanguage = lang => {
    localStorage.setItem("lang", lang);
    const city = localStorage.getItem("city");
    city && this.handleSubmit();
  };
  getValue = e => {
    this.setState({
      value: e.target.value
    });
  };
  render() {
    const { value } = this.state;
    const lang = localStorage.getItem("lang");
    return (
      <>
        <div className="main">
          <div className="lang">{lang === "eng" ? <img src={pol} alt="eng" onClick={() => this.setLanguage("pl")} /> : <img src={eng} alt="pl" onClick={() => this.setLanguage("eng")} />}</div>
          <div className="baner">{lang === "pl" ? <h1>Chmurka App</h1> : <h1>Cloud App</h1>}</div>
          <GetValue click={this.getValue} value={value} lang={lang} submit={this.handleSubmit} />
          <DisplayWeather data={this.state} lang={lang} />
        </div>
        <footer>
          Created by AdrianTech
          <div className="icons">Icons made by Chris Veigt from www.flaticon.com is licensed by CC 3.0 BY</div>
        </footer>
      </>
    );
  }
}
export default Weather;
