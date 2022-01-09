class SceneManager {
    constructor(game) {
        this.game = game;
        this.load();
    }

    load() {
        this.game.addEntity(new Player(this.game));

    }
}
