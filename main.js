const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/walkUp.png");
ASSET_MANAGER.queueDownload("./sprites/walkDown.png");
ASSET_MANAGER.queueDownload("./sprites/walkLeft.png");
ASSET_MANAGER.queueDownload("./sprites/walkRight.png");
ASSET_MANAGER.queueDownload("./sprites/attackUp.png");
ASSET_MANAGER.queueDownload("./sprites/attackDown.png");
ASSET_MANAGER.queueDownload("./sprites/attackLeft.png");
ASSET_MANAGER.queueDownload("./sprites/attackRight.png");
ASSET_MANAGER.queueDownload("./sprites/idle.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	ctx.imageSmoothingEnabled = false;
	ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});
