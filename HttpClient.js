import axios from 'axios';

const option = {
    baseURL: 'http://localhost:3001',
    headers: {
        'Authorization': `Bearer ${localStorage.jwt}`
    }
}

let http = axios.create(option);

export {http}