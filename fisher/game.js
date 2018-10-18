function update() {
	if (hook.reelIn) {
		if (hook.x != hook.startX || hook.y != hook.startY) {
			hook.y = hook.prev.pop();
			hook.x = hook.prev.pop(); // Reverse hook position
		} else {
			hook.casting = false;
			hook.reelIn = false;
			sleepTime *= 10;

			if (hook.x == hook.startX && hook.y == hook.startY) {
				for (var i = 0; i < fishes.length; i++) {
					if (fishes[i].caught && !fishes[i].counted) {
						fishes[i].counted = true;
						PLAYER_CAUGHT++;
					}
				}
				reel.pause();
				reel.currentTime = 0;

				if (PLAYER_CAUGHT == fishes.length) {
					PLAYER_SCORE += PLAYER_CAUGHT / PLAYER_REELS; // Calculate score
					document.getElementById('score').innerText = parseInt(PLAYER_SCORE);
					if (LEVEL == 7) {
						LEVEL = -1;
						PLAYER_SCORE = 0;
						document.getElementById('score').innerText = parseInt(PLAYER_SCORE);
						nextLevel();
					} else { nextLevel(); }
				}
			}
		}
	} else {
		if (40 in keysDown) { // DOWN ARROW - Speed up
			sleepTime = 70;
			keysDown = [];
		} else {
			sleepTime = 700;
		}
		if (32 in keysDown) { // SPACEBAR - Reel in
			if (!hook.casting) {
				PLAYER_REELS++;
				hook.casting = true;
				music.play();
				keysDown = [];
			} else {
				sleepTime /= 10;
				hook.casting = false;
				hook.reelIn = true;
				music.pause();
				reel.play();
				keysDown = [];
			}
		}
		if (hook.casting && hook.y < LEVEL_HEIGHT-1) { // Save previous X and Y hook positions and move hook down
			if (37 in keysDown) { hook.x -= 1; keysDown = []; } // LEFT ARROW - Move left
			if (39 in keysDown) { hook.x += 1; keysDown = []; } // RIGHT ARROW - Move right
			hook.prev.push(hook.x);
			hook.prev.push(hook.y);
			hook.y += 1;
		}
		for (var i = 0; i < rocks.length; i++) {
			if (rocks[i].scaleX == 1) {
				if (hook.x == rocks[i].x &&
					hook.y > rocks[i].y-rocks[i].scaleY-1 &&
					hook.y < rocks[i].y+rocks[i].scaleY+1) {
					reelIn();
				}
			} else if (	hook.x > rocks[i].x-(rocks[i].scaleX+1) &&
						hook.x < rocks[i].x+(rocks[i].scaleX+1) &&
						hook.y > rocks[i].y-(rocks[i].scaleY+1) &&
						hook.y < rocks[i].y+(rocks[i].scaleY+1)) {
				reelIn();
			}
		}
	}
	for (var i = 0; i < fishes.length; i++) { // Waypoint mechanic
		if (hook.reelIn && fishes[i].x == hook.x && (fishes[i].y == hook.y || fishes[i].y == hook.y - 1 || fishes[i].y == hook.y + 1))
			fishes[i].caught = true;

		if (fishes[i].x == 12 && fishes[i].y == 0)
			fishes[i].onBoat = true;

		if (fishes[i].caught) {
			fishes[i].x = hook.x;
			fishes[i].y = hook.y;
		} else {
			if (fishes[i].x < fishes[i].waypoints[fishes[i].point + 2]) {
				fishes[i].x++;

				if (fishes[i].fishImage.src != 'img/fish_right.png')
					fishes[i].fishImage.src = "img/fish_right.png";
			}

			if (fishes[i].x > fishes[i].waypoints[fishes[i].point + 2]) {
				fishes[i].x--;

				if (fishes[i].fishImage.src != 'img/fish_left.png')
					fishes[i].fishImage.src = "img/fish_left.png";
			}

			if (fishes[i].x == fishes[i].waypoints[fishes[i].point+2] && fishes[i].y < fishes[i].waypoints[fishes[i].point+3])
				fishes[i].y++;

			if (fishes[i].x == fishes[i].waypoints[fishes[i].point+2] && fishes[i].y > fishes[i].waypoints[fishes[i].point+3])
				fishes[i].y--;

			if ((fishes[i].x == fishes[i].waypoints[fishes[i].point+2] && fishes[i].y == fishes[i].waypoints[fishes[i].point+3]))
				fishes[i].point += fishes[i].point+4 < fishes[i].waypoints.length ? 2 : -(fishes[i].waypoints.length-2);
		}
	}
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (waterReady) {
		for (var j = 0; j < LEVEL_HEIGHT; j++) {
			for (var i = 0; i < LEVEL_WIDTH; i++) {
				ctx.drawImage(waterImage, i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1); // Grid of water
			}
		}
	}

	if (hookReady) ctx.drawImage(hookImage, hook.x * BLOCK_SIZE, hook.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE); // Render hook image

	if (lineReady && lineLeftDownReady && lineRightDownReady && lineLeftUpReady && lineRightUpReady) { // Render line image
		for (var i = 0; i < hook.prev.length; i += 2) {
			if (hook.prev[i] > hook.prev[i + 2]) {
				ctx.drawImage(lineImageLeftDown, (hook.prev[i] - 1) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
				ctx.drawImage(lineImageLeftUp, (hook.prev[i]) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			} else if (hook.prev[i] < hook.prev[i + 2]) {
				ctx.drawImage(lineImageRightDown, (hook.prev[i] + 1) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
				ctx.drawImage(lineImageRightUp, (hook.prev[i]) * BLOCK_SIZE, (hook.prev[i + 1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			} else {
				ctx.drawImage(lineImage, hook.prev[i] * BLOCK_SIZE, hook.prev[i + 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			}
		}

		if (hook.x == hook.prev[hook.prev.length - 2] + 1) { // Account for left and right reverse hook movement graphics
			ctx.drawImage(lineImageRightDown, (hook.prev[hook.prev.length - 2] + 1) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.drawImage(waterImage, (hook.prev[hook.prev.length - 2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.drawImage(lineImageRightUp, (hook.prev[hook.prev.length-2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		} else if (hook.x == hook.prev[hook.prev.length - 2] - 1) {
			ctx.drawImage(lineImageLeftDown, (hook.prev[hook.prev.length - 2] - 1) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.drawImage(waterImage, (hook.prev[hook.prev.length - 2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			ctx.drawImage(lineImageLeftUp, (hook.prev[hook.prev.length - 2]) * BLOCK_SIZE, hook.prev[hook.prev.length - 1] * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}

	for (var i = 0; i < fishes.length; i++) { // Render fish
		if (fishes[i].fishImageRightReady && fishes[i].fishImageRightReady && !fishes[i].onBoat) {
			ctx.drawImage(fishes[i].fishImage, fishes[i].x * BLOCK_SIZE, fishes[i].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		}
	}

	for (var i = 0; i < rocks.length; i++) { // Render different types of rock
		if (rocks[i].rockImageCornerTopLeftReady && rocks[i].rockImageSingleReady && rocks[i].rockImageLeftReady && rocks[i].rockImageCornerTopRightReady && rocks[i].rockImageHorizTopReady &&
			rocks[i].rockImageVertLeftReady && rocks[i].rockImageHorizReady && rocks[i].rockImageRightReady && rocks[i].rockImageCenterReady && rocks[i].rockImageUpReady && rocks[i].rockImageVertRightReady &&
			rocks[i].rockImageCornerBottomLeftReady && rocks[i].rockImageVertReady && rocks[i].rockImageDownReady && rocks[i].rockImageCornerBottomRightReady && rocks[i].rockImageHorizBottomReady) {
			if (rocks[i].scaleX == 1 && rocks[i].scaleY == 1) { // Single rock
				ctx.drawImage(rocks[i].rockImageSingle, rocks[i].x * BLOCK_SIZE, rocks[i].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			} else if (rocks[i].scaleX > 1 && rocks[i].scaleY == 1) { // Scalable horizontal rock
				for (var r = rocks[i].x-rocks[i].scaleX + 1; r < rocks[i].x+rocks[i].scaleX; r++)
					ctx.drawImage(rocks[i].rockImageHoriz, r * BLOCK_SIZE, rocks[i].y * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE);

				ctx.drawImage(rocks[i].rockImageLeft, (rocks[i].x - rocks[i].scaleX) * BLOCK_SIZE, rocks[i].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
				ctx.drawImage(rocks[i].rockImageRight, (rocks[i].x + rocks[i].scaleX) * BLOCK_SIZE, rocks[i].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			} else if (rocks[i].scaleX == 1 && rocks[i].scaleY > 1) { // Scalable vertical rock
				for (var r = rocks[i].y-rocks[i].scaleY + 1; r < rocks[i].y+rocks[i].scaleY; r++)
					ctx.drawImage(rocks[i].rockImageVert, rocks[i].x * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE + 1);

				ctx.drawImage(rocks[i].rockImageUp, rocks[i].x * BLOCK_SIZE, (rocks[i].y - rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
				ctx.drawImage(rocks[i].rockImageDown, rocks[i].x * BLOCK_SIZE, (rocks[i].y + rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
			} else if (rocks[i].scaleX > 1 && rocks[i].scaleY > 1) { // Scalable block
				for (var r = rocks[i].x-rocks[i].scaleX + 1; r < rocks[i].x+rocks[i].scaleX; r++)
					ctx.drawImage(rocks[i].rockImageHorizTop, r * BLOCK_SIZE, (rocks[i].y - rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);

				for (var r = rocks[i].y-rocks[i].scaleY + 1; r < rocks[i].y+rocks[i].scaleY; r++)
					ctx.drawImage(rocks[i].rockImageVertLeft, (rocks[i].x - rocks[i].scaleX) * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);

				for (var rX = rocks[i].x-rocks[i].scaleX + 1; rX < rocks[i].x+rocks[i].scaleX; rX++)
					for (var rY = rocks[i].y-rocks[i].scaleY + 1; rY < rocks[i].y+rocks[i].scaleY; rY++)
						ctx.drawImage(rocks[i].rockImageCenter, rX * BLOCK_SIZE, rY * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);

				for (var r = rocks[i].y-rocks[i].scaleY + 1; r < rocks[i].y+rocks[i].scaleY; r++)
					ctx.drawImage(rocks[i].rockImageVertRight, (rocks[i].x + rocks[i].scaleX) * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE + 1);

				for (var r = rocks[i].x-rocks[i].scaleX + 1; r < rocks[i].x+rocks[i].scaleX; r++)
					ctx.drawImage(rocks[i].rockImageHorizBottom, r * BLOCK_SIZE, (rocks[i].y + rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE);

				ctx.drawImage(rocks[i].rockImageCornerTopRight, (rocks[i].x + rocks[i].scaleX) * BLOCK_SIZE, (rocks[i].y - rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);
				ctx.drawImage(rocks[i].rockImageCornerTopLeft, (rocks[i].x - rocks[i].scaleX) * BLOCK_SIZE, (rocks[i].y - rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);
				ctx.drawImage(rocks[i].rockImageCornerBottomLeft, (rocks[i].x - rocks[i].scaleX) * BLOCK_SIZE, (rocks[i].y + rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);
				ctx.drawImage(rocks[i].rockImageCornerBottomRight, (rocks[i].x + rocks[i].scaleX) * BLOCK_SIZE, (rocks[i].y + rocks[i].scaleY) * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);
			}
		}
	}
	document.getElementById('boat').src = `img/boat${PLAYER_CAUGHT}.png`;
}

function reelIn() {
	sleepTime /= 10;
	hook.reelIn = true;
	music.pause();
	reel.play();
}

function main() { update(); render(); sleep(sleepTime).then(() => { requestAnimationFrame(main) }); }
main();
loadLevel(LEVEL);
document.getElementById('score').innerText = PLAYER_SCORE;
