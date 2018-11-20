import GameObject from './gameObject';
import Bullet from './bullet';

export default class AI extends GameObject {
	constructor(args){
		super({ position: args.position || { x: 0, y: 0 },
					onDie: args.onDie, 
					speed: args.speed || 10, 
					radius: args.radius || 20, 
					angle: args.angle || 0,
					id: args.id,
					color: args.color || '#ffffff',
					delete: args.delete || false });

        this.bullets = [];
				this.lastShot = 0;
    }
    
    update(state) {
			super.update(state, { up: true, right: true });
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