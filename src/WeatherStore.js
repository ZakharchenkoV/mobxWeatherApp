// WeatherStore.js
import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';

class WeatherStore {
  weatherData = null;
  dailyForecastData = [];
  hourlyForecastData = [];

  constructor() {
    makeObservable(this, {
      weatherData: observable,
      dailyForecastData: observable,
      hourlyForecastData: observable,
      fetchWeather: action,
      fetchDailyForecast: action,
      fetchHourlyForecast: action,
    });
  }

  async fetchWeather(city) {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=f336bf7e5e6f4b3e9c2170424242804&q=${city}`);
      this.weatherData = response.data;
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  }

  async fetchDailyForecast(city) {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f336bf7e5e6f4b3e9c2170424242804&q=${city}&days=7`);
      this.dailyForecastData = response.data.forecast.forecastday;
    } catch (error) {
      console.error('Error fetching daily forecast:', error);
    }
  }

  async fetchHourlyForecast(city) {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f336bf7e5e6f4b3e9c2170424242804&q=${city}&hours=24`);
      this.hourlyForecastData = response.data.forecast.forecastday[0].hour;
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
    }
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
