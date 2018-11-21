export default class Agent {
    constructor(args) {        
        this.actions = [0, 1, 2, 3];
    } 

    getNumStates() {
        return 40;
    }

    getNumActions() {
        return 4;
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

        this.action = this.brain.act(input_array);
    }

    backward(score) {
        this.brain.learn(score);
    } 
} 