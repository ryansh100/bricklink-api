import test from 'ava';
import { Client, Color } from '../src/';
import { config } from './test.config';

/** @type {Client} */
let BL;
test.before(() => {
  BL = new Client(config);
});

test('Will reject if the Bricklink servers return an error code', (t) => {
  const request = Color.get(400000000000000000);
  return t.throwsAsync(() => BL.send(request));
});
