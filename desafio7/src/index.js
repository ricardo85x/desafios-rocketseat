import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './routes';
import './config/ReactrotronConfig';

import NavigatorService from './services/navigation';

import store from './store';

const App = () => {
    return (
        <Provider store={store}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Routes
                ref={navigatorRef =>
                    NavigatorService.setNavigator(navigatorRef)
                }
            />
        </Provider>
    );
};

export default App;
