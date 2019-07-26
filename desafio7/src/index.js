import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import './config/ReactrotronConfig';

const App = () => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Routes />
        </>
    );
};

export default App;
