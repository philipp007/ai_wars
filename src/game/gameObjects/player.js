import GameObject from './gameObject';
import Bullet from './bullet';

export default class Player extends GameObject {
	constructor(args){
		super({ position: args.position || { x: 0, y: 0 },
                onDie: args.onDie, 
                speed: args.speed || 10, 
                radius: args.radius || 15, 
                angle: args.angle || 0,
                delete: args.delete || false });

        this.bullets = [];
        this.lastShot = 0;
    }
    
    update(state, keys) {
        super.update(state, keys);

        if (keys.space && Date.now() - this.lastShot > 250) {
			const bullet = new Bullet({
                position: { x: this.position.x, y : this.position.y },
                angle: this.angle
			});

			this.bullets.push(bullet);
			this.lastShot = Date.now();
		}
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
}