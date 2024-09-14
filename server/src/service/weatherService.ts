import dotenv from 'dotenv';
dotenv.config();




// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
};

// TODO: Define a class for the Weather object
class Weather {
  constructor(public temperature: number, public humidity: number, public windSpeed: number, public weather: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.weather = weather;
  };

}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  constructor(public baseURL: string, public APIKey: string, public city: string) {
    // this.baseURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    this.baseURL = baseURL;
    this.APIKey = "259a8e3ddfa5c548f2184c002298c61f";
    this.city = city;
  }

  
// TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
    const response = await fetch(query);
    return response.json();
   }
  
  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
   }
  
  // TODO: Create buildGeocodeQuery method
    private async buildGeocodeQuery(): string {
      const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}`);
      return response.json();
      // make the call to the geocode API with the cityName
      // return response.json();
      // return `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIKey}`;
    }
    
  
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
    fetch(this.buildGeocodeQuery)
    .then((response) => {
      const { lat, lon } = response;
      return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.APIKey}`;
    };
    // use the response from buildGeocodeQuery to get the lat and lon
    // assign those to the lat and lon variables
    // use the lat and lon variables to build the weather query (baseURL)
    // return the baseURL
  }
  
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData() {
      // use the new baseUrl to make the call to the weather API
      // return the destructured location data
      const locationData = await this.fetchLocationData(this.baseURL);
      return this.destructureLocationData(locationData);
   }
  
  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.baseURL);
    return response.json();
   }
  
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    const { main, weather } = response.current;
    return {
      temperature: main.temp,
      humidity: main.humidity,
      windSpeed: response.wind.speed,
      weather: weather[0].description,
    };
   }
  
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = weatherData.daily.map((day: any) => {
      return {
        date: day.dt,
        temperature: day.temp.day,
        humidity: day.humidity,
        windSpeed: day.wind_speed,
        weather: day.weather[0].description,
      };
    });
    return forecastArray;
   }
  
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
     const locationData = await this.fetchAndDestructureLocationData();
     const coordinates = this.destructureLocationData(locationData);
     const weatherData = await this.fetchWeatherData(coordinates);
     const currentWeather = this.parseCurrentWeather(weatherData);
     return this.buildForecastArray(currentWeather, weatherData);
   }
};

export default new WeatherService();
