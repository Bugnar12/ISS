import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getAntivirusList = () => api.get('/antivirusList');
export const getAntivirusById = (id: number) => api.get(`/antivirusList/${id}`);
export const addAntivirus = (antivirus: {
    supportMultiPlatform: boolean;
    releaseDate: Date;
    name: string;
    producer: string;
    description: string;
    id: number
}) => api.post('/antivirusList', JSON.stringify(antivirus), {
    headers: {
        'Content-Type': 'application/json'
    }
});
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

export default api;