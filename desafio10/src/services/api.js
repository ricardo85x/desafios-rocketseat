import axios from 'axios';
import {Platform} from 'react-native';

const api = axios.create({
    ...Platform.select({
        ios: {
            baseURL: 'http://localhost:3323',
        },
        android: {
            baseURL: 'http://10.0.2.2:3323',
        },
      })
});


export default api;
