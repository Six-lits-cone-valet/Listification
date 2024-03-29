import { openDB } from 'idb';

export {
    updateObject
}

async function updateObject(objStore, id, index, newValue) {
    try {
        const db = await openDB('listify', 1);
        const tx = db.transaction(objStore, 'readwrite');
        const store = tx.objectStore(objStore);
        const item = await store.get(id);
        item[index] = newValue;
        store.put(item);
        await tx.done;
    } catch (err) {
        console.error('Error updating object in IndexedDB', err);
        throw err;
    }
}