var express = require('express');
var router = express.Router();

var champion = require('../static/champion_8_9_1.json');
var item = require('../static/item_8_9_1.json');
var summoner = require('../static/summoner_8_9_1.json');

/* get around rate limit issue for static API */
router.get('/v3/champions/:championID', function(req, res) {

  for (let k in champion.data){
    if (champion.data[k].key === req.params.championID){
        return res.json(champion.data[k]);
    }
  }
  return res.sendStatus(404);

});

router.get('/v3/summoner-spells/:spellID', function(req, res) {

  for (let k in summoner.data){
    if (summoner.data[k].key === req.params.spellID){
        return res.json(summoner.data[k]);
    }
  }
  return res.sendStatus(404);

});

router.get('/v3/items/:itemID', function(req, res) {

  for (let k in item.data){
    if (k === req.params.itemID){
        return res.json(item.data[k]);
    }
  }
  return res.sendStatus(404);

});

module.exports = router;
