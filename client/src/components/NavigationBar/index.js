import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Navbar from 'react-bulma-components/lib/components/navbar';

const NavigationBar = () => {
  // TODO:
  const isAuthenticated = null;

  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item href="/">
          <img src="/path/to/logo" alt="logo" />
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="#">Company Name</Navbar.Item>
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
