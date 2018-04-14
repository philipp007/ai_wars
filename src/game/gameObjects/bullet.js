import GameObject from './gameObject';
import { toVector } from '../utils';

export default class Bullet extends GameObject {
	constructor(args){
		super({ position: args.position || { x: 0, y: 0 },
                onDie: args.onDie, 
                speed: args.speed || 15, 
                radius: args.radius || 5,
                delete: args.delete || false,
                angle: args.angle });
    }

	update() {
		const translation = toVector(this.angle);
        this.position.x += this.speed * translation.x;
        this.position.y += this.speed * translation.y;
	}

	render(state) {
	    if(this.position.y > state.screen.height || this.position.y < 0) {
	    	this.die();
	    }

	    const context = state.context;
	    context.save();
	    context.translate(this.position.x, this.position.y);
	    context.fillStyle = '#FF0';
	    context.lineWidth = 0.5;
	    context.beginPath();
	    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
	    context.closePath();
	    context.fill();
	    context.restore();
	}
}