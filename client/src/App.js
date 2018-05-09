import React, { Component } from 'react';
import MatchStatsTableContainer from './containers/MatchStatsTableContainer'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <MatchStatsTableContainer />
      </div>
    );
  }

}

export default App;
