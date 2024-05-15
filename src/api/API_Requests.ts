import axios, { AxiosResponse } from 'axios';
import {addToDB, clearDB, getFromDB} from "../utils/IndexedDBManager";
import {Antivirus} from "../models/Antivirus";

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getAntivirusList = async () => {
    const isServerOnline = await checkServerStatus();
    const jwt = localStorage.getItem('jwt');
    if (isServerOnline) {
        return api.get('/antivirusList', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
            .then(response => {
                addToDB('antivirusList', response.data); // Store the data in IndexedDB
                return response;
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                return getFromDB('antivirusList'); // Fetch from IndexedDB if API call fails
            });
    } else {
        return getFromDB('antivirusList'); // Fetch from IndexedDB if server is offline
    }
};

export const getAntivirusById = async (id: number) => {
    const isServerOnline = await checkServerStatus();
    if (isServerOnline) {
        return api.get(`/antivirusList/${id}`);
    } else {
        const antiviruses = await getFromDB(); // Fetch all antiviruses from IndexedDB
        return antiviruses.find((antivirus: Antivirus) => antivirus.id === id); // Find the antivirus with the given id
    }
};

export const addAntivirus = async (antivirus: {
    supportMultiPlatform: boolean;
    releaseDate: Date;
    name: string;
    producer: string;
    description: string;
    id: number
}) => {
    return api.post('/antivirusList', JSON.stringify(antivirus), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(response.data)
        });
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
        const promises = antiviruses.map((antivirus: { supportMultiPlatform: boolean; releaseDate: Date; name: string; producer: string; description: string; id: number; }) => addAntivirus(antivirus));
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
    console.log('Checking server status...');
    try{
        api.get('/ping');
        console.log('Server is online(ping)!');
        return true;
    }
    catch(error){
        console.error("Server is offline(ping)!");
        return false;
    }
};