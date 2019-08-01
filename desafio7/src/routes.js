import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './pages/Main';
import Basket from './pages/Basket';

import Header from './components/Header';

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            Basket,
        },
        {
            headerLayoutPreset: 'center',
            headerBackTitleVisible: 'false', // esconder o voltar do IOS
            defaultNavigationOptions: navigation => ({
                header: <Header {...navigation} />,
            }),
            cardStyle: 'black',

            // defaultNavigationOptions: {
            //     headerStyle: {
            //         backgroundColor: 'black',
            //     },
            //     headerTintColor: '#fff',
            // },
        }
    )
);

export default Routes;
