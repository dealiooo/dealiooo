import React, { Component } from 'react';

import Button from 'react-bulma-components/lib/components/button';
import {
  Control,
  Field,
  Input
} from 'react-bulma-components/lib/components/form';
import Modal from 'react-bulma-components/lib/components/modal';
import Section from 'react-bulma-components/lib/components/section';
import api from '../../../api';
import Container from 'react-bulma-components/lib/components/container/container';
import Columns from 'react-bulma-components/lib/components/columns/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Banner from '../../../components/Banner';
class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    modal_display: false,
    modal_message: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    api
      .postRegister(this.state.name, this.state.email, this.state.password)
      .then(result => {
        if (result.error) {
          this.setState({ modal_message: result.error.errors[0].message });
          this.setState({ modal_display: true });
        } else {
          window.location = '/main-lobby';
        }
      });
  };

  onModalClick = event => {
    this.setState({ modal_display: false });
  };

  componentWillMount() {
    api.getRegister().then(response => {
      if (response.ok) {
        window.location = '/main-lobby';
      }
    });
  }

  render() {
    return (
      <Container className="is-fullhd">
        <Banner />
        <Modal
          show={this.state.modal_display}
          onClose={this.onModalClick}
          closeOnEsc={true}
          closeOnBlur={true}
        >
          <Modal.Content
            style={{ backgroundColor: 'white' }}
            onClick={this.onModalClick}
          >
            <Section className="has-text-centered has-text-danger is-size-4">
              {this.state.modal_message}
            </Section>
          </Modal.Content>
        </Modal>
        <form onSubmit={this.onSubmit}>
          <Columns className="is-centered">
            <Columns.Column className="is-3">
              <Heading className="has-text-centered has-text-black">
                Register
              </Heading>
              <Field>
                <Control className="control-padding-vertical">
                  <Input
                    name="name"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.name}
                    placeholder="Type your in-game name"
                  />
                </Control>
              </Field>

              <Field>
                <Control>
                  <Input
                    name="email"
                    type="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    placeholder="Type your email"
                  />
                </Control>
              </Field>

              <Field>
                <Control>
                  <Input
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    placeholder="Type your password"
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Button className="is-info is-fullwidth">Send</Button>
                </Control>
              </Field>
            </Columns.Column>
          </Columns>
        </form>
      </Container>
    );
  }
}

export default Register;
