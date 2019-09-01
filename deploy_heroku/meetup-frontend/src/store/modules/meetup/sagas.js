import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from '~/services/history'

import { deleteMeetupFailure, deleteMeetupSuccess, updateMeetupSuccess, updateMeetupFailure, createMeetupSuccess, createMeetupFailure } from "./actions";

export function* updateMeetup({ payload }) {
  try {

    const { meetup_id } = payload

    const response = yield call(api.put, `/meetups/${meetup_id}`, payload.data)


    toast.success("Meetup Atualizado com sucesso");

    yield put(updateMeetupSuccess(response.data))

    history.push(`/info/${meetup_id}`)


  } catch (e) {
    console.log(e, payload)
    yield put(updateMeetupFailure());
    toast.error(e.response.data.error);
  }
}

export function* createMeetup({ payload }) {

  try {

    api.post('/meetups', payload.data).then(response => {
      toast.success("Meetup criado com sucesso");  
      put(createMeetupSuccess(response.data))
  
      history.push('/dashboard')
  
    }).catch(error => {
      toast.error(`Erro ao criar o meetup,${error.response.data.error}`);

    })

  } catch(e) {
    yield put(createMeetupFailure());
    toast.error(`Erro ao criar o meetup, verifique todos os campos`);
    console.log(e)
  }
}

export function* deleteMeetup({ payload }){


  try {

    const { meetup_id } = payload

    const response = yield call(api.get, `/meetups`)


    const findMeetup =  response.data.find(item => item.id === parseInt(meetup_id))


    if(findMeetup){

      yield call(api.delete, `/meetups/${meetup_id}`)

      yield put(deleteMeetupSuccess(response.data))
      toast.success("Meetup cancelado com sucesso");
      history.push(`/dashboard`)

    } else {
      yield put(deleteMeetupFailure());
      toast.error('Meetup nao encontrado');
    }


  } catch(e) {
    yield put(deleteMeetupFailure());
    toast.error(e.response.data.error);
  }
}

export default all([
  takeLatest("@meetup/UPDATE_REQUEST", updateMeetup),
  takeLatest("@meetup/CREATE_REQUEST", createMeetup),
  takeLatest("@meetup/DELETE_REQUEST", deleteMeetup)
]);
