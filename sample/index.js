var Client = require('../dist/').Client;
var ItemType = require('../dist/').ItemType;
var dotenv = require('dotenv');

dotenv.config();

var config = {
  token: process.env['TOKEN'],
  token_secret: process.env['TOKEN_SECRET'],
  consumer_key: process.env['CONSUMER_KEY'],
  consumer_secret: process.env['CONSUMER_SECRET'],
};

var bricklink = new Client(config);

bricklink.getCatalogItem(ItemType.Part, '3001').then(function (part) {
  console.log(part);
});
