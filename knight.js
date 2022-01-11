class Knight {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knightDefault.png");
        this.spritesheetDead = ASSET_MANAGER.getAsset("./sprites/knightDead.png");
        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 41, 49, 6, 0.1, 23, false, true);
        this.animations[1] = new Animator(this.spritesheetDead, 0, 0, 34, 50, 6, 0.2, 30, false, false);
        this.x = 100;
        this.y = 100;
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
        if (this.dead) {
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 1.2) this.removeFromWorld = true;
        }
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
