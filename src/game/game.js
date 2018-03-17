import React, { Component } from 'react';
import './game.css';
import TitleScreen from './menu/titleScreen';
import Menu from './menu/menu';
import InputManager from './inputManager';
import Player from './gameObjects/player';
import ShipView from './views/shipView';

const GameState = {
    StartScreen: 0,
    Train: 1,    
    Play: 2,
    GameOver: 3
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
            context: null
        };

        this.input = new InputManager();
        this.previousDelta = 0;
        this.fpsLimit = 1000 / 30;
        this.ships = [];
    }

    getMenuItems() {
        const menuItems = [];
        menuItems.push({ id: 1, name: "Train", selected: true, onOpen: () => this.changeGameState(GameState.Train) });
        menuItems.push({ id: 2, name: "Play", selected: false, onOpen: () => this.changeGameState(GameState.Play) });
        menuItems.push({ id: 3, name: "Exit", selected: false });
        return menuItems;
    }

    componentDidMount() {
        this.input.bindKeys();
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });

        requestAnimationFrame(() => { this.update(Date.now()) });
    }

    componentWillUnmount() {
        this.input.unbindKeys();
    }

    changeGameState(newState) {
        if (newState === GameState.Play || newState === GameState.Train) {
            this.initGame(newState);
        }

        this.setState({ gameState: newState });
    }

    initGame(state) {
        if (state === GameState.Play) {
            const player = new Player({ 
                position: {
                    x: this.state.screen.width / 2,
                    y: this.state.screen.height - 50
                }
            })

            const playerView = new ShipView({ player: player });

            this.ships.push(playerView);
        }
    }

    update(previousTime) {
        const currentTime = Date.now();
        const timeDelta = currentTime - previousTime;
        const fps = 1000 / timeDelta;       

        if (timeDelta <= this.fpsLimit) {
            requestAnimationFrame(() => { this.update(previousTime) });
            return;
        }

        this.resetContext(this.state.context);

        previousTime = currentTime;

        const keys = this.input.pressedKeys;

        if (this.state.gameState === GameState.StartScreen) {
            this.mainMenu.update(keys, timeDelta);
        }

        if (this.state.gameState === GameState.Play) {
            this.ships.forEach(ship => { ship.update(this.state, keys); ship.render(this.state); });
        }        
        
        requestAnimationFrame(() => { this.update(currentTime) });
    }

    resetContext(context) {
        context.save();
        context.scale(this.state.screen.ratio, this.state.screen.ratio);

        context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        context.globalAlpha = 1;
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