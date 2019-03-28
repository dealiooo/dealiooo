import React, { Component } from 'react';

import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height
    }
  }

  componentWillReceiveProps = props => {
    this.setState({
      height: props.height
    })
  }

  render() {
    const { socket, api, roomId, channel} = this.props;
    return (
      <>
        <ChatLog socket={socket} channel={channel} height={this.state.height} />
        <ChatInput roomId={roomId} api={api} />
      </>
    );
  }
}

export default Chat;
