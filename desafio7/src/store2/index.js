import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './modules/rootSage';
import rootReducer from './modules/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
