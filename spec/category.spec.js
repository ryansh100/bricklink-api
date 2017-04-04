import test from 'ava';
import FileSystem from 'fs';
import {Client, Category} from '../src/';

let BL;
test.before(t => {
    let config = JSON.parse(FileSystem.readFileSync(
      __dirname + '/../credentials.local.json',
      'UTF-8'));
    BL = new Client(config);
});

test('Can get a list of categories', t => {
    let request = Category.all();
    return BL.send(request)
      .then(categories => {
          t.true(categories.length > 0, 'Returns a list of categories');
          t.not(categories[0].category_name, '', 'Sets the category name');
      });
});

test('Can get a single category', t => {
    let request = Category.get(868);
    return BL.send(request)
      .then(category => {
          t.is(category.category_name, 'Nexo Knights', 'Pulls back the correct information');
      });
});
