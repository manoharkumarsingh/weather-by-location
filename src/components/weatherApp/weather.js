import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import debounce from "lodash/debounce";
import Snow from "../resources/snow.png";
import Clouds from "../resources/cloudy.png";
import Fog from "../resources/foggy.png";
import Rain from "../resources/rain.png";
import Thunderstorm from "../resources/thunderstorm.png";
import Haze from "../resources/haze.png";
import Clear from "../resources/clear-sky.png";
import Wind from "./wind";
import Humidity from "./humidity";
import Feels from "./feels_like";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const getWeatherImgUrl = (main) => {
    switch (main) {
      case "Snow": {
        return Snow;
      }
      case "Clouds": {
        return Clouds;
      }
      case "Fog": {
        return Fog;
      }
      case "Rain": {
        return Rain;
      }
      case "Thunderstorm": {
        return Thunderstorm;
      }
      case "Haze": {
        return Haze;
      }
      default:
        return Clear;
    }
  };

  useEffect(() => {
    const fetchSuggestions = async (inputValue) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&sort=population&appid=260cb335441aa8e8bed891ff699b8837`
        );
        setSuggestions(
          response.data.list.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        );
      } catch (error) {
        setError("Error fetching suggestions");
      }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    if (selectedOption) {
      debouncedFetchSuggestions(selectedOption);
    } else {
      setSuggestions([]);
    }

    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [selectedOption]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=260cb335441aa8e8bed891ff699b8837&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };
    if (selectedCity) {
      fetchData();
    }
  }, [selectedCity]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption ? selectedOption : null);
  };

  const handleSelectCity = (selectedOption) => {
    setSelectedCity(selectedOption ? selectedOption.value : null);
  };
  return (
    <div className="main-container">
      <div className="main-sub-container">
        <div className="container">
          <div className="search-box-main-conatiner">
            <div className="search-box-conatiner">
              <h1 className="white-color">Today's Report</h1>
              <Select
                value={
                  selectedCity
                    ? { value: selectedCity, label: selectedCity }
                    : null
                }
                onChange={(selectedOption) => {
                  handleSelectCity(selectedOption);
                }}
                onInputChange={(selectedOption) => {
                  handleSelectChange(selectedOption);
                }}
                options={suggestions}
                placeholder="Enter city name"
                isClearable
                className="react-select-container"
              />
              {loading && <p className="loading">Loading...</p>}
              {error && <p className="white-color">Location not found</p>}
            </div>
          </div>
          {weatherData && (
            <div className="weather-main-container white-color">
              <div className="weather-container">
                <div className="left-section">
                  <div class="humidity-container card">
                    <Humidity speed={weatherData.main.humidity}></Humidity>
                    <Feels speed={weatherData.main.feels_like}></Feels>
                  </div>
                </div>
                <div className="center-section">
                  <h2>{weatherData.name}</h2>
                  <img
                    width="100"
                    height="100"
                    src={getWeatherImgUrl(weatherData.weather[0]["main"])}
                  />
                  <p className="weather-type">
                    {weatherData.weather[0]["main"]}
                  </p>
                  <p className="weather-temprature">
                    {weatherData.main.temp}°C
                  </p>
                </div>
                <div className="right-section">
                  <div class="humidity-container card">
                    <Wind speed={weatherData.wind.speed}></Wind>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
