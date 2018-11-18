import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import Box from 'react-bulma-components/lib/components/box';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class ChatLog extends Component {
  state = {
    log: [
      'user1: delete us',
      'user2: once socket',
      'user3: has been implemented',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re',
      're:re'
    ]
  };

  componentDidMount() {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate(prevProps) {
    this.ps.update();
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
