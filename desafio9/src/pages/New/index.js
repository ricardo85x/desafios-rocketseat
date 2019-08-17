import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {MdCameraAlt, MdAddCircleOutline} from 'react-icons/md'
import { Link } from 'react-router-dom'
import {Form, Input, FileInput, useField } from '@rocketseat/unform'
import * as Yup from "yup";

// import ReactDateTime from 'react-datetime'

import 'react-datetime/css/react-datetime.css'

import {Container, ImageContainer} from './styles'
import api from "~/services/api";

import {createMeetupRequest} from '~/store/modules/meetup/actions'



import ImagePreviewInput from './ImagePreviewInput'

const schema = Yup.object().shape({

  preview_id: Yup.number().required('Escolha do banner é obrigatorio'),
  title: Yup.string().required('Titulo é obrigatório'),
  description: Yup.string().required('Descriçao é obrigatório'),
  date: Yup.date().required('Data é obrigatório'),
  location: Yup.string().required('Local é obrigatório'),
  
});

export default function New() {

  const dispatch = useDispatch()
  function handleSubmit(data) {
      console.log(data);
      dispatch(createMeetupRequest(data));
  }

  const [date, setDate] = useState(new Date())

  let meetup = {}

  return (
    <Container>
      <Form schema={schema} name="preview_id" initialData={meetup} onSubmit={handleSubmit}>

        <ImagePreviewInput id="banner" />

        <Input name="title" placeholder="Titulo do Meeetup" />
        
        <Input multiline  name="description" placeholder="Descrição do meetup" rows={6} />

        <Input name="date" placeholder="Data do meetup" />

        <Input name="location" placeholder="Localização" />
        <div>
          <div>
            <MdAddCircleOutline />
            <button type="submit"> Salvar meetup</button>

          </div>
          

        </div>

      </Form>

    </Container>
  );
}
