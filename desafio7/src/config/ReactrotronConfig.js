import Reactotron from 'reactotron-react-native';

if (process.env.NODE_ENV === 'development') {
    const tron = Reactotron.configure().connect();
    tron.clear();

    console.tron = tron;
}
