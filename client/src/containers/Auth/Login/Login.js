import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import {
  Control,
  Field,
  Input
} from 'react-bulma-components/lib/components/form';
import Modal from 'react-bulma-components/lib/components/modal';
import Section from 'react-bulma-components/lib/components/section';
import api from '../../../api';

class Login extends Component {
  state = {
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
    api.login(this.state.email, this.state.password).then(result => {
      console.log(result);
      if (result.error) {
        this.setState({
          modal_message: 'Invalid email & password combination'
        });
        this.setState({ modal_display: true });
      } else {
        window.location = '/main-lobby';
      }
    });
  };

  onModalClick = event => {
    this.setState({ modal_display: false });
  };

  render() {
    return (
      <Box>
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
              <Button className="is-info">Send</Button>
            </Control>
          </Field>
        </form>
      </Box>
    );
  }
}

export default Login;
