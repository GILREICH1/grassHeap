const router = require('express').Router();
const { savePlant, deletePlant } = require('./controllers/plantController');

const {
  getTasks,
  saveTask,
  getTasksByMonth,
  getTasksByCrop,
  deleteTask,
} = require('./controllers/taskController');

const { getAllPlants } = require('./controllers/growStuffController');

const {
  getWeather,
  getFiveDayForecast,
} = require('./controllers/weatherController');

const { getUser } = require('./controllers/userController');

const { checkJwt } = require('./check-jwt');

// interact with GrowStuff API
router.get('/plants', getAllPlants);

// interact with MyPlants database
router.post('/myPlants', checkJwt, savePlant);
router.delete('/myPlants', checkJwt, deletePlant);

// interact with tasks database
router.get('/tasks', getTasks);
router.get('/tasks/month/:month', getTasksByMonth);
router.get('/tasks/crop/:crop', getTasksByCrop);
router.post('/tasks', checkJwt, saveTask);
router.delete('/tasks', checkJwt, deleteTask);

// getWeather
router.post('/weather', getWeather);
router.post('/forecast', getFiveDayForecast);

// Users
router.post('/getUser', checkJwt, getUser);

module.exports = router;
