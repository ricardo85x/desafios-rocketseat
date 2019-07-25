import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import './config/ReactrotronConfig';

const App = () => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Routes />
        </>
    );
};

export default App;
