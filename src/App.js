import React, { Component } from "react";
import "./App.css";
import Weather from "./weather_app/weather.component";
import "weather-icons/css/weather-icons.css";
import Form from "./weather_app/form.component";

const API_KEY = "d1e9780717afab7f8d3fe75457df07af";

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      errorMessages: ""
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_weatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({
          icon: icons.Thunderstorm
        });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({
          icon: icons.Drizzle
        });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({
          icon: icons.Rain
        });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({
          icon: icons.Snow
        });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({
          icon: icons.Atmosphere
        });
        break;
      case rangeId === 800:
        this.setState({
          icon: icons.Clear
        });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({
          icon: icons.Clouds
        });
        break;
      default:
        this.setState({
          icon: icons.Clouds
        });
    }
  };

  calCelsius = temp => {
    return Math.floor(temp - 273.15);
  };
  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.City.value;
    const country = e.target.elements.Country.value;
    console.log(city, country);

    if (city && country) {
      try {
        const api_call = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
        );
        const response = await api_call.json();
        if (response.cod === 200) {
          this.setState({
            city: `${response.name},${response.sys.country}`,
            celsius: this.calCelsius(response.main.temp),
            temp_max: this.calCelsius(response.main.temp_max),
            temp_min: this.calCelsius(response.main.temp_min),
            description: response.weather[0].description
          });
          this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
          this.setState({
            errorMessages: ""
          });
        } else {
          this.setState({ errorMessages: "City not found" });
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      this.setState({ errorMessages: "Please Enter City and Country" });
    }
  };
  render() {
    return (
      <div className="App">
        <Form
          loadWeather={this.getWeather}
          error={this.state.error}
          errorMessages={this.state.errorMessages}
        />
        {!this.state.errorMessages ? (
          <Weather
            city={this.state.city}
            country={this.state.country}
            celsius={this.state.celsius}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            icon={this.state.icon}
          />
        ) : (
          errorFunc(this.state.errorMessages)
        )}
      </div>
    );
  }
}

function errorFunc(errorMessages) {
  if (!errorMessages) {
    return null;
  }
  return <div className="alert alert-danger mx-5">{errorMessages}</div>;
}

export default App;
