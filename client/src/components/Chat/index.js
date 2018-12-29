import React, { Component } from 'react';

import ChatLog from './ChatLog';
import ChatInput from './ChatInput';

class Chat extends Component {
  render() {
    const { socket, api, roomId, channel } = this.props;
    return (
      <>
        <ChatLog socket={socket} channel={channel} />
        <ChatInput roomId={roomId} api={api} />
      </>
    );
  }
}

export default Chat;
