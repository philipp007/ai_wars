import React, { Component } from 'react';
import './game.css';
import TitleScreen from './menu/titleScreen';
import Menu from './menu/menu';
import InputManager from './inputManager';
import Player from './gameObjects/player';
import AI from './gameObjects/ai';

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
        this.player1 = null;
        this.player2 = null;
        this.player1StartPosition = {                    
            x: this.state.screen.width / 2,
            y: this.state.screen.height - 50
        };
        this.player2StartPosition = {                    
            x: this.state.screen.width / 2,
            y: this.state.screen.height - 300
        };
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
                id: 1,
                position: { x: this.player1StartPosition.x, y: this.player1StartPosition.y } 
            });

            const ai = new AI({
                id: 2,
                position: { x: this.player2StartPosition.x, y: this.player2StartPosition.y },
                color: "#ff0000"
            });

            this.player1 = player;
            this.player2 = ai;
        }

        if (state === GameState.Train) {
            const ai1 = new AI({ 
                id: 1,
                position: { x: this.player1StartPosition.x, y: this.player1StartPosition.y },
                angle: 135,
                color: "#ff0000"
            });

            const ai2 = new AI({
                id: 2,
                position: { x: this.player2StartPosition.x, y: this.player2StartPosition.y },
                angle: 315,
                color: "#ffff00"
            });

            this.player1 = ai1;
            this.player2 = ai2;
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

        if (this.state.gameState === GameState.Play || this.state.gameState === GameState.Train) {
            this.updatePlayer(this.player1, this.player2, keys);
            this.updatePlayer(this.player2, this.player1, keys);
        }        
        
        requestAnimationFrame(() => { this.update(currentTime) });
    }

    updatePlayer(player1, player2, keys) {
        player1.update(this.state, keys, player1, player2); 
        player1.render(this.state);

        if (player1.collidesWith(player2)) {
            player1.resetPosition();
            player2.resetPosition();

            player1.decreaseScore(1);
            player2.decreaseScore(1);
        } 

        if (player1.bullets.length > 0) {
            player1.bullets.forEach(bullet => {
                if (bullet.collidesWith(player2)) {
                    player2.resetPosition();
                    player2.decreaseScore(5);
                    player1.increaseScore(5);
                } 
            });
        }
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