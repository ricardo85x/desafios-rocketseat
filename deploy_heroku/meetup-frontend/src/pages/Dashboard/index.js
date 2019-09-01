import React, { useState}  from "react";
import {useEffect} from 'react';
import {MdChevronRight, MdAddCircleOutline} from 'react-icons/md'
import { Link, Redirect } from 'react-router-dom'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import {Container, Content, Scroll} from './styles'
import api from "~/services/api";
import history from "~/services/history";
export default function Dashboard() {

  const [ meetups, setMeetups] = useState([])
  useEffect(() => {

    async function loadMeetups() {

      const response = await api.get('/meetups')

      setMeetups(response.data.map(item => ({
        ...item,
        dateFormated: format(item.date,"DD \\de  MMMM, à\\s HH\\h", { locale: pt})
      })))

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
                <time>{meetup.dateFormated}</time> 
                <MdChevronRight />
              </li>

            ))}
          
          </Scroll>
         

        </ul>
      </Content>
    </Container>
  );
}
