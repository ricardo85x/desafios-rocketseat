import axios from 'axios';
import {Platform} from 'react-native';

const api = axios.create({
    ...Platform.select({
        ios: {
            baseURL: 'https://meetup-ricardo-backend.herokuapp.com',// 'http://localhost:3323',
        },
        android: {
            baseURL: 'https://meetup-ricardo-backend.herokuapp.com', //'http://10.0.2.2:3323',
        },
      })
});



export default api;
