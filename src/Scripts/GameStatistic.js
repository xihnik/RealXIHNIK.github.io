export class GameStatistic {
    constructor(hp) {
        this.score = 0;
        this.hp = hp;
        this.time = 0;

    }
    changeHpStatus(value) {
        this.hp += value;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

}