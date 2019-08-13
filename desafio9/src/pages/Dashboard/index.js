import React from "react";
import {useEffect} from 'react';
import {MdChevronRight, MdAddCircleOutline} from 'react-icons/md'
import { Link } from 'react-router-dom'


import {Container, Content, Scroll} from './styles'
import api from "~/services/api";
export default function Dashboard() {

  useEffect(() => {

    async function loadMeetups() {

      const response = await api.get('/meetups')

      console.log(response)
    } 

    loadMeetups();

  }, [])

  return (
    <Container>
      <Content>
        <div>
        <h1>Meus meetups</h1>
        <Link to="/new"><MdAddCircleOutline /> Novo meetup</Link>
        </div>
       

        <ul>
          <Scroll>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
          <li><strong>Meetup de React Native</strong><time>24 de junho, as 20h</time> <MdChevronRight /></li>
         

          </Scroll>
         

        </ul>
      </Content>
    </Container>
  );
}
