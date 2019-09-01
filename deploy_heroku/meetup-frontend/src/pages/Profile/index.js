import React from "react";
import { Form, Input } from "@rocketseat/unform";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileRequest } from "~/store/modules/user/actions";
import { MdAddCircleOutline } from 'react-icons/md'


import { Container } from "./styles";

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }


  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="nome completo" />
        <Input name="email" placeholder="Email" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />
        <div>
          <button type="submit"> 
            <MdAddCircleOutline size={15} color="#fff" /> 
            <span>Atualizar perfil</span>
          </button>
        </div>
      </Form>
  
    </Container>
  );
}
