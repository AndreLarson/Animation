class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.load();
    };

    load() {
        this.game.addEntity(new Player(this.game));
        this.game.addEntity(new Ceiling());
        this.game.addEntity(new Floor());
        this.game.addEntity(new WallLeft());
        this.game.addEntity(new WallRight());
    };

    update() {

    };

    draw(ctx) {

    };
}
