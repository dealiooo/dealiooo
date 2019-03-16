import React from "react";
import Navbar from "react-bulma-components/lib/components/navbar";
import Heading from "react-bulma-components/lib/components/heading";
import header_logo from "./header_logo.png";
import { Auth } from "./../../api";

const NavigationBar = ({ title, userName }) => {
  const logout = () => {
    Auth.postLogout().then(result => {
      if (result.error) {
        console.log("error on logout");
      }
      if (result.ok) {
        window.location = "/login";
      }
    });
  };

  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item className="is-paddingless" renderAs="a" href="/login">
          <img src={header_logo} alt="logo" />
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="#">Dealiooo</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container>
          <Navbar.Item renderAs="div">
            <Heading size={3}>{title}</Heading>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <Navbar.Item renderAs="div" className="has-dropdown is-hoverable">
            <Navbar.Link>{userName}</Navbar.Link>
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
