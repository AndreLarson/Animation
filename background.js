class Ceiling {
    constructor() {
        this.BB = new BoundingBox(0, -1, PARAMS.CANVAS_WIDTH, 1);
    };

    update() {

    };

    draw() {

    };
};

class Floor {
    constructor() {
        this.BB = new BoundingBox(0, PARAMS.CANVAS_HEIGHT, PARAMS.CANVAS_WIDTH, 1);
    };

    update() {

    };

    draw() {

    };
};

class WallLeft {
    constructor() {
        this.BB = new BoundingBox(-1, 0, 1, PARAMS.CANVAS_HEIGHT)
    };

    update() {

    };

    draw() {

    };
};

class WallRight {
    constructor() {
        this.BB = new BoundingBox(PARAMS.CANVAS_WIDTH, 0, 1, PARAMS.CANVAS_HEIGHT)
    };

    update() {

    };

    draw() {

    };
};
