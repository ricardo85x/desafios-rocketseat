import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {MdAddCircleOutline} from 'react-icons/md'
import {Form, Input, FileInput, useField } from '@rocketseat/unform'
import * as Yup from "yup";

import {Container} from './styles'

import InputDateTime from './InputDateTime'

import {createMeetupRequest} from '~/store/modules/meetup/actions'

import ImagePreviewInput from './ImagePreviewInput'

const schema = Yup.object().shape({

  banner: Yup.number().required('Escolha do banner é obrigatorio'),
  title: Yup.string().required('Titulo é obrigatório'),
  description: Yup.string().required('Descriçao é obrigatório'),
  // date: Yup.date().min(new Date(),'Não é meetup no passado') .required('Data é obrigatório'),
  date: Yup.date().required('Data é obrigatório'),
  location: Yup.string().required('Local é obrigatório'),
  
});

export default function New() {

  const dispatch = useDispatch()
  function handleSubmit(data) {
      dispatch(createMeetupRequest(data));
  }

  let meetup = {}

  // const ref = useRef(null);
  // const { fieldName, registerField, defaultValue, error } = useField('date');
  // const [selected, setSelected] = useState(defaultValue);

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: ref.current,
  //     path: 'dataset.date',
  //   });
  // }, [ref.current, fieldName]);

  return (
    <Container>
      <Form schema={schema}  initialData={meetup} onSubmit={handleSubmit}>

          <ImagePreviewInput name="banner" id="banner" />

          <Input name="title" placeholder="Titulo do Meeetup" />
        
          <Input multiline  name="description" placeholder="Descrição do meetup" rows={6} />

          <InputDateTime id="date" name="date" />

          <Input name="location" placeholder="Localização" />
        <div className="containerButton">
          <div>
            <MdAddCircleOutline />
            <button type="submit"> Salvar meetup</button>

          </div>
          
        </div>

      </Form>

    </Container>
  );
}
