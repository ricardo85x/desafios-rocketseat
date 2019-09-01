import {takeLatest, call, put, all, delay} from 'redux-saga/effects';
import {Alert} from 'react-native';

import api from '~/services/api';

import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
    try {
        const {email, password} = payload;
        const response = yield call(api.post, '/sessions', {
            email,
            password,
        });
        const {user, token} = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield delay(3);
        yield put(signInSuccess(token, user));


        // history.push('/dashboard');
    } catch (e) {
        yield put(signFailure());
        // Alert.alert('Falha na autenticação', 'verifique seus dados');
        Alert.alert('Falha na autenticação', e.response.data.error);
    }
}


export function* signUp({payload}) {
    try {
        const {name, email, password} = payload;

        yield call(api.post, '/users', {
            name,
            email,
            password,
        });

        Alert.alert('Usuario criado com sucesso ', 'Faça o login');

    } catch (e) {
        Alert.alert('Falha no cadastro ', e.response.data.error);

        yield put(signFailure());
    }
}

export function setToken({payload}) {
    if (!payload) return;

    const {token} = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
