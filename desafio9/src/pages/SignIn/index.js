import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { Form, Input } from "@rocketseat/unform"
import Logo from '~/assets/M.svg'

import { signInRequest } from "~/store/modules/auth/actions";


export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }
  return (
    <>
      <div>
        <img src={Logo} alt="MeetUp" />
        <Form onSubmit={handleSubmit}>
            <Input name="email" type="email" placeholder="Digite seu e-mail" />
            <Input name="password" type="password" placeholder="Sua senha secreta" />
            <button type="submit">{loading ? "Carregando" : "Entrar"} </button>

            <Link to="/register">Criar sua conta gratis</Link>

        </Form>
      </div>
    </>
  );
}
