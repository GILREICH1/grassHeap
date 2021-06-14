import React, { useEffect, useState } from "react";
import { getGIF } from "../../../services/ServerApiServices";
import "./WeatherDetails.css";

function WeatherDetails({ weather, changeCity }) {
  const [gifPath, setGifPath] = useState("");

  useEffect(() => {
    const query = weather.weather[0].main;
    getGIF({ query }).then((resultsObj) => {
      const randomNumber = Math.floor(Math.random() * resultsObj.data.length);
      const imageURL = resultsObj.data[randomNumber].images.fixed_height.url;
      setGifPath(imageURL);
    });
  }, [weather]);

  return (
    <h1>
      Weather in <a onClick={changeCity}>{weather.name}</a> today:{" "}
      {weather.weather[0]?.description}
      <a
        href={`https://www.bbc.co.uk/weather/${weather.id}`}
        rel="noreferrer"
        target="_blank"
      >
        <img className="Weather__icon" src={gifPath}></img>
      </a>
    </h1>
  );
}

export default WeatherDetails;
