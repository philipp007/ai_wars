import React, { Component } from 'react';
import './game.css';
import TitleScreen from './menu/titleScreen';
import Menu from './menu/menu';
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
    }

    getMenuItems() {
        const menuItems = [];
        menuItems.push({ id: 1, name: "Train", selected: true });
        menuItems.push({ id: 2, name: "Play", selected: false });
        menuItems.push({ id: 3, name: "Exit", selected: false });
        return menuItems;
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
        const timeDelta = currentTime - previousTime;
        const fps = 1000 / timeDelta;       

        if (timeDelta <= this.fpsLimit) {
            requestAnimationFrame(() => { this.update(previousTime) });
            return;
        }

        previousTime = currentTime;

        const keys = this.input.pressedKeys;

        if (this.state.gameState === GameState.StartScreen) {
            this.mainMenu.update(keys, timeDelta);
        }
        
        requestAnimationFrame(() => { this.update(currentTime) });
    }

    render() {
        return (
            <div>
                {this.state.gameState === GameState.StartScreen && <TitleScreen />}
                {this.state.gameState === GameState.StartScreen && <Menu onRef = { ref => (this.mainMenu = ref) } menuItems = { this.getMenuItems() } />}
                <canvas ref="canvas"
                    width={this.state.screen.width * this.state.screen.ratio}
                    height={this.state.screen.height * this.state.screen.ratio}
                />
            </div>
        );
    }
}