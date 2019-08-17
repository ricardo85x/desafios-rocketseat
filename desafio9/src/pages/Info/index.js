import React, { useState}  from "react";
import {useEffect} from 'react';
import {MdPlace, MdAddCircleOutline, MdEvent, MdDeleteForever} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch  } from 'react-redux'
import { deleteMeetupRequest} from '~/store/modules/meetup/actions'


import {Container, Content, Description, BoxImage, DateLocationContainer} from './styles'
import api from "~/services/api";
export default function Dashboard({match}) {

  const [meetup, setMeetup] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    async function loadMeetup(id) {

      const response = await api.get(`/meetups`)

      setMeetup(response.data.find(item => item.id === parseInt(id)))

      console.log(response.data)
    }

    loadMeetup(match.params.id)

  }, [])

  function handleDelete(){
    dispatch(deleteMeetupRequest(match.params.id))
  }


  return (
    <Container>

      {meetup && (
        <Content>
          <div>
            <h1>{meetup.title}</h1>
            <Link to={`/edit/${meetup.id}`}><MdAddCircleOutline /><span>EDITAR</span></Link>
            <button onClick={handleDelete}> <MdDeleteForever /><span>CANCELAR</span> </button>
          </div>


          <BoxImage>
             <img  src={meetup.banner.url} alt="" />
          </BoxImage>

          <Description>
            {meetup.description}
          </Description>

          <DateLocationContainer>

            <div>
              <MdEvent size={13} color="#CBCBCB99" />
              <span>{meetup.date}</span>
            </div>

            <div>
              <MdPlace size={13} color="#CBCBCB99" />
              <span>{meetup.location}</span>
            </div>

          </DateLocationContainer>

        
        </Content>

      )}
      
    </Container>
  );
}
