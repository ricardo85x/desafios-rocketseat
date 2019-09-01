import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {MdCameraAlt, MdAddCircleOutline} from 'react-icons/md'
import { Link } from 'react-router-dom'
import {Form, Input, FileInput, useField } from '@rocketseat/unform'
import * as Yup from "yup";

// import ReactDateTime from 'react-datetime'

import 'react-datetime/css/react-datetime.css'

import {Container, ImageContainer} from './styles'
import InputDateTime from './InputDateTime'

import api from "~/services/api";

import {updateMeetupRequest} from '~/store/modules/meetup/actions'



import ImagePreviewInput from './ImagePreviewInput'

const schema = Yup.object().shape({

  banner: Yup.number().required('Escolha do banner é obrigatorio'),
  title: Yup.string().required('Titulo é obrigatório'),
  description: Yup.string().required('Descriçao é obrigatório'),
  date: Yup.date().required('Data é obrigatório'),
  location: Yup.string().required('Local é obrigatório'),
  
});

export default function Edit({ match}) {

  const [meetup, setMeetup] = useState(null)
 
  useEffect(() => {
    async function loadMeetup(id) {

      const response = await api.get(`/meetups`)

      const findMeetup = response.data.find(item => item.id === parseInt(id));

      if (findMeetup){
        setMeetup(findMeetup)
      }

      console.log(response.data)
    }

    loadMeetup(match.params.id)

  }, [])


  const dispatch = useDispatch()
  function handleSubmit(data) {
      console.log(data);
      dispatch(updateMeetupRequest(data, match.params.id));
  }

  const [date, setDate] = useState(new Date())



  return (
    <Container>
      <Form schema={schema} name="preview_id" initialData={meetup} onSubmit={handleSubmit}>

        <ImagePreviewInput name="banner" id="banner" meetup={meetup} />


        <Input name="title" placeholder="Titulo do Meeetup" />
        
        <Input 
          onChange={(e) => setMeetup({...meetup, description: e.target.value})} 
          multiline  
          name="description" 
          placeholder="Descrição do meetup" 
          value={meetup? meetup.description: ''} 
          rows={6} 
        />

        {/* <Input name="date" placeholder="Data do meetup" /> */}
        <InputDateTime  initialData={meetup && meetup.date}  id="date" name="date" />



        <Input name="location" placeholder="Localização" />
        <div className="containerButton">
          <div>
            <MdAddCircleOutline />
            <button type="submit"> Atualizar meetup</button>

          </div>
          

        </div>

      </Form>

    </Container>
  );
}
