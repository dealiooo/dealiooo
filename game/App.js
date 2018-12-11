import React, { Component } from 'react';
import game from './game';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.state = {
      generalLog: [],
      playerLog: [],
      optionsLog: [],
      input: ''
    };
    game.start();
  }

  updateLog = logUpdate => {
    this.updateGeneralLog();
    this.updatePlayerLog();
    this.updateOptionsLog(logUpdate);
  };

  updateGeneralLog(prompt = null) {
    let log = [];
    if (prompt) {
      const newPrompt = game.get_prompt().general_info + prompt;
      newPrompt.split('\n').map(line => log.push(line));
    } else {
      game
        .get_prompt()
        .general_info.split('\n')
        .map(line => log.push(line));
    }
    this.setState({ generalLog: log });
  }

  updatePlayerLog() {
    let log = [[], []];
    let playerInfoList = game.get_prompt().player_info;
    playerInfoList.map((playerInfoString, i) =>
      playerInfoString.split('\n').map(line => log[i].push(line))
    );
    this.setState({ playerLog: log });
  }

  updateOptionsLog(prompt = null) {
    let log = [];
    if (prompt) {
      const newPrompt = game.get_prompt().options_info + prompt;
      newPrompt.split('\n').map(line => log.push(line));
    } else {
      game
        .get_prompt()
        .options_info.split('\n')
        .map(line => log.push(line));
    }
    this.setState({ optionsLog: log });
  }

  componentDidMount = () => {
    this.updateLog();
  };

  onChange(event) {
    this.setState({ input: event.target.value });
  }

  onEnter(event) {
    event.preventDefault();
    this.updateLog(game.input(this.state.input));
    this.setState({ input: '' });
  }

  onEndTurnSubmit = event => {
    event.preventDefault();
    this.updateLog(game.on_end_turn());
  };

  onLeaveGameSubmit = event => {
    event.preventDefault();
    this.updateLog(game.on_leave_game());
  };

  stylize = (message, i) => {
    if (message.indexOf('Current Turn:') > -1) {
      return (
        <div key={i} className="current-turn">
          <p className="message">{message}</p>
        </div>
      );
    } else if (
      message.indexOf('🏦') > -1 ||
      message.indexOf('✌️') > -1 ||
      message.indexOf('🏢') > -1 ||
      message.indexOf('🚴') > -1 ||
      message.indexOf('🏠') > -1
    ) {
      return (
        <div key={i} className="field">
          <p className="message">{message}</p>
        </div>
      );
    } else {
      return (
        <p key={i} className="message">
          {message}
        </p>
      );
    }
  };

  render() {
    const { generalLog, playerLog, optionsLog } = this.state;

    let genLog = generalLog.map((message, i) => (
      <div key={i}>{this.stylize(message)}</div>
    ));

    let pLog = playerLog.map((p, i) => {
      return (
        <div key={i} className="column">
          <div>{p.map((message, j) => this.stylize(message, j))}</div>
        </div>
      );
    });

    let optsLog = optionsLog.map((message, i) => (
      <div key={i}>{this.stylize(message)}</div>
    ));

    return (
      <div className="container">
        <div className="row">
          {pLog}
          <div className="column">
            <div className="general_log">{genLog}</div>
            <div className="inputs">
              {optsLog}
              <form onSubmit={this.onEnter}>
                <input
                  type="text"
                  onChange={this.onChange}
                  value={this.state.input}
                />
                <input type="submit" value="Enter" />
              </form>
              <form onSubmit={this.onEndTurnSubmit}>
                <button type="submit">end turn</button>
              </form>
              <form onSubmit={this.onLeaveGameSubmit}>
                <button type="submit">leave game</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
