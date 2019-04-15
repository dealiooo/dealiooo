import React, { Component } from "react";
import Button from "react-bulma-components/lib/components/button";
import Section from "react-bulma-components/lib/components/section";
import {
  Control,
  Field,
  Label,
  Select
} from "react-bulma-components/lib/components/form";

import "./Cards/cards";
import { CardPhoto, EmptyCardPhoto } from "./Cards/cards";

class GameSideDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0
    };
  }

  handleOptionChanged = event => {
    this.setState({
      option: event.target.value
    });
  };

  onPromptSubmit = event => {
    event.preventDefault();
    this.props.onPromptSubmit(this.state.option);
    this.setState({ option: 0 });
  };

  render() {
    const {
      activeHandCard,
      onEndTurn,
      onForfeit,
      generalInfo,
      promptsInfo
    } = this.props;

    return (
      <Section>
        <Section>
          {activeHandCard ? (
            <CardPhoto card={activeHandCard} />
          ) : (
            <EmptyCardPhoto />
          )}
        </Section>
        <Section style={{ padding: "12px" }}>
          <GeneralInfo {...generalInfo} />
        </Section>
        <Section style={{ padding: "12px" }}>
          <Prompt
            promptsInfo={promptsInfo}
            value={this.state.option}
            onChange={this.handleOptionChanged}
            onPromptSubmit={this.onPromptSubmit}
          />
        </Section>
        <Section style={{ padding: "12px" }}>
          <Button onClick={onEndTurn}>End Turn</Button>
          <Button onClick={onForfeit}>Forfeit</Button>
        </Section>
      </Section>
    );
  }
}

const GeneralInfo = ({ turnCount, currentPlayer, cardsPlayed, deckCount }) => (
  <>
    <p>Turn: {turnCount}</p>
    <p>Current Player: {currentPlayer}</p>
    <p>Cards Played: {cardsPlayed}</p>
    <p>Deck Count: {deckCount}</p>
  </>
);

const Prompt = ({ promptsInfo, value, onChange, onPromptSubmit }) => (
  <>
    <p>Prompt</p>
    <p>{promptsInfo.promptMessage}</p>
    <p>{promptsInfo.promptPlayer.id}</p>
    <form onSubmit={onPromptSubmit}>
      <Field>
        <Label>Options:</Label>
        {promptsInfo.options ? (
          <Select value={value} onChange={onChange}>
            {promptsInfo.options.map((option, i) => (
              <option key={i} value={i}>
                {option}
              </option>
            ))}
          </Select>
        ) : (
          <input onChange={onChange} />
        )}
        <Field>
          <Control>
            <Button className="is-info is-fullwidth">Send</Button>
          </Control>
        </Field>
      </Field>
    </form>
  </>
);

export default GameSideDisplay;
