# bricklink-api
Node package for connecting to Bricklink's API.

```
npm install --save bricklink-api
```

## Basic Usage

Initialize a client with your OAuth credentials as supplied at the following:

[https://www.bricklink.com/v2/api/register_consumer.page](https://www.bricklink.com/v2/api/register_consumer.page)

You are required to have a Bricklink account and register your IP address from
which your application will be using the API.

```javascript
var Client = require('bricklink-api').Client;
var ItemType = require('bricklink-api').ItemType;
var bricklink = new Client({
    "consumer_key": "<ConsumerKey>",
    "consumer_secret": "<ConsumerSecret>",
    "token": "<TokenValue>",
    "token_secret": "<TokenSecret>"
  });

bricklink.getCatalogItem(ItemType.Part, '3001')
  .then(function(part){
    console.log(part);
  });
```

## ES6 Support

Read basic usage.

```javascript
import {Client, ItemType} from 'bricklink-api';

const bricklink = new Client({
    "consumer_key": "<ConsumerKey>",
    "consumer_secret": "<ConsumerSecret>",
    "token": "<TokenValue>",
    "token_secret": "<TokenSecret>"
  });

bricklink.getCatalogItem(ItemType.Part, '3001')
  .then(part => console.log(part));
```

## Proxy Support

Due to the IP restriction you may need to use a proxy in a cloud hosted
environment where IP addresses are not always reserved.

First you will need to have an https capable proxy agent.

```
npm install -S https-proxy-agent
```

Then you will need to pass in a created agent in the `agent` parameter of the
client configuration options.

```javascript
import HttpsProxyAgent from 'https-proxy-agent';
import {Client} from 'bricklink-api';

const proxy = new HttpsProxyAgent('http://217.33.216.114:8080');

const bricklink = new Client({
    "agent": proxy,
    "consumer_key": "<ConsumerKey>",
    "consumer_secret": "<ConsumerSecret>",
    "token": "<TokenValue>",
    "token_secret": "<TokenSecret>"
  });
```

## Documentation

Full API documentation is available at:

[https://ryansh100.github.io/bricklink-api](https://ryansh100.github.io/bricklink-api)

## Changelog

- 2017/04/03: Update to make more intuitive imports.
