export class Engine {
    constructor(display,context)
    {
        this.cvs = document.getElementById(display);
        this.ctx = this.cvs.getContext(context);
    }

}