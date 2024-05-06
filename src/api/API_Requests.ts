import axios from 'axios';
import {addToDB, clearDB, getFromDB} from "../utils/IndexedDBManager";
import {Antivirus} from "../models/Antivirus";

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getAntivirusList = () => {
    return api.get('/antivirusList')
        .catch(error => {
            console.error('Error fetching data: ', error);
            return getFromDB(); // Replace 1 with the actual key
        });
};

export const getAntivirusById = (id: number) => api.get(`/antivirusList/${id}`);

export const addAntivirus = async (antivirus: {
    supportMultiPlatform: boolean;
    releaseDate: Date;
    name: string;
    producer: string;
    description: string;
    id: number
}) => {
    const isServerOnline = await checkServerStatus();
    if (isServerOnline) {
        return api.post('/antivirusList', JSON.stringify(antivirus), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else {
        addToDB(antivirus.id, antivirus);
        return Promise.resolve(antivirus);
    }
};

export const updateAntivirus = (antivirus: {
    supportMultiPlatform: boolean;
    releaseDate: Date;
    name: string;
    producer: string;
    description: string;
    id: number
}) => api.put(`/antivirusList/${antivirus.id}`, JSON.stringify(antivirus), {
    headers: {
        'Content-Type': 'application/json'
    }
});

export const deleteAntivirus = (id: number) => api.delete(`/antivirusList/${id}`);

export const syncDataWithServer = async () => {
    console.log('syncDataWithServer called');
    const isServerOnline = await checkServerStatus();
    if (isServerOnline) {
        console.log('Syncing data with the server...');
        const antiviruses = await getFromDB();
        const promises = antiviruses.map(antivirus => addAntivirus(antivirus));
        Promise.all(promises)
            .then(() => {
                console.log('Data synced with the server!');
                clearDB().then(() => {
                    console.log('Lightweight database has been cleared!');
                });
            })
            .catch(error => {
                console.error('Error syncing the data with the server', error);
            });
    }
};
export const checkServerStatus = () => {
    return api.get('/antivirusList')
        .then(() => true)
        .catch(() => false);
};