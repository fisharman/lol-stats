var express = require('express');
var router = express.Router();
var request = require('request');
var apiKey = require('../apiKey')

const config = {
  headers: apiKey
};

const baseURL = `https://na1.api.riotgames.com`;
  // `lol/summoner/v3/summoners/by-name/RiotSchmick`;

/* forward http requests */
router.get('/', function(req, res) {
  let url = baseURL + req.originalUrl;
  req.pipe(request(url, config)).pipe(res);
});

module.exports = router;
