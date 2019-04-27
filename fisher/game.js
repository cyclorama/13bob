function update() {
	hook.update();

	for (let i = 0; i < fishes.length; i++) {
		fishes[i].update();
	}
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	hook.render();
	renderLine();

	for (let i = 0; i < fishes.length; i++) {
		fishes[i].render();
	}

	for (let i = 0; i < rocks.length; i++) {
		rocks[i].render();
	}
	document.getElementById('boat').src = `img/boat${PLAYER_CAUGHT}.png`;
}

function renderWater() {
	for (let j = 0; j < LEVEL_HEIGHT; j++) {
		for (let i = 0; i < LEVEL_WIDTH; i++) {
			ctx.drawImage(gameImages.waterImage, i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);
		}
	}
}

function renderLine() {
	for (let i = 0; i < hook.prev.length; i += 2) {
		if (hook.prev[i] > hook.prev[i + 2]) {
			ctx.drawImage(gameImages.lineImageLeftDown, (hook.prev[i] - 1) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.drawImage(gameImages.lineImageLeftUp, (hook.prev[i]) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		} else if (hook.prev[i] < hook.prev[i + 2]) {
			ctx.drawImage(gameImages.lineImageRightDown, (hook.prev[i] + 1) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.drawImage(gameImages.lineImageRightUp, (hook.prev[i]) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		} else {
			ctx.drawImage(gameImages.lineImage, hook.prev[i] * BLOCK_SIZE, hook.prev[i + 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}
	fixArtifact();
}

function fixArtifact() {
	if (hook.x == hook.prev[hook.prev.length - 2] + 1) {
		ctx.drawImage(gameImages.lineImageRightDown, (hook.prev[hook.prev.length - 2] + 1) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		ctx.drawImage(gameImages.waterImage, (hook.prev[hook.prev.length - 2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		ctx.drawImage(gameImages.lineImageRightUp, (hook.prev[hook.prev.length-2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
	} else if (hook.x == hook.prev[hook.prev.length - 2] - 1) {
		ctx.drawImage(gameImages.lineImageLeftDown, (hook.prev[hook.prev.length - 2] - 1) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		ctx.drawImage(gameImages.waterImage, (hook.prev[hook.prev.length - 2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		ctx.drawImage(gameImages.lineImageLeftUp, (hook.prev[hook.prev.length - 2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
	}
}

function main() {
	update();
	render();

	sleep(sleepTime).then(() => {
		requestAnimationFrame(main)
	});
}

document.getElementById('score').innerText = PLAYER_SCORE;
loadLevel(LEVEL);
menu();
