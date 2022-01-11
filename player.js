class Player {
    constructor(game) {
        this.game = game;
        this.loadAssets();
        this.loadPlayerProperties();
        this.updateBB();
        this.loadAnimations();
    };

    loadAssets() {
        this.spritesheetwalkUp = ASSET_MANAGER.getAsset("./sprites/walkUp.png");
        this.spritesheetwalkDown = ASSET_MANAGER.getAsset("./sprites/walkDown.png");
        this.spritesheetwalkLeft = ASSET_MANAGER.getAsset("./sprites/walkLeft.png");
        this.spritesheetwalkRight = ASSET_MANAGER.getAsset("./sprites/walkRight.png");

        this.spritesheetattackUp = ASSET_MANAGER.getAsset("./sprites/attackUp.png");
        this.spritesheetattackDown = ASSET_MANAGER.getAsset("./sprites/attackDown.png");
        this.spritesheetattackLeft = ASSET_MANAGER.getAsset("./sprites/attackLeft.png");
        this.spritesheetattackRight = ASSET_MANAGER.getAsset("./sprites/attackRight.png");
        this.spritesheetIdle = ASSET_MANAGER.getAsset("./sprites/idle.png");
    };

    loadPlayerProperties() {
        this.scale = 2.5;
        this.x = 100;
        this.y = 300;
        this.offsetx = 0;
        this.offsety = 0;
        this.facing = 1; // up, down, left, right
        this.action = 0; // idle, walking, attacks
        this.velocity = { x: 0, y: 0 };
        this.attackSpeed = 0.07;
        this.width = 38 * this.scale;
        this.height = 52 * this.scale;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };

    loadAnimations() {
        this.animations = [];
        for (var i = 0; i < 4; i++) {
            this.animations.push([]);
            for (var j = 0; j < 3; j++) {
                this.animations[i].push([]);
            }
        }
        //up
        this.animations[0][0] = new Animator(this.spritesheetIdle, 8, 4, 39, 50, 1, 0.33, 0, false, true); // idle
        this.animations[0][1] = new Animator(this.spritesheetwalkUp, 0, 0, 64, 55, 8, 0.2, 0, false, true); // walk
        this.animations[0][2] = new Animator(this.spritesheetattackUp, 0, 0, 106, 68, 6, this.attackSpeed, 86, false, false); // attack
        //down
        this.animations[1][0] = new Animator(this.spritesheetIdle, 14, 131, 35, 51, 1, 0.33, 0, false, true); // idle
        this.animations[1][1] = new Animator(this.spritesheetwalkDown, 0, 0, 64, 51, 8, 0.2, 0, false, true); // walk
        this.animations[1][2] = new Animator(this.spritesheetattackDown, 0, 0, 105, 70, 6, this.attackSpeed, 87, false, false); // attack
        //left
        this.animations[2][0] = new Animator(this.spritesheetIdle, 7, 65, 38, 53, 1, 0.33, 0, false, true); // idle
        this.animations[2][1] = new Animator(this.spritesheetwalkLeft, 0, 0 , 64, 53, 8, 0.2, 0, false, true); // walk
        this.animations[2][2] = new Animator(this.spritesheetattackLeft, 0, 0, 108, 52, 6, this.attackSpeed, 84, false, false); // attack
        //right
        this.animations[3][0] = new Animator(this.spritesheetIdle, 19, 192, 38, 54, 1, 0.33, 0, false, true); // idle
        this.animations[3][1] = new Animator(this.spritesheetwalkRight, 0, 0 , 64, 53, 8, 0.2, 0, false, true); // walk
        this.animations[3][2] = new Animator(this.spritesheetattackRight, 0, 0, 108, 52, 6, this.attackSpeed, 84, false, false); // attack

    };

    update() {
        const TICK = this.game.clockTick;
        const MAX_WALK = 200;

        // default values for no input
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.action = 0;
        this.offsetx = 0;
        this.offsety = 0;
        this.width = 38 * this.scale;
        this.height = 52 * this.scale;

        // movement physics
        if (this.game.up) {
            this.facing = 0;
            this.action = 1;
            if (this.game.left) {
                this.facing = 2;
                this.width = 46 * this.scale;
                this.velocity.x -= MAX_WALK / Math.sqrt(2);
                this.velocity.y -= MAX_WALK / Math.sqrt(2);
                this.offsetx = 18 * this.scale;
            } else if (this.game.right) {
                this.facing = 3;
                this.width = 46 * this.scale;
                this.velocity.x += MAX_WALK / Math.sqrt(2);
                this.velocity.y -= MAX_WALK / Math.sqrt(2);
            } else {
                this.velocity.y -= MAX_WALK;
                this.offsety = 2 * this.scale;
            }
        } else if (this.game.down) {
            this.facing = 1;
            this.action = 1;
            if (this.game.left) {
                this.facing = 2;
                this.width = 46 * this.scale;
                this.velocity.x -= MAX_WALK / Math.sqrt(2);
                this.velocity.y += MAX_WALK / Math.sqrt(2);
                this.offsetx = 18 * this.scale;
            } else if (this.game.right) {
                this.facing = 3;
                this.width = 46 * this.scale;
                this.velocity.x += MAX_WALK / Math.sqrt(2);
                this.velocity.y += MAX_WALK / Math.sqrt(2);
            } else {
                this.velocity.y += MAX_WALK;
                this.offsety = -3 * this.scale;
            }
        } else if (this.game.left) {
            this.facing = 2;
            this.action = 1;
            this.width = 46 * this.scale;
            this.velocity.x -= MAX_WALK;
            this.offsetx = 19 * this.scale;
        } else if (this.game.right) {
            this.facing = 3;
            this.action = 1;
            this.width = 46 * this.scale;
            this.velocity.x += MAX_WALK;
            this.offsetx = this.scale;
        }

        // attack physics
        if (this.game.attack) {
            // set action to attack
            this.action = 2;
            if (this.animations[this.facing][this.action].isDone()) {
                // set action to idle once attack animation is finished
                this.action = 0;
                this.game.attack = false; // this allows for press to attack
            } else {
                // set offset and adjust bounding box for attack actions
                if (this.facing == 0) {
                    this.offsetx = 27 * this.scale;
                    this.offsety = 15 * this.scale;
                    this.height = 70 * this.scale;
                } else if (this.facing == 1) {
                    this.offsetx = 32 * this.scale;
                    this.offsety = -3 * this.scale;
                    this.height = 70 * this.scale;
                } else if (this.facing == 2) {
                    this.offsetx = 61 * this.scale;
                    this.offsety = -3 * this.scale;
                    this.height = 52 * this.scale;
                } else if (this.facing == 3) {
                    this.offsetx = 21 * this.scale;
                    this.offsety = -2 * this.scale;
                    this.height = 52 * this.scale;
                }
                this.width = 108 * this.scale;
            }
        } else {
            // reset the attack animation
            this.animations[this.facing][2].elapsedTime = 0;
        }

        // set offset for idle actions
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
        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Ceiling) {
                    if (that.BB.top <= entity.BB.bottom) {
                        that.y = entity.BB.bottom + that.offsety;
                    }
                    that.updateBB();
                }
                if (entity instanceof Floor) {
                    if (that.BB.bottom >= entity.BB.top) {
                        that.y = entity.BB.top - that.height + that.offsety;
                    }
                    that.updateBB();
                }
                if (entity instanceof WallLeft) {
                    if (that.BB.left <= entity.BB.right) {
                        that.x = entity.BB.right + that.offsetx;
                    }
                    that.updateBB();
                }
                if (entity instanceof WallRight) {
                    if (that.BB.right >= entity.BB.left) {
                        that.x = entity.BB.left - that.width + that.offsetx;
                    }
                    that.updateBB();
                }
            }
        });
    };

    draw(ctx) {
        this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x - this.offsetx, this.y - this.offsety, this.scale);
        // draw bounding box
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.offsetx, this.BB.y - this.offsety, this.BB.width, this.BB.height);
    };

}
