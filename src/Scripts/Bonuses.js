export class Bonuses {
    constructor(path,x,y)
    {
        this.image = new Image();
        this.image.src = path;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.del = 0;

    }
}