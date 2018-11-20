import React, { Component, Fragment } from 'react';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';
import Modal from 'react-bulma-components/lib/components/modal';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';

import rules from './rules';

class ModalWithToggle extends React.Component {
  state = {
    toggled: false
  };

  toggle = () => this.setState({ toggled: !this.state.toggled });

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>{this.props.toggleName}</Button>
        <Modal
          show={this.state.toggled}
          onClose={this.toggle}
          {...this.props.modal}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

class GameRules extends Component {
  render() {
    return (
      <ModalWithToggle
        toggleName="Game Rules"
        modal={{ closeOnBlur: true, showClose: false }}
      >
        <Modal.Content className="has-background-light">
          <Section>
            <Heading className="has-text-centered">Game Rules</Heading>
            {Object.keys(rules).map(rule => (
              <Box>
                <Heading subtitle>{rule}</Heading>
                <ul>
                  {rules[rule].map(value => (
                    <li>{value}</li>
                  ))}
                </ul>
              </Box>
            ))}
          </Section>
        </Modal.Content>
      </ModalWithToggle>
    );
  }
}

export default GameRules;
