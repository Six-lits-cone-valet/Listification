import { openDB } from 'idb';
export { createNewList, getLists, getListById };

async function createNewList(name, theme) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readwrite');
    const store = tx.objectStore('lists');
    const request = await store.add({
        id: Date.now(),
        name: name, 
        theme: theme,
        items: [],
        date_created: Date.now(),
        date_updated: Date.now()
    });
    await tx.done;
    
    return request;
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
    const list = await store.get(+id);
    console.log(list)
    return list;
}