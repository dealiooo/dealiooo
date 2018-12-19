import React, { Component } from 'react';

import Image from 'react-bulma-components/lib/components/image';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import {
  Control,
  Field,
  Label,
  Select
} from 'react-bulma-components/lib/components/form';

class GeneralGameInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      option: null
    };
  }

  onOptionChange = evt => {
    this.setState({
      option: evt.target.value
    });
  };

  render() {
    const {
      cardImage, // TODO:
      onEndTurn, // TODO:
      onForfeit, // TODO:,
      onPromptOptionsSubmit, // TODO:
      general_info,
      prompts_info
    } = this.props;

    return (
      <Section>
        <Section>
          <Image
            src={process.env.PUBLIC_URL + '/cards/action/dealbreaker.jpg'}
          />
        </Section>
        <Section style={{ padding: '12px' }}>
          <p>Turn: {general_info.turnCount}</p>
          <p>Current Player: {general_info.currentPlayer}</p>
          <p>Cards Played: {general_info.cardsPlayed}</p>
        </Section>
        <Section style={{ padding: '12px' }}>
          <p>Prompt</p>
          <p>{prompts_info.promptMessage}</p>
          <p>{prompts_info.promptPlayer}</p>
          <form onSubmit={onPromptOptionsSubmit}>
            <Field>
              <Label>Options:</Label>
              {prompts_info.options ? (
                <Select
                  onChange={this.onOptionChange}
                  value={this.state.option}
                >
                  {prompts_info.options.map(option => {
                    return <option>{option}</option>;
                  })}
                </Select>
              ) : (
                <input onChange={this.onOptionChange} />
              )}
              <Field>
                <Control>
                  <Button className="is-info is-fullwidth">Send</Button>
                </Control>
              </Field>
            </Field>
          </form>
        </Section>
        <Section style={{ padding: '12px' }}>
          <Button onEndTurn={onEndTurn}>End Turn</Button>
          <Button onForfeit={onForfeit}>Forfeit</Button>
        </Section>
      </Section>
    );
  }
}

export default GeneralGameInfo;
