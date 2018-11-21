import { toVector } from '../utils';

export default class GameObject {
	constructor(args){
		this.position = args.position;
		this.onDie = args.onDie;
		this.speed = args.speed;
        this.radius = args.radius;
        this.angle = args.angle;
        this.color = args.color;
        this.id = args.id;
        this.delete = false;
        this.score = 0;        
        this.startPosition = { x: this.position.x, y: this.position.y }  
	}

	die() {
		this.delete = true;
		if (this.onDie) {
			this.onDie();
		}
    }
    
    update(state, keys, player1, player2) {
		this.setAngle(keys);
        this.move(keys);
        this.keepOnScreen(state);
    }

    setAngle(keys) {
        if (keys.right) {
			this.angle += 5;
		} else if (keys.left) {
			this.angle -= 5;
        }

        if (this.angle > 360) {
            this.angle = 0;
        } else if (this.angle < 0) {
            this.angle = 360;
        }
    }

    move(keys) {
        if (keys.up) {
            const translation = toVector(this.angle);
            this.position.x += this.speed * translation.x;
            this.position.y += this.speed * translation.y;
        }   
    }
    
    keepOnScreen(state) {
        if(this.position.x > state.screen.width) { 
            this.position.x = 0;
        } else if(this.position.x < 0) {
           this.position.x = state.screen.width;
        }
       
        if(this.position.y > state.screen.height) {
           this.position.y = 0;
        } else if(this.position.y < 0) {
           this.position.y = state.screen.height;
        }
    }

    collidesWith(target) {
        return this.checkCollision(this, target)
    }

    checkCollision(obj1, obj2) {
        var vx = obj1.position.x - obj2.position.x;
        var vy = obj1.position.y - obj2.position.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        if(length < obj1.radius + obj2.radius) {
          return true;
        }
        return false;
    }

    increaseScore(score) {
        this.score += score || 1;
    }

    decreaseScore(score){
        this.score -= score || 1;  
    }

    resetPosition() {
        this.position = { x: this.startPosition.x, y: this.startPosition.y };
    } 
}