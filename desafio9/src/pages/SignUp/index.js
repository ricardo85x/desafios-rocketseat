import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import Logo from '~/assets/M.svg'

import { signUpRequest } from "~/store/modules/auth/actions";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("campo email obrigatório"),
  password: Yup.string()
    .min(6, "senha com no minimo 6 caracteres")
    .required("Campo email com no minimo 6 caracteres obrigatório"),
  name: Yup.string()
    .min(3, "nome com no minimo 3 caracteres")
    .required("campo nome obrigatório com no minimo 3 caracteres")
});

export default function SignUp() {

    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password));
    }
  return (
    <>
      <div>
        <img src={Logo} alt="MeetUp" />
        <Form schema={schema} onSubmit={handleSubmit}>
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
