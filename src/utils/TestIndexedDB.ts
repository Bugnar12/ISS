import { addToDB, getFromDB, updateInDB } from '../utils/IndexedDBManager';

async function testIndexedDBFunctions() {
    // Test addToDB
    await addToDB(1, { name: 'Test Antivirus', producer: 'Test Producer' });
    console.log('Data added');

    // Test getFromDB
    const data = await getFromDB();
    console.log('Data retrieved: ', data);

    // Test updateInDB
    await updateInDB(1, { name: 'Updated Antivirus', producer: 'Updated Producer' });
    const updatedData = await getFromDB();
    console.log('Data updated: ', updatedData);
}

export default testIndexedDBFunctions();