import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import Box from 'react-bulma-components/lib/components/box';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class ChatLog extends Component {
  constructor(props) {
    super(props);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.props.socket.on(this.props.channel, this.onMessageReceived);
    this.state = {
      log: []
    };
  }

  componentDidMount() {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate(_) {
    this.ps.update();
  }

  onMessageReceived(message) {
    this.setState({
      log: this.state.log.concat(message)
    });
  }

  render() {
    return (
      <Box>
        {this.state.log.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </Box>
    );
  }
}

export default ChatLog;
