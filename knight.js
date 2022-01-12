class Knight {
    constructor(game, x, y) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knightDefault.png");
        this.spritesheetDead = ASSET_MANAGER.getAsset("./sprites/knightDead.png");
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 41, 49, 6, 0.1, 23, false, true);
        this.animations[1] = new Animator(this.spritesheetDead, 0, 0, 34, 50, 6, 0.2, 30, false, false);
        this.x = x;
        this.y = y;
        this.scale = 2.5;
        this.width = 41 * this.scale;
        this.height = 49 * this.scale;
        this.dead = false;
        this.deadCounter = 0;
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    update() {
        if (this.x <= 0) this.x = 0;
        if (this.x + this.width >= PARAMS.CANVAS_WIDTH) this.x = PARAMS.CANVAS_WIDTH - this.width;
        if (this.y <= 0) this.y = 0;
        if (this.y + this.height >= PARAMS.CANVAS_HEIGHT) this.y = PARAMS.CANVAS_HEIGHT - this.height;
        this.updateBB();
    };

    draw(ctx) {
        if (this.dead) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        } else {
            this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        }
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }


}
