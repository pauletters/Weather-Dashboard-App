import fs from 'fs';

// TODO: Define a City class with name and id properties
class City {
  constructor(public name: string, public id: number | string) {
    this.name = name;
    this.id = id;
  };
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
   private async read() {
      try {
     const data = await fs.promises.readFile('searchHistory.json', 'utf-8');
     return JSON.parse(data);
   } catch (error) {
     console.error('Error reading searchHistory.json: ', error);
      return [];
     }
   }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
      try {
      await fs.promises.writeFile('searchHistory.json', JSON.stringify(cities));
   } catch (error) {
      console.error('Error writing searchHistory.json: ', error);
     }
   }
  
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
   async getCities(): Promise<City[]> {
      const cities = await this.read();
      console.log(cities);
      if (cities.length === 0) {
         console.log('No cities found');
        return [];
      } else {
         console.log('Cities found');
      return cities.map((city: { name: string; id: number; }) => new City(city.name, city.id))}
   }
  
  // TODO Define an addCity method that adds a city to the searchHistory.json file
   async addCity(city: string) {
      const cities = await this.getCities();
      const newCity = new City(city, cities.length + 1);
      cities.push(newCity);
      await this.write(cities);
   }
  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
   async removeCity(id: number | string) {
      const cities = await this.getCities();
      const newCities = cities.filter((city: { id: number | string; }) => city.id !== id);
      await this.write(newCities);
   }
};

export default new HistoryService();
