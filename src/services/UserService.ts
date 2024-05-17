// src/services/UserService.ts
import axios from "axios";
import {User} from "../models/User";

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const loginUser = async (user: User) => {
    return api.post('/user/login', JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            // Save the JWT in local storage
            localStorage.setItem('jwt', response.data.token);
            return response;
        })
        .catch((error) => {
            if (!error.response) {
                // network error
                throw new Error('Network Error');
            }
            console.error('Error logging in: ', error);
            throw error;
        });
};

export const registerUser = async (user: User) => {
    return api.post('/user/register', JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log(response.data);
            return response;
        })
        .catch((error) => {
            if (!error.response) {
                // network error
                throw new Error('Network Error');
            }
            console.error('Error registering: ', error);
            throw error;
        });
};