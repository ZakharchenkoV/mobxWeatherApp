import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import weatherStore from './WeatherStore';
import './styles.css';

const WeatherDisplay = observer(() => {
  useEffect(() => {
    weatherStore.fetchWeather('Санкт-Петербург');
    weatherStore.fetchDailyForecast('Санкт-Петербург');
    weatherStore.fetchHourlyForecast('Санкт-Петербург');
  }, []);

  const { weatherData, dailyForecastData, hourlyForecastData } = weatherStore;

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
    });
  };

  const celsiusToCelsius = (temp) => {
    return temp !== 0
      ? temp > 0
        ? `+${Math.round(temp)}`
        : `-${Math.round(temp)}`
      : Math.round(temp);
  };

  // Текущий час
  const currentHour = new Date().getHours();

  // Отфильтрованный массив с почасовым прогнозом
  const filteredHourlyForecast = hourlyForecastData.filter((hour, index) => {
    return index >= currentHour; // Прогнозы с текущего часа
    // return index;
  });

  return (
    <div className="weather-display">
      <div className="weather-info">
        {weatherData && (
          <div className="weatherToday">
            <h1>{celsiusToCelsius(weatherData.current.temp_c)}°</h1>
            <img src={weatherData.current.condition.icon} />
          </div>
        )}
      </div>
      <div className="hourly-forecast-container">
        <div className="hourly-forecast">
          {filteredHourlyForecast &&
            filteredHourlyForecast.map((hour, index) => (
              <div key={index} className="hourly-forecast-item">
                <p>{formatTime(hour.time)}</p>
                <img src={hour.condition.icon} />
                <p>{celsiusToCelsius(hour.temp_c)}°</p>
              </div>
            ))}
        </div>
      </div>
      <div className="daily-forecast">
        <h3>Прогноз на 7 дней</h3>
        {dailyForecastData &&
          dailyForecastData.map((day, index) => (
            <div key={index} className="daily-forecast-item">
              <div className="date-info">
                <h4>
                  {new Date(day.date).toLocaleDateString('ru-RU', {
                    weekday: 'long',
                  })}
                  , {formatDate(day.date)}
                </h4>
              </div>
              <div className="weather-info">
                <img src={day.day.condition.icon} />
                <p>{celsiusToCelsius(day.day.maxtemp_c)}°</p>
                <p style={{ color: 'darkgrey' }}>
                  {celsiusToCelsius(day.day.mintemp_c)}°
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

export default WeatherDisplay;
