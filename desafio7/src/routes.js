import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from './pages/Main';
import Basket from './pages/Basket';

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            Basket,
        },
        {
            headerLayoutPreset: 'center',
            headerBackTitleVisible: 'false', // esconder o voltar do IOS
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTintColor: '#fff',
            },
        }
    )
);

export default Routes;
