import { openDB } from 'idb';
export { setActiveList, getActiveList };

const setActiveList = async(id) => {
    const db = await openDB('listify', 1);
    const tx = db.transaction('state', 'readwrite');
    const store = tx.objectStore('state');
    await store.put(id, 'activeList');
    await tx.done;
}

const getActiveList = async() => {
    const db = await openDB('listify', 1);
    const tx = db.transaction('state', 'readonly');
    const store = tx.objectStore('state');
    return store.get('activeList');
}