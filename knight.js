class Knight {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knightDefault.png");
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 41, 49, 6, 0.1, 23, false, true);
        this.x = 100;
        this.y = 100;
        this.scale = 2.5;
        this.width = 41 * this.scale;
        this.height = 49 * this.scale;
        this.dead = false;
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    update() {
        if (this.dead) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }


}
