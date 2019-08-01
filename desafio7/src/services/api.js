import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://10.0.3.2:3333', // genymotion
    baseURL: 'http://10.0.2.2:3333', // android studio
    // baseURL: 'http://127.0.0.1:3333', // ios
});

export default api;
