import test from 'ava';
import { Client, Category } from '../src/';
import { config } from './test.config';

let BL;
test.before(() => {
  BL = new Client(config);
});

test('Can get a list of categories', (t) => {
  const request = Category.all();
  return BL.send(request).then((categories) => {
    t.true(categories.length > 0, 'Returns a list of categories');
    t.not(categories[0].category_name, '', 'Sets the category name');
  });
});

test('Can get a single category', (t) => {
  const request = Category.get(868);
  return BL.send(request).then((category) => {
    t.is(
      category.category_name,
      'NEXO KNIGHTS',
      'Pulls back the correct information',
    );
  });
});
