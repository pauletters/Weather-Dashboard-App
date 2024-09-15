import dotenv from 'dotenv';
dotenv.config();




// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
};

// TODO: Define a class for the Weather object
class Weather {
  constructor(public temperature: number, public humidity: number, public windSpeed: number, public weather: string, public date: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.weather = weather;
    this.date = date;
  };

}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  constructor(public baseURL: string, public APIKey: string, public city: string) {
    // this.baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    this.baseURL = '';
    this.APIKey = "259a8e3ddfa5c548f2184c002298c61f";
    this.city = city;
  }

  
// TODO: Create fetchLocationData method (query: string)
   private async fetchLocationData(_query: string) {
    
    const geoCodeURL = this.buildGeocodeQuery();
    const location = await fetch(geoCodeURL);
    this.buildGeocodeQuery();

    if (location.json.length > 1) {
      return `error: Provide a city name, a comma, and a state name ex. 'Portland, OR'`;
    } else {
      return location.json();
    }
   }
  
  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
   }
  
  // TODO: Create buildGeocodeQuery method
    private buildGeocodeQuery(): string {
      return `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}`;
    }
    
  
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
      return `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIKey}`;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData(_city: string) {
      // use the new baseUrl to make the call to the weather API
      // return the destructured location data
      const locationData = await this.fetchLocationData(this.city);
      const destructure = this.destructureLocationData(locationData);
      return destructure;
   }
  
  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const baseURL = this.buildWeatherQuery(coordinates);
    const weather = await fetch(baseURL);
    
    this.buildWeatherQuery(coordinates);
    
    return weather.json();
   }
  
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    const { main, weather, wind } = response.list[0];
    const current = {
      temperature: main.temp,
      humidity: main.humidity,
      windSpeed: wind.speed,
      weather: weather[0].description,
      date: response.list[0].dt, 
    };

    return current;

   }
  
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: { list: any[] }) {
    let forecastArray = [];
     forecastArray = weatherData.list.map((day: any) => {
      return {
        date: day.dt,
        temperature: day.main.day,
        humidity: day.main.humidity,
        windSpeed: day.wind.speed,
        weather: day.weather[0].description,
      };
    });
    
    forecastArray.push(currentWeather);
    return forecastArray;

   }
  
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
     const location = await this.fetchAndDestructureLocationData(city);
    const weather = await this.fetchWeatherData(location);
     const currentWeather = this.parseCurrentWeather(weather);
     const forecast = this.buildForecastArray(currentWeather, weather);
     
     return forecast;
    
   }
};

export default new WeatherService('baseURL', 'APIKey', 'city');
