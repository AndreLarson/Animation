class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.load();
    };

    load() {
        this.game.addEntity(new Player(this.game));
        for (var i = 0; i < 10; i++) {
            var x = getRandomRange(PARAMS.CANVAS_WIDTH / 3, PARAMS.CANVAS_WIDTH);
            var y = getRandomRange(0, PARAMS.CANVAS_HEIGHT);
            this.game.addEntity(new Knight(this.game, x, y));
        }

    };

    update() {

    };

    draw(ctx) {

    };
}
