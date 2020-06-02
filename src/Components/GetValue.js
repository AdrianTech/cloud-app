import React from "react";

const GetValue = ({ click, value, submit, lang }) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="weather">
        <span className="infoInput">{lang ? "Wpisz nazwę miasta" : "Enter a city name"}</span>
      </label>
      <input type="text" name="" id="weather" value={value} onChange={click} autoFocus />
      <button onClick={submit}>{lang ? "Wyświetl" : "Display"}</button>
    </form>
  );
};

export default GetValue;
