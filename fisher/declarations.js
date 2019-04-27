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
let LEVEL              = 0;
let BLOCK_SIZE         = canvas.width / LEVEL_WIDTH;
let sleepTime          = 700;
let PLAYER_REELS       = 0;
let PLAYER_CAUGHT      = 0;
let PLAYER_SCORE       = 0;
let PLAYER_SCORE_CHECK = 0;
let scores             = [];
let displayScores      = false;
const music            = new Audio('sound/the_fishing_hole_8bit.ogg');
const reel             = new Audio('sound/reel_in.ogg');
ctx.font               = 'Bold 42px Arial';
ctx.textAlign          = 'center';
music.volume           = 0.25;
reel.volume            = 0.75;

function loadLevel(lvl) {
    let f = new XMLHttpRequest();
    f.responseType = 'text';
    f.open('GET', 'levels.json', true);
    f.onreadystatechange = () => {
    	if (f.readyState == 4 && (f.status === 200 || f.status == 0)) {
			let json = JSON.parse(f.responseText);
			for (let i = 0; i < json.levels[lvl].fish.length; i++) {
				fishes.push(new Fish(json.levels[lvl].fish[i].waypoints));
			}
			for (let i = 0; i < json.levels[lvl].rocks.length; i++) {
				rocks.push(new Rock(json.levels[lvl].rocks[i].position.x, json.levels[lvl].rocks[i].position.y, json.levels[lvl].rocks[i].scale.x, json.levels[lvl].rocks[i].scale.y));
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
	return new Promise(resolve => setTimeout(resolve, time));
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

let gameImages = {
    hookImage: 'hook',
    waterImage: 'water',
    lineImage: 'line',
    lineImageLeftDown: 'line_left_down',
    lineImageRightDown: 'line_right_down',
	lineImageLeftUp: 'line_left_up',
	lineImageRightUp: 'line_right_up',
	fishImageLeft: 'fish_left',
	fishImageRight: 'fish_right',
	rockImageSingle: 'rock_single',
	rockImageCornerTopLeft: 'rock_corner_top_left',
	rockImageCornerTopRight: 'rock_corner_top_right',
	rockImageCornerBottomLeft: 'rock_corner_bottom_left',
	rockImageCornerBottomRight: 'rock_corner_bottom_right',
	rockImageLeft: 'rock_left',
	rockImageHorizTop: 'rock_horiz_top',
	rockImageHoriz: 'rock_horiz',
	rockImageHorizBottom: 'rock_horiz_bottom',
	rockImageRight: 'rock_right',
	rockImageCenter: 'rock_center',
	rockImageUp: 'rock_up',
	rockImageVertLeft: 'rock_vert_left',
	rockImageVert: 'rock_vert',
	rockImageVertRight: 'rock_vert_right',
	rockImageDown: 'rock_down'
};

Object.entries(gameImages).forEach(image => {
	gameImages[image[0]] = new Image();
    gameImages[image[0]].src = `img/${image[1]}.png`;
    gameImages[image[0]].onload = () => gameImages[image[0]].ready = true;
});

class Fish {
	constructor(waypoints) {
		this._fishImage = new Image();
		this._x         = waypoints[0].x;
		this._y         = waypoints[0].y;
		this._waypoints = waypoints;
		this._point     = 0;
		this._direction = true;
		this._caught    = false;
		this._onBoat    = false;
		this._counted   = false;
		this._blocks    = null;
	}

	get fishImage()       { return this._fishImage;     }

	get fishImageSrc()    { return this._fishImage.src; }
	set fishImageSrc(src) { this._fishImage.src = src;  }

	get x()               { return this._x;             }
	set x(x)              { this._x = x;                }

	get y()               { return this._y;             }
	set y(y)              { this._y = y;                }

	get waypoints()       { return this._waypoints;     }

	get point()           { return this._point;         }
	set point(point)      { this._point = point;        }
}

class Rock {
	constructor(x, y, scaleX, scaleY) {
		this._x      = x;
		this._y      = y;
		this._scaleX = scaleX;
		this._scaleY = scaleY;
	}

	get x()      { return this._x;      }
	set x(x)     { this._x = x;         }

	get y()      { return this._y;      }
	set y(y)     { this._y = y;         }

	get scaleX() { return this._scaleX; }
	get scaleY() { return this._scaleY; }
}

let fishes = [], rocks = [];

keysDown = {};
addEventListener('keydown', function(e) { keysDown[e.keyCode] = true; }, false);

hookImage = new Image();
hookImage.src = 'img/hook.png';
hookImageReady = hookImage.onload = () => hookImage.ready = true;

waterImage = new Image();
waterImage.src = 'img/water.png';
waterImageReady = waterImage.onload = () => waterImage.ready = true;

lineImage = new Image();
lineImage.src = 'img/line.png';
lineImageReady = lineImage.onload = () => lineImage.ready = true;

lineImageLeftDown = new Image();
lineImageLeftDown.src = 'img/line_left_down.png';
lineImageLeftDownReady = lineImageLeftDown.onload = () => lineImageLeftDown = true;

lineImageRightDown = new Image();
lineImageRightDown.src = 'img/line_right_down.png';
lineImageRightDownReady = lineImageRightDown.onload = () => lineImageRightDown = true;

lineImageLeftUp = new Image();
lineImageLeftUp.src = 'img/line_left_up.png';
lineImageLeftUpReady = lineImageLeftUp.onload = () => lineImageLeftUp = true;

lineImageRightUp = new Image();
lineImageRightUp.src = 'img/line_right_up.png';
lineImageRightUpReady = lineImageRightUp.onload = () => lineImageRightUp = true;
