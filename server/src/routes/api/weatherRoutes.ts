import { Router } from 'express';
const router = Router();
// may need to add.js to the end of the import
 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  try {
const requestedWeather = await WeatherService.getWeatherForCity(req.body.city);
  // TODO: save city to search history
if (requestedWeather.length > 0) {
  await HistoryService.addCity(req.body.city);
  res.status(200).json(requestedWeather);
} else {
  res.status(404).json({ message: 'City not found' });
}
  } catch (error) {
    console.error('Error getting weather data: ', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// TODO: GET search history
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

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  const result = await HistoryService.removeCity(id);
  res.send(result);
});

export default router;
