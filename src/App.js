import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WithChluServiceNode from './components/WithChluServiceNode'
import EventLog from './components/EventLog'

const ChluEventLog = WithChluServiceNode(EventLog)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ChluEventLog />
      </div>
    );
  }
}

export default App;
