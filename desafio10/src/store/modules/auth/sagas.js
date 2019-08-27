import {takeLatest, call, put, all, delay} from 'redux-saga/effects';
// import {toast} from 'react-toastify';
import {Alert} from 'react-native';

// import history from '~/services/history';
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

        console.tron.log('papacapim');

        // history.push('/dashboard');
    } catch (e) {
        yield put(signFailure());
        Alert.alert('Falha na autenticação', 'verifique seus dados');
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

        // history.push('/');
    } catch (e) {
        Alert.alert('Falha no cadastro ', 'Verifique seus dados');

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

// export function signOut() {
//     // history.push('/');
// }

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),

    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    // takeLatest('@auth/SIGN_OUT', signOut),
]);
