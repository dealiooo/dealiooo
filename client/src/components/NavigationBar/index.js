import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import header_logo from './header_logo.png';

const NavigationBar = ({ title }) => {
  // TODO:
  const isAuthenticated = null;

  return (
    <Navbar color="success" className="is-fullhd">
      <Navbar.Brand>
        <Navbar.Item href="/login">
          <div style={{ width: 160 }}>
            <Image src={header_logo} size="5by1" />
          </div>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="#">Company Name</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container>
          <Navbar.Item renderAs="div">
            <Heading size={3}>{title}</Heading>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          {isAuthenticated ? (
            <Navbar.Item className="has-dropdown is-hoverable">
              <Navbar.Link>Username</Navbar.Link>
              <Navbar.Dropdown className="is-right">
                <Navbar.Item value="item">Logout</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
          ) : (
            <Button>Register</Button>
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default NavigationBar;
