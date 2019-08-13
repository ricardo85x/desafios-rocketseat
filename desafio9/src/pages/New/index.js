import React from "react";
import {MdCameraAlt, MdAddCircleOutline} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Input, Textarea } from '@rocketseat/unform'

import {Container, FormContainer, ImageContainer} from './styles'
import api from "~/services/api";
export default function New() {



  return (
    <Container>
      <FormContainer>
        <ImageContainer>
          <MdCameraAlt />
          <strong>Selecionar Imagem</strong>
        </ImageContainer>

        <Input name="file" type="file" />

        <Input name="title" placeholder="Titulo do Meeetup" />
        
        <Textarea name="description" placeholder="Descrição" rows={6} />

        <Input name="date" placeholder="data do meetup" />

        <Input name="location" placeholder="Localização" />
        
       
        <button> Salvar meetup</button>

       
      </FormContainer>

    </Container>
  );
}
