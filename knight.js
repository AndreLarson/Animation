class Knight {
    constructor(game, x, y) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knightDefault.png");
        this.spritesheetDead = ASSET_MANAGER.getAsset("./sprites/knightDead.png");
        this.animations = [];
        this.deathAnimationTime = 1.2;
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 41, 49, 6, 0.1, 23, false, true);
        this.animations[1] = new Animator(this.spritesheetDead, 0, 0, 34, 50, 6, this.deathAnimationTime / 6, 30, false, false);
        this.x = x;
        this.y = y;
        this.scale = 2.5;
        this.width = 41 * this.scale;
        this.height = 49 * this.scale;
        this.dead = false;
        this.deadCounter = 0;
        this.health = 100;
        this.updateBB();
    };

    damageInput(damage) {
        this.health -= damage;
        if (this.health <= 0) this.dead = true;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    update() {
        if (this.dead) {
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 5 + this.deathAnimationTime) this.removeFromWorld = true;
        }
        if (this.x <= 0) this.x = 0;
        if (this.x + this.width >= PARAMS.CANVAS_WIDTH) this.x = PARAMS.CANVAS_WIDTH - this.width;
        if (this.y <= 0) this.y = 0;
        if (this.y + this.height >= PARAMS.CANVAS_HEIGHT) this.y = PARAMS.CANVAS_HEIGHT - this.height;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Knight) {
                    if ((that.BB.bottom < entity.BB.bottom && that.game.isBehind(that, entity)) ||
                        (that.BB.bottom >= entity.BB.bottom && !that.game.isBehind(that, entity))) {
                        that.game.swapEntity(that, entity);
                    }
                    that.updateBB();
                }
            }
        });
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
