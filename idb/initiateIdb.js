import { openDB } from 'idb';

export { initiateIdb };

async function initiateIdb() {
    let dbCreated = false;
    const db = await openDB('listify', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('lists')) {
                db.createObjectStore('lists', { keyPath: 'id' });
                db.createObjectStore('state');
                const itemsStore = db.createObjectStore('items', { keyPath: 'id' });
                itemsStore.createIndex('by_listId', 'list_id');
                dbCreated = true;
            }
        },
    });

    let persistent = {
        status: false,
        message: ''
    };

    if (db) {
        persistent.status = await navigator.storage.persist().then(granted => {
            if (granted) {
                persistent.message = 'Storage will not be cleared except by explicit user action';
            } else {
                persistent.message = 'Storage may be cleared by the UA under storage pressure.';
            }

            db.close();

            return granted;
        });
    }

    return { dbCreated, persistent };
}