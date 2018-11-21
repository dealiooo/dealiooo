import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import Box from 'react-bulma-components/lib/components/box';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class ChatLog extends Component {
  constructor(props) {
    super(props);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.state = {
      log: []
    };
  }

  componentDidMount() {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
    this.props
      .register_handler({ on_message_received: this.onMessageReceived })
      .join({ room_id: this.props.room_id }, error => {
        if (error) {
          console.log(error);
        }
      });
  }

  componentDidUpdate(prevProps) {
    this.ps.update();
  }

  componentWillUnmount() {
    this.props.unregister_chat_handler();
  }

  onMessageReceived(message) {
    this.setState({
      log: this.state.log.concat(message.event)
    });
  }

  render() {
    return (
      <Box>
        {this.state.log.map((message, i) => (
          <p key={i}> {message} </p>
        ))}
      </Box>
    );
  }
}

export default ChatLog;
