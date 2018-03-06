import React, { Component } from 'react';
import './App.css';
import Game from './game/game';

const width = window.innerWidth * 0.6;
const height = window.innerHeight;
const ratio = window.devicePixelRatio || 1;

class App extends Component {
  render() {    
    return (
      <div>     
        <Game width={ width } height={ height } ratio = { ratio }/>
      </div>
    );
  }
}

export default App;
