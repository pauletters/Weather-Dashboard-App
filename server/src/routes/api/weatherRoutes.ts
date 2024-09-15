import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
const requestedWeather = await WeatherService.getWeatherForCity(req.body.city);
  // TODO: save city to search history
if (requestedWeather.length > 0) {
  const result = await HistoryService.addCity(req.body.city);
  res.send(result);
}
});

// TODO: GET search history
router.get('/history', async (_, res) => {
  const historyRequest = await HistoryService.getCities();
  if (historyRequest) {
    res.send(historyRequest);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  const result = await HistoryService.removeCity(id);
  res.send(result);
});

export default router;
