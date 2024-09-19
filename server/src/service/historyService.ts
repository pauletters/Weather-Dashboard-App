import fs from 'fs';

// This is the City class which has a constructor that takes a name and id
class City {
  constructor(public name: string, public id: any) {
    this.name = name;
    this.id = id;
  };
}

// This is the HistoryService class which uses several methods to read, write, get cities, add cities, and remove cities
class HistoryService {

  // This is the read method that reads the searchHistory.json file
   private async read() {
      try {
     const data = await fs.promises.readFile('searchHistory.json', 'utf-8');
     return JSON.parse(data);
   } catch (error) {
     console.error('Error reading searchHistory.json: ', error);
      return [];
     }
   }

  // This is the write method that writes to the searchHistory.json file
   async write(cities: City[]) {
      try {
      await fs.promises.writeFile('searchHistory.json', JSON.stringify(cities));
   } catch (error) {
      console.error('Error writing searchHistory.json: ', error);
     }
   }
  
  // This is the getCities method that gets the cities from the searchHistory.json file and returns them as an array of City objects
   async getCities(): Promise<City[]> {
      const cities = await this.read();

      if (cities.length === 0) {
         console.log('No cities found');
        return [];
      } else {
         console.log('Cities found');
      return cities.map((city: { name: string; id: any; }) => new City(city.name, city.id))}
   }
  
  // This is the addCity method that adds a city to the searchHistory.json file
   async addCity(city: string) {
      const cities = await this.getCities();
      const newCity = new City(city, cities.length + 1);
      cities.push(newCity);
      await this.write(cities);
   }
  
  // This is the removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
   try {
    // Gets the cities from the searchHistory.json file
     const cities = await this.getCities();

    // Filters out the city with the id that matches the id passed in
     const newCities = cities.filter((city: { id: any }) => city.id !== Number(id));

    // Reassigns the id of the cities
     const reassignedCities = newCities.map((city, index) => {
        city.id = index + 1;
        return city;
      });

    // Writes the reassigned cities to the searchHistory.json file
     await this.write(reassignedCities);
     return { success: true, message: 'City removed successfully' };
   } catch (error) {
     console.error('Error removing city:', error);
     return { success: false, message: 'Failed to remove city' };
   }
 }
}

export default new HistoryService();
