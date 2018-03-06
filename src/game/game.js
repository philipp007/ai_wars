import React, { Component } from 'react';
import './game.css';
import TitleScreen from './menu/titlescreen'

const GameState = {    
    StartScreen: 0,
    Playing: 1,
    GameOver: 2
};

export default class Game extends Component {
  constructor(args) {
    super();
    this.state = {
      screen: {
        width: args.width,
        height: args.height,
        ratio: args.ratio
      },
      gameState: GameState.StartScreen,
    };

    this.fpsLimit = 30;
  }

  render() {
    return (
      <div>
        {this.state.gameState === GameState.StartScreen && <TitleScreen />}
        <canvas ref="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
      </div>
    );
  }
}