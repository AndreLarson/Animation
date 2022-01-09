class Player {
    constructor(game) {
        this.game = game;
        this.spritesheet1 = ASSET_MANAGER.getAsset("./sprites/attack.png");
        this.spritesheetwu = ASSET_MANAGER.getAsset("./sprites/wu.png");
        this.spritesheetwl = ASSET_MANAGER.getAsset("./sprites/wl.png");
        this.spritesheetwr = ASSET_MANAGER.getAsset("./sprites/wr.png");
        this.spritesheetwd = ASSET_MANAGER.getAsset("./sprites/wd.png");
        this.ssIdle = ASSET_MANAGER.getAsset("./sprites/idle.png");
        this.x = 100;
        this.y = 400;
        this.facing = 0; // up, down, left, right
        this.action = 0; // idle, walking, attacks
        this.scale = 6;
        this.offsetx = 0;
        this.offsety = 2 * this.scale;
        this.animations = [];
        this.velocity = { x: 0, y: 0 };
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {
            this.animations.push([]);
            for (var j = 0; j < 3; j++) {
                this.animations[i].push([]);
            }
        }
        this.animations[0][0] = new Animator(this.ssIdle, 8, 4, 38, 49, 1, 1, 0, false, true);
        this.animations[0][1] = new Animator(this.spritesheetwu, 15, 3, 37, 55, 8, 0.2, 0, false, true); // walk up
        this.animations[0][2] = new Animator(this.spritesheet1, 207, 38, 108, 68, 5, 0.05, 0, false, true); // attack up

        this.animations[1][0] = new Animator(this.ssIdle, 14, 131, 35, 50, 1, 1, 0, false, true);
        this.animations[1][1] = new Animator(this.spritesheetwd, 11, 6, 34, 56, 8, 0.2, 0, false, true); // walk down
        this.animations[1][2] = new Animator(this.spritesheet1, 207, 438, 107, 70, 5, 0.05, 0, false, true); // attack up

        this.animations[2][0] = new Animator(this.ssIdle, 7, 65, 38, 52, 1, 1, 0, false, true);
        this.animations[2][1] = new Animator(this.spritesheetwl, 6, 8, 49, 53, 7, 0.229, 0, false, true); // walk left
        this.animations[2][2] = new Animator(this.spritesheet1, 179, 246, 111, 51, 5, 0.05, 0, false, true); // attack up

        this.animations[3][0] = new Animator(this.ssIdle, 19, 192, 38, 53, 1, 1, 0, false, true);
        this.animations[3][1] = new Animator(this.spritesheetwr, 7, 3, 47, 53, 8, 0.2, 0, false, true); // walk right
        this.animations[3][2] = new Animator(this.spritesheet1, 220, 630, 109, 51, 5, 0.05, 0, false, true); // attack up

    };

    update() {
        const TICK = this.game.clockTick;
        const MAX_WALK = 200;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.action = 0;
        this.offsetx = 0;
        this.offsety = 0;
        if (this.game.up && this.game.right) {
            this.facing = 3;
            this.action = 1;
            this.velocity.x += MAX_WALK / Math.sqrt(2);
            this.velocity.y -= MAX_WALK / Math.sqrt(2);
        } else if (this.game.up && this.game.left) {
            this.facing = 2;
            this.action = 1;
            this.velocity.x -= MAX_WALK / Math.sqrt(2);
            this.velocity.y -= MAX_WALK / Math.sqrt(2);
            this.offsetx = 18 * this.scale;
        } else if (this.game.down && this.game.right) {
            this.facing = 3;
            this.action = 1;
            this.velocity.x += MAX_WALK / Math.sqrt(2);
            this.velocity.y += MAX_WALK / Math.sqrt(2);
        } else if (this.game.down && this.game.left) {
            this.facing = 2;
            this.action = 1;
            this.velocity.x -= MAX_WALK / Math.sqrt(2);
            this.velocity.y += MAX_WALK / Math.sqrt(2);
            this.offsetx = 18 * this.scale;
        } else if (this.game.up) {
            this.facing = 0;
            this.action = 1;
            this.velocity.y -= MAX_WALK;
            this.offsety = 2 * this.scale;
        } else if (this.game.down) {
            this.facing = 1;
            this.action = 1;
            this.velocity.y += MAX_WALK;
            this.offsety = -2 * this.scale;
        } else if (this.game.left) {
            this.facing = 2;
            this.action = 1;
            this.velocity.x -= MAX_WALK;
            this.offsetx = 18 * this.scale;
        } else if (this.game.right) {
            this.facing = 3;
            this.action = 1;
            this.velocity.x += MAX_WALK;
        }
        if (this.game.attack) {
            this.action = 2;
            if (this.facing == 0) {
                this.offsetx = 30 * this.scale;
                this.offsety = 14 * this.scale;
            } else if (this.facing == 1) {
                this.offsetx = 30 * this.scale;
                this.offsety = -2 * this.scale;
            } else if (this.facing == 2) {
                this.offsetx = 57 * this.scale;
                this.offsety = -2 * this.scale;
            } else if (this.facing == 3) {
                this.offsetx = 21 * this.scale;
                this.offsety = -2 * this.scale;
            }

        }
        if (this.action == 0) {
            if (this.facing == 0) {
                this.offsetx = 9 * this.scale;
                this.offsety = -4 * this.scale;
            } else if (this.facing == 1) {
                this.offsetx = 3 * this.scale;
                this.offsety = -3 * this.scale;
            } else if (this.facing == 2) {
                this.offsetx = 11 * this.scale;
                this.offsety = -this.scale;
            }
        }
        if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    };

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x - this.offsetx, this.y - this.offsety, this.scale);
    };
}
