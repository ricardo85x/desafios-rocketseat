import React, { useState}  from "react";
import {useEffect} from 'react';
import {MdChevronRight, MdAddCircleOutline} from 'react-icons/md'
import { Link, Redirect } from 'react-router-dom'


import {Container, Content, Scroll} from './styles'
import api from "~/services/api";
import history from "~/services/history";
export default function Dashboard() {

  const [ meetups, setMeetups] = useState([])
  useEffect(() => {

    async function loadMeetups() {

      const response = await api.get('/meetups')

      setMeetups(response.data)

      console.log(response)
    } 

    loadMeetups();

  }, [])

  function handleEditLink(id_meetup) {
    history.push(`/info/${id_meetup}`)
  }

  return (
    <Container>
      <Content>
        <div>
        <h1>Meus meetups</h1>
        <Link to="/new"><MdAddCircleOutline /> Novo meetup</Link>
        </div>
       

        <ul>
          <Scroll>

            { meetups.map( meetup => (

              <li key={String(meetup.id)} onClick={() => handleEditLink(meetup.id)} >
                <strong>{meetup.title}</strong>
                <time>{meetup.date}</time> 
                <MdChevronRight />
              </li>

            ))}
          
          </Scroll>
         

        </ul>
      </Content>
    </Container>
  );
}
