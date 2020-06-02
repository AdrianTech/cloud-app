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
    desc: "",
    language: true
  };
  changeLanguage = () => {
    this.setState(prevState => ({
      language: !prevState.language
    }));
  };
  componentDidMount() {
    const city = localStorage.getItem("city");
    if (city) this.handleSubmit();
  }

  handleSubmit = async () => {
    const { value } = this.state;
    if (value) localStorage.setItem("city", value);
    const city = localStorage.getItem("city");
    if (!city) return;
    let API;
    const lang = localStorage.getItem("lang");
    if (lang === "eng") {
      API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=65145ede2045440196d67207a0169147&units=metric`;
      if (this.state.value.length < 1 && !city) {
        alert("Należy wpisać co namniej jedną literę");
        return;
      }
    } else {
      API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=65145ede2045440196d67207a0169147&units=metric&lang=pl`;
      if (this.state.value.length < 1 && !city) {
        alert("You need to enter at least one letter");
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
    this.handleSubmit();
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
            {language ? <img src={eng} alt="eng" onClick={() => this.setLanguage("eng")} /> : <img src={pol} alt="pl" onClick={() => this.setLanguage("pl")} />}
          </div>
          <div className="baner">{language ? <h1>Chmurka App</h1> : <h1>Cloud App</h1>}</div>
          <GetValue click={this.getValue} value={value} lang={language} submit={this.handleSubmit} />
          <DisplayWeather data={this.state} />
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
