import test from 'ava';
import FileSystem from 'fs';
import HttpsProxyAgent from 'https-proxy-agent';
import {Client} from '../src/client';
import {ItemType} from '../src/itemType';

let config = JSON.parse(FileSystem.readFileSync(
  __dirname + '/../credentials.local.json',
  'UTF-8'));

test('can use a proxy client', t => {
    let proxy = new HttpsProxyAgent('http://217.33.216.114:8080');
    let overRide = {
      'token': config.proxyToken,
      'token_secret': config.proxyTokenSecret
    };

    let init = {agent: proxy};
    let testConfig = Object.assign(init, config, overRide);

    let BL = new Client(testConfig);

    return BL.getPriceGuide(ItemType.Set, '10224-1')
      .then(guide => {
          return t.is(guide.item.no, '10224-1', 'Got the right item back');
      });
});
