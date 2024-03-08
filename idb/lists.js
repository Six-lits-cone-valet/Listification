import { openDB } from 'idb';
export { createNewList, getLists, getListById };

async function createNewList(name, theme) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readwrite');
    const store = tx.objectStore('lists');
    await store.add({
        name: name, 
        theme: theme,
        items: [],
        date_created: Date.now(),
        date_updated: Date.now()
    });
    await tx.done;
}

async function getLists(limit = 10) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readonly');
    const store = tx.objectStore('lists');
    return store.getAll(null, limit);
}

async function getListById(id) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readonly');
    const store = tx.objectStore('lists');
    return store.get(id);
}