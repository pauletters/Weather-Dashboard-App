import dotenv from 'dotenv';
dotenv.config();


const APIKey = "259a8e3ddfa5c548f2184c002298c61f";
  let city;

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
};

// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private queryURL = (`api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIKey}`);
  
// TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
    const response = await fetch(this.queryURL);
    return response.json();
   }
  
  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
   }
  
  // TODO: Create buildGeocodeQuery method
  //  private buildGeocodeQuery(): string {
    
  
  // TODO: Create buildWeatherQuery method
  //  private buildWeatherQuery(coordinates: Coordinates): string {
  
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
