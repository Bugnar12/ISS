import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const getCustomersByAntivirusId = (antivirusId : number) =>
{
    return api.get(`/getCustomerByAntivirusId/${antivirusId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data : getCustomerByAntivirusId', error);
            return [];
        });
}

