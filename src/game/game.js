import React, { Component } from 'react';
import './game.css';
import TitleScreen from './menu/titleScreen';
import MainMenu from './menu/mainMenu';
import InputManager from './inputManager';

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

        this.input = new InputManager();
        this.previousDelta = 0;
        this.fpsLimit = 1000 / 30;
        this.msSinceLastMenuUpdate = 0;
        this.menuUpdateAfterMs = 1000;
    }

    componentDidMount() {
        this.input.bindKeys();
        requestAnimationFrame(() => { this.update(Date.now()) });
    }

    componentWillUnmount() {
        this.input.unbindKeys();
    }

    update(previousTime) {
        const currentTime = Date.now();
        const delta = currentTime - previousTime;
        const fps = 1000 / delta;       

        if (delta <= this.fpsLimit) {
            requestAnimationFrame(() => { this.update(previousTime) });
            return;
        }

        this.msSinceLastMenuUpdate += delta;
        previousTime = currentTime;

        const keys = this.input.pressedKeys;

        if (this.state.gameState === GameState.StartScreen) {
            this.msSinceLastMenuUpdate = 0;
            console.log("now");
            if (keys.down || keys.up) {
                this.mainMenu.update(keys);
            }
        }
        
        requestAnimationFrame(() => { this.update(currentTime) });
    }

    render() {
        return (
            <div>
                {this.state.gameState === GameState.StartScreen && <TitleScreen />}
                {this.state.gameState === GameState.StartScreen && <MainMenu onRef = { ref => (this.mainMenu = ref) } input = { this.input }/>}
                <canvas ref="canvas"
                    width={this.state.screen.width * this.state.screen.ratio}
                    height={this.state.screen.height * this.state.screen.ratio}
                />
            </div>
        );
    }
}