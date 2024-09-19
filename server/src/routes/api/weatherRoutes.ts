import { Router } from 'express';
const router = Router();

// These are importing the history and weather service files
 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// This is the post request that gets the weather data for a city
router.post('/', async (req, res) => {
  console.log('req.body: ', req.body);

  // Gets the weather data for the city
  try {
const requestedWeather = await WeatherService.getWeatherForCity(req.body.cityName);

if (Object.keys(requestedWeather).length > 0) {
  await HistoryService.addCity(req.body.cityName);
  res.status(200).json(requestedWeather);
} else {
  res.status(404).json({ message: 'City not found' });
}
  } catch (error) {
    console.error('Error getting weather data: ', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// This is the get request that gets the search history
router.get('/history', async (_, res) => {
  try {
  const historyRequest = await HistoryService.getCities();
  if (historyRequest) {
    res.status(200).json(historyRequest);
  } else {
    res.status(404).json({ message: 'No cities found' });
  }
  } catch (error) {
    console.error('Error getting search history: ', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// This is the delete request that deletes a city from the search history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await HistoryService.removeCity(id);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Error in delete route:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
