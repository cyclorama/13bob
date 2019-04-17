const canvas           = document.createElement('canvas');
const ctx              = canvas.getContext('2d');
canvas.width           = window.innerHeight;
canvas.height          = canvas.width;
canvas.setAttribute('style', 'border-style:solid;border-width:9px;padding:0px 6px 6px 6px;position:absolute;left:50%;width:25%;margin-left:-12.5%;');
document.body.appendChild(canvas);
ctx.textAlign          = 'center';
ctx.fillStyle          = 'white';
const LEVEL_WIDTH      = 25;
const LEVEL_HEIGHT     = 25;
let LEVEL              = 5;
let BLOCK_SIZE         = canvas.width / LEVEL_WIDTH;
let sleepTime          = 700;
let PLAYER_REELS       = 0;
let PLAYER_CAUGHT      = 0;
let PLAYER_SCORE       = 0;
let PLAYER_SCORE_CHECK = 0;
let scores             = [];
let displayScores      = false;
const music            = new Audio('sound/the_fishing_hole_8bit.ogg');music.volume=0.25;
const reel             = new Audio('sound/reel_in.ogg');reel.volume=0.75;
ctx.font               = 'Bold 42px Arial';
ctx.textAlign          = 'center';

function loadLevel(lvl) {
    let f = new XMLHttpRequest();
    f.responseType = 'text';
    f.open('GET', 'levels.json', true);
    f.onreadystatechange = () => {
    	if (f.readyState == 4 && (f.status === 200 || f.status == 0)) {
			let json = JSON.parse(f.responseText);
			for (let i = 0; i < Object.keys(json.levels[lvl].fish).length; i++) {
				fishes.push(new fish(json.levels[lvl].fish[i].waypoints));
			}
			for (let i = 0; i < Object.keys(json.levels[lvl].rocks).length; i++) {
				rocks.push(new rock(json.levels[lvl].rocks[i].position.x, json.levels[lvl].rocks[i].position.y, json.levels[lvl].rocks[i].scale.x, json.levels[lvl].rocks[i].scale.y));
			}
        }
    }
    f.send(null);
}

function menu() {
	['← & → TO MOVE',
	'↓ TO SPEED UP',
	'[SPACE] TO REEL OUT & IN',
	'[PRESS ANY KEY TO PLAY]'].forEach((txt, i) => {
		ctx.fillText(txt, canvas.width / 2, canvas.height / 2 + (i * 100) - 150);
	});
	window.addEventListener('keydown', start);
}

let start = () => {
	window.removeEventListener('keydown', start);
	main();
};

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function nextLevel() {
	console.clear();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	music.currentTime = 0;
	fishes = [];
	rocks = [];
	PLAYER_REELS = 0;
	PLAYER_CAUGHT = 0;
	LEVEL++;
	loadLevel(LEVEL);
}

hook = {
	x: 12,
	y: 0,
	startX: 12,
	startY: 0,
	prev: [],
	casting: false,
	reelIn: false
};

function reelIn() {
	sleepTime /= 10;
	hook.reelIn = true;
	music.pause();
	reel.play();
}

function fish(waypoints) {
	fishImage = new Image(),
	fishImageLeft = new Image(),
	fishImageRight = new Image(),
	fishImageLeft.src = 'img/fish_left.png',
	fishImageRight.src = 'img/fish_right.png';

	return {
		x: waypoints[0].x,
		y: waypoints[0].y,
		waypoints: waypoints,
		point: 0,
		direction: true,
		caught: false,
		onBoat: false,
		counted: false,
		blocks: null,
		fishImage: fishImage,
		fishImageLeft: fishImageLeft,
		fishImageRight: fishImageRight,
		fishImageLeftReady: fishImageLeft.onload = () => { return true; },
		fishImageRightReady: fishImageRight.onload = () => { return true; }
	};
} fishes = [];

function rock(x, y, scaleX, scaleY) {
	rockImageSingle = new Image(),
	rockImageCornerTopLeft = new Image(),
	rockImageCornerTopRight = new Image(),
	rockImageCornerBottomLeft = new Image(),
	rockImageCornerBottomRight = new Image(),
	rockImageLeft = new Image(),
	rockImageHorizTop = new Image(),
	rockImageHoriz = new Image(),
	rockImageHorizBottom = new Image(),
	rockImageRight = new Image(),
	rockImageCenter = new Image(),
	rockImageUp = new Image(),
	rockImageVertLeft = new Image(),
	rockImageVert = new Image(),
	rockImageVertRight = new Image(),
	rockImageDown = new Image();
	rockImageSingle.src = 'img/rock_single.png',
	rockImageCornerTopLeft.src = 'img/rock_corner_top_left.png',
	rockImageCornerTopRight.src = 'img/rock_corner_top_right.png',
	rockImageCornerBottomLeft.src = 'img/rock_corner_bottom_left.png',
	rockImageCornerBottomRight.src = 'img/rock_corner_bottom_right.png',
	rockImageLeft.src = 'img/rock_left.png',
	rockImageHorizTop.src = 'img/rock_horiz_top.png',
	rockImageHoriz.src = 'img/rock_horiz.png',
	rockImageHorizBottom.src = 'img/rock_horiz_bottom.png',
	rockImageRight.src = 'img/rock_right.png',
	rockImageCenter.src = 'img/rock_center.png',
	rockImageUp.src = 'img/rock_up.png',
	rockImageVertLeft.src = 'img/rock_vert_left.png',
	rockImageVert.src = 'img/rock_vert.png',
	rockImageVertRight.src = 'img/rock_vert_right.png',
	rockImageDown.src = 'img/rock_down.png';

	return {
		x: x,
		y: y,
		scaleX: scaleX,
		scaleY: scaleY,
		rockImageSingle: rockImageSingle,
		rockImageCornerTopLeft: rockImageCornerTopLeft,
		rockImageCornerTopRight: rockImageCornerTopRight,
		rockImageCornerBottomLeft: rockImageCornerBottomLeft,
		rockImageCornerBottomRight: rockImageCornerBottomRight,
		rockImageLeft: rockImageLeft,
		rockImageHorizTop: rockImageHorizTop,
		rockImageHoriz: rockImageHoriz,
		rockImageHorizBottom: rockImageHorizBottom,
		rockImageRight: rockImageRight,
		rockImageCenter: rockImageCenter,
		rockImageUp: rockImageUp,
		rockImageVertLeft: rockImageVertLeft,
		rockImageVert: rockImageVert,
		rockImageVertRight: rockImageVertRight,
		rockImageDown: rockImageDown,
		rockImageSingleReady: rockImageSingle.onload = () => { return true; },
		rockImageCornerTopLeftReady: rockImageCornerTopLeft.onload = () => { return true; },
		rockImageCornerTopRightReady: rockImageCornerTopRight.onload = () => { return true; },
		rockImageCornerBottomLeftReady: rockImageCornerBottomLeft.onload = () => { return true; },
		rockImageCornerBottomRightReady: rockImageCornerBottomRight.onload = () => { return true; },
		rockImageLeftReady: rockImageLeft.onload = () => { return true; },
		rockImageHorizTopReady: rockImageHorizTop.onload = () => { return true; },
		rockImageHorizReady: rockImageHoriz.onload = () => { return true; },
		rockImageHorizBottomReady: rockImageHorizBottom.onload = () => { return true; },
		rockImageRightReady: rockImageRight.onload = () => { return true; },
		rockImageCenterReady: rockImageCenter.onload = () => { return true; },
		rockImageUpReady: rockImageUp.onload = () => { return true; },
		rockImageVertLeftReady: rockImageVertLeft.onload = () => { return true; },
		rockImageVertReady: rockImageVert.onload = () => { return true; },
		rockImageVertRightReady: rockImageVertRight.onload = () => { return true; },
		rockImageDownReady: rockImageDown.onload = () => { return true; }
	};
} rocks = [];

keysDown = {};
addEventListener('keydown', function(e) { keysDown[e.keyCode] = true; }, false);

hookImage = new Image();
hookImage.src = 'img/hook.png';
hookImageReady = hookImage.onload = () => { return true; };

waterImage = new Image();
waterImage.src = 'img/water.png';
waterImageReady = waterImage.onload = () => { return true; };

lineImage = new Image();
lineImage.src = 'img/line.png';
lineImageReady = lineImage.onload = () => { return true; };

lineImageLeftDown = new Image();
lineImageLeftDown.src = 'img/line_left_down.png';
lineImageLeftDownReady = lineImageLeftDown.onload = () => { return true; };

lineImageRightDown = new Image();
lineImageRightDown.src = 'img/line_right_down.png';
lineImageRightDownReady = lineImageRightDown.onload = () => { return true; };

lineImageLeftUp = new Image();
lineImageLeftUp.src = 'img/line_left_up.png';
lineImageLeftUpReady = lineImageLeftUp.onload = () => { return true; };

lineImageRightUp = new Image();
lineImageRightUp.src = 'img/line_right_up.png';
lineImageRightUpReady = lineImageRightUp.onload = () => { return true; };
