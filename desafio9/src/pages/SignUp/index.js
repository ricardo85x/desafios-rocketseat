import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import Logo from '~/assets/M.svg'

import { signUpRequest } from "~/store/modules/auth/actions";

export default function SignUp() {

    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password));
    }
  return (
    <>
      <div>
        <img src={Logo} alt="MeetUp" />
        <Form onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Criar conta</button>

        <Link to="/">Ja tenho login</Link>

        </Form>
      </div>
    </>
  );
}
