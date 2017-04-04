var FileSystem = require('fs');
var Client = require('../dist/').Client;
var ItemType = require('../dist/').ItemType;

var config = JSON.parse(FileSystem.readFileSync(
  __dirname + '/../credentials.local.json',
  'UTF-8'));

var bricklink = new Client(config);

bricklink.getCatalogItem(ItemType.Part, '3001')
          .then(function(part){
              console.log(part);
          });
