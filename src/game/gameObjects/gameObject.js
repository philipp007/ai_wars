export default class GameObject {
	constructor(args){
		this.position = args.position;
		this.onDie = args.onDie;
		this.speed = args.speed;
        this.radius = args.radius;
        this.angle = args.angle;
		this.delete = false;
	}

	die() {
		this.delete = true;
		if (this.onDie) {
			this.onDie();
		}
    }
    
    update(state, keys) {
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
            const translation = this.toVector(this.angle);
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

    toVector(angle) {
        const radians = this.toRadians(angle);
        return { x: Math.sin(radians), y: -Math.cos(radians) };
    }
    
    toRadians(angle) {
        return angle * (Math.PI / 180);
    }
}