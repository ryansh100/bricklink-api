import test from 'ava';
import { Client, Color } from '../src/';
import { config } from './test.config';

let BL;
test.before(() => {
  BL = new Client(config);
});

test('Can get a list of categories', (t) => {
  let request = Color.all();
  return BL.send(request).then((colors) => {
    t.true(colors.length > 0, 'Returns a list of colors');
    t.not(colors[0].color_name, '', 'Sets the color name');
    t.not(colors[0].color_code, '', 'Sets the color code');
  });
});

test('Can get a single color', (t) => {
  let request = Color.get(27);
  return BL.send(request).then((color) => {
    t.is(color.color_name, 'Rust', 'Gets the correct color');
  });
});
