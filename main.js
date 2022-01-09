const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/attack.png");
ASSET_MANAGER.queueDownload("./sprites/wu.png");
ASSET_MANAGER.queueDownload("./sprites/wl.png");
ASSET_MANAGER.queueDownload("./sprites/wr.png");
ASSET_MANAGER.queueDownload("./sprites/wd.png");
ASSET_MANAGER.queueDownload("./sprites/idle.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});
