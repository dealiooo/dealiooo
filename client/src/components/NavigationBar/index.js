import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Heading from 'react-bulma-components/lib/components/heading';
import header_logo from './header_logo.png';
import api from '../../api';

const NavigationBar = ({ title }) => {
  const logout = () => {
    api.postLogout().then(result => {
      if (result.error) {
        console.log('error on logout');
      }
      if (result.ok) {
        window.location = '/login';
      }
    });
  };

  return (
    <Navbar color="success">
      <Navbar.Brand>
        <Navbar.Item className="is-paddingless" renderAs="a" href="/login">
          <img src={header_logo} alt="" />
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="#">Monopoly Deal</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container>
          <Navbar.Item renderAs="div">
            <Heading size={3}>{title}</Heading>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <Navbar.Item renderAs="div" className="has-dropdown is-hoverable">
            <Navbar.Link>Username</Navbar.Link>
            <Navbar.Dropdown className="is-right">
              <Navbar.Item value="item" onClick={logout}>
                Logout
              </Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default NavigationBar;
