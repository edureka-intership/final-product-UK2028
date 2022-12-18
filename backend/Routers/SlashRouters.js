const express = require('express');
const controller = require('../Controllers/getControllers');

const routers = express.Router();

routers.get('/locations',controller.getLocations);
routers.get('/mealtypes',controller.getmealType);
routers.get('/restaurants/city/:id',controller.getRestaurantsByCity);
routers.get('/restaurants/:name',controller.getRestaurantsByName);
routers.post('/register',controller.registerUser);
routers.post('/login',controller.loginUser);
routers.post('/restaurants/filters/:currentPage',controller.getRestaurants);
routers.get('/restaurants/menu/:name',controller.getMenu);

module.exports = routers;