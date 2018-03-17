import GameObject from './gameObject';

export default class Player extends GameObject {
	constructor(args){
		super({ position: args.position || { x: 0, y: 0 },
                onDie: args.onDie, 
                speed: args.speed || 10, 
                radius: args.radius || 15, 
                angle: args.angle || 0,
                delete: args.delete || false });
    }
    
    update(state, keys) {
        super.update(state, keys);
    }
}