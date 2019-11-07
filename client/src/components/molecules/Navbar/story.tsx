import React from 'react';
import { storiesOf } from '@storybook/react';

import Navbar from '.';
import { Container } from '../../layouts';
import { Icon, NavLink } from '../../atoms';

storiesOf('NavBar', module).add('navbar', () => (
  <Container>
    <Navbar.Root>
      <NavLink to="/">
        <Icon icon="logo" />
      </NavLink>
      <Navbar.Menu>
        <Navbar.Begin>
          <NavLink to="/">Place 1</NavLink>
          <NavLink to="/place-1">Place 2</NavLink>
        </Navbar.Begin>
        <Navbar.Middle>
          <NavLink to="/place-3">Place 3</NavLink>
          <NavLink to="/place-4">Place 4</NavLink>
        </Navbar.Middle>
        <Navbar.End>
          <NavLink to="/place-5">Place 5</NavLink>
          <NavLink to="/place-6">Place 6</NavLink>
        </Navbar.End>
      </Navbar.Menu>
    </Navbar.Root>
  </Container>
));
