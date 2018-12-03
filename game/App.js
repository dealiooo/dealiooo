import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import game from './game';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.state = {
      log: [],
      input: ''
    };
  }

  componentDidMount = () => {
    this.startGame();
    let temp = this.state.log;
    game
      .init_prompt()
      .split('\n')
      .map(line => temp.push(line));
    this.setState({
      log: temp
    });
  };

  onChange(event) {
    this.setState({ input: event.target.value });
  }

  onEnter(event) {
    event.preventDefault();
    let temp = this.state.log;
    temp[temp.length - 1] += this.state.input;
    game
      .input(this.state.input)
      .split('\n')
      .map(line => temp.push(line));
    this.setState({
      log: temp,
      input: ''
    });
  }

  startGame = () => {
    game.start();
  };

  render() {
    let log = this.state.log.map((message, i) => <div key={i}>{message}</div>);
    return (
      <div>
        <div>MonopolyDeal</div>
        <div className="log">{log}</div>
        <form onSubmit={this.onEnter}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.input}
            placeholder="type input here"
          />
          <input type="submit" value="Enter" />
        </form>
      </div>
    );
  }
}

export default App;
