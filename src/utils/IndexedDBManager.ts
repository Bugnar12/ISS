import {openDB} from 'idb';

const dbPromise = openDB('lw-database', 1, {
    upgrade(db){
        db.createObjectStore('offlineData');
    },
});

export async function addToDB(key: string, val: any) {
    const db = await dbPromise;
    return db.put('offlineData', val, key);
}

export async function getFromDB(key?: string) {
    const db = await dbPromise;
    if (key) {
        return db.get('offlineData', key);
    } else {
        return db.getAll('offlineData');
    }
}

export async function updateInDB(key: number, val: any) {
    const db = await dbPromise;
    return db.put('offlineData', val, key);
}

export async function clearDB()
{
    const db = await dbPromise;
    return db.clear('offlineData');
}

// Attach the functions to the window object
(window as any).addToDB = addToDB;
(window as any).getFromDB = getFromDB;
(window as any).updateInDB = updateInDB;

export default dbPromise;