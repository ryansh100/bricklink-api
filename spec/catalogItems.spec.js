import test from 'ava';
import { Client, ItemType, Condition } from '../src/';
import { config } from './test.config';

let BL;
test.before(() => {
  BL = new Client(config);
});

test('Can get a price guide', (t) => {
  return BL.getPriceGuide(ItemType.Set, '10224-1').then((guide) => {
    t.is(guide.item.no, '10224-1', 'Got the right item back');
    t.true(guide.max_price > 0, 'Returns a max price');
    t.true(guide.min_price > 0, 'Returns a min price');
    t.is(guide.new_or_used, 'N', 'Indicated if new or used.');
  });
});

test('Can get a used price guide', (t) => {
  return BL.getPriceGuide(ItemType.Set, '10224-1', {
    new_or_used: Condition.Used,
  }).then((guide) => {
    t.is(guide.item.no, '10224-1', 'Got the right item back');
    t.true(guide.max_price > 0, 'Returns a max price');
    t.true(guide.min_price > 0, 'Returns a min price');
    t.is(guide.new_or_used, 'U', 'Indicated if new or used.');
  });
});

test('Can get information on a book', (t) => {
  return BL.getCatalogItem(ItemType.Book, '810002').then((book) => {
    t.is(book.year_released, 2008, 'Gets the year correctly');
  });
});

test('Can get information on a set', (t) => {
  return BL.getCatalogItem(ItemType.Set, '10224-1').then((set) => {
    t.not(set.image_url, '', 'Has an image url');
    t.is(set.year_released, 2012, 'Gets the year correctly');
  });
});

test('Can get information on minifigure', (t) => {
  return BL.getCatalogItem(ItemType.Minifigure, 'pi055').then((fig) => {
    t.not(fig.image_url, '', 'Has an image url');
    t.is(fig.year_released, 1989, 'Gets the year correctly');
    t.is(fig.type, ItemType.Minifigure);
  });
});

test('Can get information on part', (t) => {
  return BL.getCatalogItem(ItemType.Part, '3001').then((part) => {
    t.not(part.image_url, '', 'Has an image url');
    t.is(part.year_released, 1978, 'Gets the year correctly');
    t.is(part.type, ItemType.Part);
  });
});

test('Can get known colors for a part', (t) => {
  return BL.getKnownColors(ItemType.Part, '3001').then((colors) => {
    t.true(colors.length > 0, 'Returns a whole list of colors');
    t.true(colors[0].quantity > 0, 'Returns a valid times used');
  });
});

test('Can get an image for a known color id of a catalog item', (t) => {
  return BL.getItemImage(ItemType.Part, '3001', 1).then((image) => {
    t.not(image.thumbnail_url, '', 'Returns a valid image url.');
  });
});

test('Can get an inventory of a minifigure', (t) => {
  return BL.getItemSubset(ItemType.Minifigure, 'pi055').then((subset) => {
    t.true(subset.length > 0, 'Returns a list subset items');
    t.true(
      subset[0].entries.length > 0,
      'Returns a list of entries with each subset item',
    );
  });
});

test('Can get an inventory of a set', (t) => {
  return BL.getItemSubset(ItemType.Set, '6024-1').then((subset) => {
    t.true(subset.length > 0, 'Returns a list subset items');
    t.true(
      subset[0].entries.length > 0,
      'Returns a list of entries with each subset item',
    );
  });
});

test('Can get an inventory of a part', (t) => {
  return BL.getItemSubset(ItemType.Part, '4592c04').then((subset) => {
    t.true(subset.length > 0, 'Returns a list subset items');
    t.true(
      subset[0].entries.length > 0,
      'Returns a list of entries with each subset item',
    );
  });
});

test('Can display what other parts a part is in', (t) => {
  return BL.getItemSuperset(ItemType.Part, '4593').then((superset) => {
    t.true(superset.length > 0, 'Returns a list superset items');
    t.true(
      superset[0].entries.length > 0,
      'Returns a list of entries with each superset item',
    );
  });
});
