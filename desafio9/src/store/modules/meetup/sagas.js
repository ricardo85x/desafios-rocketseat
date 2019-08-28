import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "~/services/api";
import history from '~/services/history'

import { deleteMeetupFailure, deleteMeetupSuccess, updateMeetupSuccess, updateMeetupFailure, createMeetupSuccess, createMeetupFailure } from "./actions";

export function* updateMeetup({ payload }) {
  try {



    const { meetup_id } = payload

    const response = yield call(api.put, `/meetups/${meetup_id}`, payload.data)

    // console.tron.warn("DEBUG1", response)

    toast.success("Meetup Atualizado com sucesso");

    yield put(updateMeetupSuccess(response.data))

    history.push(`/info/${meetup_id}`)


  } catch (e) {
    console.log(e, payload)
    yield put(updateMeetupFailure());
    toast.error(`Erro ao atualizar o meetup`);
  }
}

export function* createMeetup({ payload }) {

  try {


    const response = yield call(api.post, '/meetups', payload.data)

    toast.success("Meetup criado com sucesso");

    console.tron.warn("DEBUG2", response)


    yield put(createMeetupSuccess(response.data))

    history.push('/dashboard')


  } catch(e) {
    yield put(createMeetupFailure());
    toast.error(`Erro ao criar o meetup, verifique todos os campos`);
    console.log(e)
    console.tron.error("ERRO!")
  }
}

export function* deleteMeetup({ payload }){

  const erroList = [
    'Meetup não encontrado',
    'Não é possivel apaga meetups que que ja ocorreram'
  ]
  let erroIndex = 0

  try {

    const { meetup_id } = payload

    const response = yield call(api.get, `/meetups`)

    console.log("ah va 12")
    if(response.status !== 200) {
      console.log("vai! 1")
      throw response;
    }

    const findMeetup =  response.data.find(item => item.id === parseInt(meetup_id))
    console.log("ah va 122")


    if(findMeetup){
      // depois checar se o meetup eh do usuario logado


      erroIndex++;
      const response_del = yield call(api.delete, `/meetups/${meetup_id}`)

      console.log("ah va 12334")

      if(response_del.status === 200) {
        yield put(deleteMeetupSuccess(response.data))
        toast.success("Meetup cancelado com sucesso");
        history.push(`/dashboard`)

      } else {

        console.log("vai! 2")

        throw response
      }
  

    } else {
      yield put(deleteMeetupFailure());
      toast.error(`Erro ao cancelar o meetup`);
    }



    // console.tron.warn("DEBUG1", response)

    


  } catch(e) {
    yield put(deleteMeetupFailure());
    toast.error(erroList[erroIndex]);
    console.log(e)
    console.tron.error("ERRO!")

  }
}

export default all([
  takeLatest("@meetup/UPDATE_REQUEST", updateMeetup),
  takeLatest("@meetup/CREATE_REQUEST", createMeetup),
  takeLatest("@meetup/DELETE_REQUEST", deleteMeetup)
]);
