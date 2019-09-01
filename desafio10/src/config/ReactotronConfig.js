import Reactron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import {Platform} from 'react-native';


if (__DEV__) {
    const tron = Reactron.configure({
        host: Platform.OS === 'ios' ?  'localhost' : '10.0.2.2',
    })
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    tron.clear();

    console.tron = tron;
}
