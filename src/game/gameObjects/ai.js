import GameObject from './gameObject';
import Bullet from './bullet';
import Agent from './agent';
import { DQNSolver, DQNOpt, DQNEnv } from 'reinforce-js';

export default class AI extends GameObject {
	constructor(args){
		super({ position: args.position || { x: 0, y: 0 },
					onDie: args.onDie, 
					speed: args.speed || 20, 
					radius: args.radius || 20, 
					angle: args.angle || 0,
					id: args.id,
					color: args.color || '#ffffff',
					delete: args.delete || false });

        this.bullets = [];
				this.lastShot = 0;
				this.initAI();			
		}

		getNumStates() {
			return 40;
		}

		getNumActions() {
				return 4;
		}
		
		initAI() {
			this.opt = new DQNOpt();
			this.opt.setTrainingMode(true);
			this.opt.setNumberOfHiddenUnits([100]);  // mind the array here, currently only one layer supported! Preparation for DNN in progress...
			this.opt.setEpsilonDecay(1.0, 0.1, 1e6);
			this.opt.setEpsilon(0.05);
			this.opt.setGamma(0.9);
			this.opt.setAlpha(0.005);
			this.opt.setLossClipping(true);
			this.opt.setLossClamp(1.0);
			this.opt.setRewardClipping(true);
			this.opt.setRewardClamp(1.0);
			this.opt.setExperienceSize(1e6);
			this.opt.setReplayInterval(500);
			this.opt.setReplaySteps(500);

			const width = 400;
			const height = 400;
			const numberOfStates = this.getNumStates();
			const numberOfActions = this.getNumActions();
			this.env = new DQNEnv(width, height, numberOfStates, numberOfActions);
			this.dqnSolver = new DQNSolver(this.env, this.opt);
		}

		forward(player, enemy) {
			var input_array = new Array(this.getNumStates());
			input_array[0] = player.position.x;
			input_array[1] = player.position.y;
			input_array[2] = enemy.position.y;
			input_array[3] = enemy.position.y;  

			if (enemy.bullets != null) {
					for (var i = 4; i < Math.min((this.getNumStates() / 2)-1, enemy.bullets.length); i+=2){
							input_array[i] = enemy.bullets[i-4].x;
							input_array[i+1] = enemy.bullets[i-4].y;
					} 
			}

			while (input_array.length < this.getNumStates()){
				input_array.push(0);
			} 

			return this.dqnSolver.decide(input_array);
		}

		backward(score) {
				this.brain.learn(score);
		}

		getReward(player, enemy) {
			if (player.bullets.length > 0) {
				player.bullets.forEach(bullet => {
						if (bullet.collidesWith(enemy)) {
							return 5;
						} 
				});
			 }
			 
			 if (enemy.bullets.length > 0) {
				enemy.bullets.forEach(bullet => {
						if (bullet.collidesWith(player)) {
							return -10;
						} 
				});
			 }

			 if (player.collidesWith(enemy)) {
				 return -1;
			 }
			 
			 return 1;
		}
    
    update(state, keys, player, enemy) {
			 let action = this.forward(player, enemy);

			 switch (action) {
				case 0:
				  keys =  { up: true };
					break;
				case 1:
					keys =  { left: true };
					break;
				case 2:
					keys =  { right: true };
					break;
				case 3:
					keys =  { space: true };
					break;
				default:
					keys =  { };
					break;
			 }

			 super.update(state, keys);

			 if (keys.space && Date.now() - this.lastShot > 100) {
					const bullet = new Bullet({
							position: { x: this.position.x, y : this.position.y },
							angle: this.angle
				});

				this.bullets.push(bullet);
				this.lastShot = Date.now();
			}

			 const reward = this.getReward(player, enemy);
			 this.dqnSolver.learn(reward);

			 //super.update(state, { up: true, right: true });
    }

    renderBullets(state) {
		let index = 0;
	    for (let bullet of this.bullets) {
	      if (bullet.delete) {
	        this.bullets.splice(index, 1);
	      } else {
	      	this.bullets[index].update();
	        this.bullets[index].render(state);
	      }
	      index++;
	    }
    }
    
    render(state) {
      const context = state.context;
      const playerAngle = this.angle;

      this.renderBullets(state);
	    context.save();
      context.translate(this.position.x, this.position.y);
      context.rotate(playerAngle * Math.PI / 180);
	    context.strokeStyle = this.color;
	    context.fillStyle = this.color;
	    context.lineWidth = 2;
	    context.beginPath();
	    context.moveTo(0, -25);
	    context.lineTo(15, 15);
	    context.lineTo(5, 7);
	    context.lineTo(-5, 7);
	    context.lineTo(-15, 15);
	    context.closePath();
	    context.fill();
	    context.stroke();
	    context.restore();
		}
}