import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PerfectScrollbar from 'perfect-scrollbar';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Game as GameAPI } from '../../api';

class ChatLog extends Component {
  constructor(props) {
    super(props);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.props.socket.on(this.props.channel, this.onMessageReceived);
    this.state = {
      // 36 = chatInput
      // 52 = navBar
      // 15 = componentPaddings
      // 2 = smoother
      height: props.height - 36 - 15 - 52 - 2,
      log: []
    };
  }

  componentDidMount() {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
    if (this.props.gameId) {
      GameAPI.getGameChat(this.props.gameId).then(log => {
        this.setState({ log: log.map(e => e.message) });
      });
    }
  }

  componentWillReceiveProps = props => {
    this.setState({
      height: props.height - 36 - 15 - 52 - 2
    });
  };

  componentDidUpdate(_) {
    ReactDOM.findDOMNode(this).scrollTop = ReactDOM.findDOMNode(
      this
    ).scrollHeight;
    this.ps.update();
  }

  onMessageReceived(message) {
    this.setState({
      log: this.state.log.concat(message)
    });
  }

  render() {
    return (
      <div
        className="box"
        style={{
          wordWrap: 'break-word',
          minHeight: `${this.state.height}px`,
          maxHeight: `${this.state.height}px`
        }}
      >
        {this.state.log.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
    );
  }
}

export default ChatLog;
