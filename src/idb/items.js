import { openDB } from 'idb';
export { 
    createNewItem, 
    getItemsBytListId,
    deleteItem ,
    toggleItemIsImportant,
    updateItem
};

async function createNewItem(listId, itemText) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('items', 'readwrite');
    const store = tx.objectStore('items');
    const newItem = {
        id: JSON.stringify(Date.now()),
        text: itemText,
        list_id: listId,
        date_created: Date.now(),
        date_updated: Date.now(),
        isImportant: false,
        isChecked: false
    };
    const request = store.add(newItem);
    await tx.done;
    return newItem;
}

async function getItemsBytListId(listId) {
    const db = await openDB('listify', 1);
    const itemsTx = db.transaction('items', 'readonly');
    const store = itemsTx.objectStore('items');
    const index = store.index('by_listId');
    return await index.getAll(listId);
}

async function deleteItem(itemId) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('items', 'readwrite');
    const store = tx.objectStore('items');
    store.delete(itemId);
    await tx.done;
}

async function toggleItemIsImportant(itemId) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('items', 'readwrite');
    const store = tx.objectStore('items');
    const item = await store.get(itemId);
    item.isImportant = !item.isImportant;
    store.put(item);
    await tx.done;
}

async function updateItem(itemId, index, newValue) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('items', 'readwrite');
    const store = tx.objectStore('items');
    const item = await store.get(itemId);
    item[index] = newValue;
    store.put(item);
    await tx.done;
}