import test from 'ava';
import { Client, Condition, Inventory } from '../src/';
import { config } from './test.config';

const BL = new Client(config);

/** @type {Inventory[]} */
const createdInventory = [];

const defaultBrickSeparator = new Inventory({
  item: {
    no: '96874',
    type: 'PART',
  },
  color_id: 4,
  quantity: 1,
  unit_price: 999,
  new_or_used: Condition.Used,
  is_stock_room: true,
  is_retain: false,
});

test.after.always(() => {
  return Promise.all(
    createdInventory.map((x) => BL.send(Inventory.delete(x.inventory_id))),
  );
});

test('Can create an inventory item', async (t) => {
  const inventory = await createInventoryItem(defaultBrickSeparator);
  t.truthy(inventory.inventory_id, 'creates a new inventory id');
});

test('Can create multiple inventory items', async (t) => {
  const description = 'bulk-item-test';
  const item1 = new Inventory({
    item: {
      no: '96874',
      type: 'PART',
    },
    description,
    color_id: 4,
    quantity: 1,
    unit_price: 999,
    new_or_used: Condition.Used,
    is_stock_room: true,
    is_retain: false,
  });
  const item2 = new Inventory({
    item: {
      no: '96874',
      type: 'PART',
    },
    description,
    color_id: 4,
    quantity: 1,
    unit_price: 999,
    new_or_used: Condition.Used,
    is_stock_room: true,
    is_retain: false,
  });
  const createManyRequest = Inventory.create([item1, item2]);
  await BL.send(createManyRequest);

  /** @type {Inventory[]} */
  const all = await BL.send(Inventory.all());
  const created = all.filter((x) => x.description === description);

  t.is(created.length, 2, 'should have create 2 inventory items');

  createdInventory.push(...created);
});

test('Can update an inventory item quantity', async (t) => {
  const inventory = await createInventoryItem(defaultBrickSeparator);
  const updateRequest = Inventory.update(inventory, 1);
  const updatedInventory = await BL.send(updateRequest);
  t.is(updatedInventory.quantity, 2, 'able to update quantity');
});

test('Can delete an inventory item', async (t) => {
  const inventory = await createInventoryItem(defaultBrickSeparator);
  await deleteInventoryItem(inventory);
  await BL.send(Inventory.get(inventory.inventory_id))
    .then(() => {
      t.fail('should not still exist');
    })
    .catch(() => {
      t.pass('inventory deleted successfully');
    });
});

/**
 * @param {Inventory} inventoryInput
 */
async function createInventoryItem(inventoryInput) {
  const createRequest = Inventory.create(inventoryInput);
  const created = await BL.send(createRequest);
  createdInventory.push(created);
  return created;
}

/**
 * @param {Inventory} input
 */
async function deleteInventoryItem(input) {
  const indexOfInput = createdInventory.findIndex(
    (x) => x.inventory_id === input.inventory_id,
  );
  const [resourceToDelete] = createdInventory.splice(indexOfInput, 1);
  const deleteRequest = Inventory.delete(resourceToDelete.inventory_id);
  await BL.send(deleteRequest);
}
