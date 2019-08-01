import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToBasketSuccess } from './actions';

function* addRequest(id) {
    const respose = yield call(api.get, `/product/${id}`);

    // processa os dados

    yield put(addToBasketSuccess(respose.data));
}

export default all([takeLatest('@basket/ADD_REQUEST', addRequest)]);
