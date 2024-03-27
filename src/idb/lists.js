import { openDB } from 'idb';
import { setActiveList } from './state';
import { getItemsBytListId, deleteItem } from './items';
export { 
        createNewList, 
        getLists, 
        getListDataById, 
        deleteListById ,
        toggleListIsImportant,
        updateList
    };

async function createNewList(name, theme) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readwrite');
    const store = tx.objectStore('lists');
    const request = await store.add({
        id: JSON.stringify(Date.now()),
        name: name, 
        theme: theme,
        items: [],
        date_created: Date.now(),
        date_updated: Date.now()
    });
    await tx.done;
    
    return request;
}

async function getLists(limit = 100) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readonly');
    const store = tx.objectStore('lists');
    return store.getAll(null, limit);
}

async function getListDataById(id) {
    try {
        const db = await openDB('listify', 1);
        const tx = db.transaction(['lists', 'items'], 'readonly');
        const listStore = tx.objectStore('lists');
        const itemsStore = tx.objectStore('items');
        const list = await listStore.get(id);

        const itemsTx = db.transaction('items', 'readonly');
        const store = itemsTx.objectStore('items');
        const index = store.index('by_listId');
        const items = await index.getAll(id);

        list.items = items;

        return list;
    } catch (error) {
        console.error('Error in getListDataById:', error);
    }
}

async function deleteListById(id) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readwrite');
    const store = tx.objectStore('lists');
    const request = await store.delete(id);
    await tx.done;

    await deleteAllItemsByListId(id);

    await setActiveList(undefined);

    return request;
}

async function toggleListIsImportant(listId) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readwrite');
    const store = tx.objectStore('lists');
    const list = await store.get(listId);
    list.isImportant = !list.isImportant;
    store.put(list);
    await tx.done;
}

async function deleteAllItemsByListId(listId) {
    const items = await getItemsBytListId(listId);

    items.forEach(item => {
        deleteItem(item.id);
    });
}

async function updateList(listId, index, newValue) {
    const db = await openDB('listify', 1);
    const tx = db.transaction('lists', 'readwrite');
    const store = tx.objectStore('lists');
    const list = await store.get(listId);
    list[index] = newValue;
    store.put(list);
    await tx.done;
}