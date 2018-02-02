import React, { Component } from 'react';
import WithChluServiceNode from './components/WithChluServiceNode'
import EventLog from './components/EventLog'

const ChluEventLog = WithChluServiceNode(EventLog)

class App extends Component {
  render() {
    return (
      <div>
        <ChluEventLog />
      </div>
    );
  }
}

export default App;
