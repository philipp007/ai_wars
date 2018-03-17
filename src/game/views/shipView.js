export default class ShipView {
    constructor(args) {
        this.player = args.player;
    }
    
    update(state, keys) {
        this.player.update(state, keys);
    }

    render(state) {
        const context = state.context;
        const playerAngle = this.player.angle;

	    context.save();
        context.translate(this.player.position.x, this.player.position.y);
        context.rotate(playerAngle * Math.PI / 180);
	    context.strokeStyle = '#ffffff';
	    context.fillStyle = '#ffffff';
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