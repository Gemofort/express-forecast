const express = require('express');
const fetch = require('node-fetch');

const apiKey = require('../config/token');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('mainpage', {
    name: req.body.name ? req.body.name : ''
  });
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  let errors = [];
  let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`);
  let data = await response.json();

  if (!name) {
    errors.push({ msg: 'Please fill in a field' });
  };
  if (data.cod === '404' && data.hasOwnProperty('cod')) {
    errors.push({ msg: 'City on found, please check city name' });
  }

  if (errors.length > 0) {
    res.render('mainpage', {
      errors
    });
  } else {
    console.log(data);
    res.render('mainpage', {
      name,
      country: data.sys.country,
      temp: data.main.temp
    });
  };
});

module.exports = router;