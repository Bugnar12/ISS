import axios from 'axios';
import {Customer} from "../models/Customer";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export function convertDtoToCustomer(customerToConvert: any) {
    return new Customer(customerToConvert.id, customerToConvert.fullName, customerToConvert.email, customerToConvert.age, customerToConvert.antivirus);
}

export const getCustomersByAntivirusId = (antivirusId : number, page: number, size: number) =>
{
    return api.get(`/getCustomerByAntivirusIdPage/${antivirusId}?page=${page}&size=${size}`)
        .then(response => {
            const result: Customer[] = [];
            response.data.content.forEach((currentCustomer: any) => {
                result.push(convertDtoToCustomer(currentCustomer));
            });
            return result;
        })
        .catch(error => {
            console.error('Error fetching data : getCustomerByAntivirusId', error);
            return [];
        });
}

export const getNoOfCustomersByAntivirusId = (antivirusId : number) =>
{
    return api.get(`/getNoOfCustomers/${antivirusId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data : getNoOfCustomersByAntivirusId', error);
            return 0;
        });
}