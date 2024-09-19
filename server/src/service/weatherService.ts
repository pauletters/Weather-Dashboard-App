import dotenv from 'dotenv';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dotenv.config();

dayjs.extend(utc);


// This is the interface for the Weather object
interface IWeather {
  city: string;
  date: Dayjs | string; 
  tempF: number;
  windSpeed: number; 
  humidity: number;
  icon: string;
  iconDescription: string;
  }

// This is the Weather class that implements the IWeather interface
class Weather implements IWeather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;

  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string,
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

//This is an async function that gets the weather for a city
interface IWeatherService {
  getWeatherForCity(cityName: any): Promise<Weather[]>; 
}

// This is the WeatherService class that implements the IWeatherService interface
class WeatherService implements IWeatherService {
  constructor(public baseURL: string, public APIKey: string, public city: string) {
    this.baseURL = '';
    this.APIKey = process.env.API_KEY || '';
    this.city = city;
  }
  
// This is the method that gets the weather for a city
  async getWeatherForCity(cityName: any): Promise<Weather[]> {
    const name = cityName;
    console.log('City name: ', name);
    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${this.APIKey}&units=imperial`);
    const result = await weather.json();
    const currentWeather = new Weather(
      result.name,
      dayjs(result.dt_txt).format('MM/DD/YYYY'),
      result.main.temp,
      result.wind.speed,
      result.main.humidity,
      result.weather[0].icon,
      result.weather[0].description,
    );

    // Fetches for 5-day forecast
    const forecastResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${this.APIKey}&units=imperial`);
    const forecastResult = await forecastResponse.json();
    
    // Filter to get the next 5 days of weather
    const filteredDays = forecastResult.list.filter((_: any, index: number) => {
      return index % 8 === 0;
    }).slice(0, 5);

    // This is mapping the filtered days to the Weather class
    const forecastArray = filteredDays.map((day: any) => {
      return new Weather(
        name,
        dayjs(day.dt_txt).format('MM/DD/YYYY'),
        day.main.temp,
        day.wind.speed,
        day.main.humidity,
        day.weather[0].icon,
        day.weather[0].description,
      );
    });
    forecastArray.unshift(currentWeather);
    return forecastArray;
  }
}

export default new WeatherService('baseURL', 'APIKey', 'city');
