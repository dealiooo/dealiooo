import React, { Component } from "react";
import Hero from "react-bulma-components/lib/components/hero";
import Heading from "react-bulma-components/lib/components/heading";
import Container from "react-bulma-components/lib/components/container";
import Section from "react-bulma-components/lib/components/section";
import Button from "react-bulma-components/lib/components/button";

import "./NotFound.css";

class NotFound extends Component {
  render() {
    return (
      <div>
        <Section>
          <Hero className="is-fullheight">
            <Hero.Head />
            <Hero.Body>
              <Container className="has-text-centered">
                <Heading className="f-size">404</Heading>
                <Heading subtitle size={3}>
                  Page Not Found
                </Heading>
                <a href="/main-lobby">
                  <Button>Back to Main Lobby </Button>
                </a>
              </Container>
            </Hero.Body>
            <Hero.Footer />
          </Hero>
        </Section>
      </div>
    );
  }
}

export default NotFound;
