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

// import { NotificationConsumer } from '../../contexts/NotificationContext';

class GeneralGameInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0
    };
  }

  onOptionChange = evt => {
    this.setState({
      option: evt.target.value
    });
  };

  onPromptOptionsSubmit = evt => {
    evt.preventDefault();
    this.props.onPromptOptionsSubmit(this.state.option);
    this.setState({ option: 0 });
  };

  render() {
    const {
      card,
      onEndTurn,
      onForfeit,
      general_info,
      prompts_info
    } = this.props;

    console.log('PROMPTS_INFO_!', prompts_info);

    return (
      <Section>
        <Section>
          <Image
            src={
              process.env.PUBLIC_URL + `/cards/${card.type}/${card.name}.jpg`
            }
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
          <p>{prompts_info.promptPlayer.id}</p>
          <form onSubmit={this.onPromptOptionsSubmit}>
            <Field>
              <Label>Options:</Label>
              {prompts_info.options ? (
                <Select
                  onChange={this.onOptionChange}
                  value={this.state.option}
                >
                  {prompts_info.options.map((option, i) => {
                    return <option key={i} value={i}>{option}</option>;
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
          <Button onClick={onEndTurn}>End Turn</Button>
          <Button onClick={onForfeit}>Forfeit</Button>
        </Section>
      </Section>
    );
  }
}

export default GeneralGameInfo;
