import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://10.0.3.2:3333',
    // baseURL: 'http://10.0.2.2:3333',
    baseURL: 'http://127.0.0.1:3333',

    // baseURL: 'http://192.168.3.107:3333',
});

export default api;
