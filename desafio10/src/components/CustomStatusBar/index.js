import React, { Component } from 'react';
import { Container, Logo } from './styles';

import logo from "~/assets/M.png"


export default class CustomStatusBar extends Component {
  render() {
    return <Container>
        <Logo source={logo} />

    </Container>;
  }
}
