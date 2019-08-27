import {takeLatest, call, put, all} from 'redux-saga/effects';
// import { toast } from "react-toastify";
import {Alert} from 'react-native';
import api from '~/services/api';

import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
    try {
        const {name, email, ...rest} = payload.data;

        const profile = {
            name,
            email,
            ...(rest.oldPassword ? rest : {}),
        };



        api.put('/users', profile).then(() => {
            Alert.alert('Usuario atualizado com sucesso')
        }).catch(error => {
            Alert.alert('Erro na atualização', error.response.data.msg[0])
            console.tron.warn(error.response.data.msg)
        })

        // const respose = yield call(api.put, '/users', profile);




        // Alert.alert('Usuario atualizado com sucesso');

        // yield put(updateProfileSuccess(respose.data));



    } catch (e) {
        yield put(updateProfileFailure());
        Alert.alert(`Erro ao atualizar o perfil`);
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
