import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import api from '~/services/api';

import {updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
    try {
        const {name, email, ...rest} = payload.data;

        const profile = {
            name,
            email,
            ...(rest.oldPassword ? rest : {}),
        };

        yield call(api.put, '/users', profile)

       
        Alert.alert("Cadastro atualizado");


  


    } catch (e) {
        yield put(updateProfileFailure());
        Alert.alert(e.response.data.msg[0]);
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
