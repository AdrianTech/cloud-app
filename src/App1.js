import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import DisplayResults from "./DisplayResults";

class App extends Component {
   state = {
      value: "",
      //date: "",
      cities: []
      // city: "",
      // wind: "",
      // sunrise: "",
      // sunset: "",
      // temp: "",
      // pressure: "",
      // err: false
   };
   changeValue = e => {
      this.setState({
         value: e.target.value
      });
   };
   // componentDidUpdate(prevProps, prevState) {
   //    console.log(this.state.cities);
   //    this.set = setTimeout(() => {
   //       if (this.state.value.length < 3) return;
   //       if (prevState.value !== this.state.value) {
   //          const API = `http://api.openweathermap.org/data/2.5/weather?q=${
   //             this.state.value
   //          }&APPID=65145ede2045440196d67207a0169147&units=metric`;
   //          fetch(API)
   //             .then(response => {
   //                if (response.status === 200) {
   //                   return response;
   //                }
   //                throw Error("Error");
   //             })
   //             .then(response => response.json())
   //             .then(data => {
   //                const time = new Date().toLocaleString();
   //                console.log(data);
   //                this.setState(prevState => ({
   //                   err: false,
   //                   city: prevState.value,
   //                   date: time,
   //                   wind: data.wind.speed,
   //                   sunrise: data.sys.sunrise,
   //                   sunset: data.sys.sunset,
   //                   temp: data.main.temp,
   //                   pressure: data.main.pressure
   //                }));
   //             })
   //             .catch(error => {
   //                console.log(error);
   //                this.setState(prevState => ({
   //                   err: true,
   //                   city: prevState.value
   //                }));
   //             });
   //       }
   //    }, 2500);
   // }
   // clearValue = () => {
   //    this.setState({
   //       value: ""
   //    });
   // };
   // componentWillUnmount() {
   //    clearTimeout(this.set);
   // }

   submitButton = e => {
      e.preventDefault();
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${
         this.state.value
      }&APPID=65145ede2045440196d67207a0169147&units=metric`;
      fetch(API)
         .then(response => {
            if (response.status === 200) {
               return response;
            }
            throw Error("Error");
         })
         .then(response => response.json())
         .then(data => {
            console.log(this.state.cities);
            //const time = new Date().toLocaleString();
            this.setState(prevState => ({
               //err: false,
               //city: prevState.value,
               //date: time,
               cities: data
               // wind: data.wind.speed,
               // sunrise: data.sys.sunrise,
               // sunset: data.sys.sunset,
               // temp: data.main.temp,
               // pressure: data.main.pressure
            }));
         })
         .catch(error => {
            console.log(error);
            this.setState(prevState => ({
               err: true,
               city: prevState.value
            }));
         });
   };
   render() {
      const { value } = this.state;
      return (
         <div>
            <Form value={value} changeValue={this.changeValue} click={this.submitButton} />
            <DisplayResults /* all={this.state} */ cities={this.state.cities} />
         </div>
      );
   }
}

export default App;
