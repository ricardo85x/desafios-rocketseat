import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "~/services/api";

import { updateProfileSuccess, updateProfileFailure } from "./actions";

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = Object.assign(
      {
        name,
        email
      },
      rest.oldPassword ? rest : {}
    );

    const respose = yield call(api.put, "/users", profile);

    toast.success("Usuario atualizado com sucesso");

    yield put(updateProfileSuccess(respose.data));
  } catch (e) {
    yield put(updateProfileFailure());
    toast.error(`Erro ao atualizar o perfil`);
  }
}

export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
