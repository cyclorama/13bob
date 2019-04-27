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

	Object.values(gameImages).forEach(image => {
		console.log(image.ready);
	});

	if (Object.values(gameImages).some(image => image.ready != true)) {
		window.addEventListener('keydown', start);
	}
}

function start() {
	window.removeEventListener('keydown', start);
	main();
};

function sleep(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

function nextLevel() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	music.currentTime = 0;
	fishes = [];
	rocks = [];
	PLAYER_REELS = 0;
	PLAYER_CAUGHT = 0;
	LEVEL++;
	loadLevel(LEVEL);
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

class Hook {
    constructor() {
		this._x = 12;
		this._y = 0;
		this._startX = this._x,
		this._startY = this._y,
		this._prev = [],
		this._casting =  false,
		this._reelIn = false
	}

	get x()            { return this._x;        }
	set x(x)           { this._x = x;           }

	get y()            { return this._y;        }
	set y(y)           { this._y = y;           }

	get startX()       { return this._startX;   }
	set startX(startX) { this._startX = startX; }

	get startY()       { return this._startY;   }
	set startY(startY) { this._startY = startY; }

	get casting()      { return this._casting;  }
	set casting(cast)  { this._casting = cast;  }

	get prev()         { return this._prev;     }

	get reelIn()       { return this._reelIn;   }

	update() {
		if (this._reelIn) {
			this.reverseHook();
		} else {
			if (40 in keysDown) { // DOWN ARROW - Speed up
				sleepTime = 70;
				keysDown = [];
			} else {
				sleepTime = 700;
			}
	
			if (32 in keysDown) { // SPACEBAR - Reel in
				if (!this._casting) {
					PLAYER_REELS++;
					this._casting = true;
					music.play();
					keysDown = [];
				} else {
					sleepTime /= 10;
					this._casting = false;
					this._reelIn = true;
					music.pause();
					reel.play();
					keysDown = [];
				}
			}
			this.moveHook();
		}
		this.checkCollision();
	}

	render() {

	}

	checkCollision() {
		for (let i = 0; i < rocks.length; i++) {
			if (rocks[i].scaleX == 1) {
				if (this._x == rocks[i].x &&
					this._y > rocks[i].y - rocks[i].scaleY - 1 &&
					this._y < rocks[i].y + rocks[i].scaleY + 1) {
					this.reelHook();
				}
			} else if (	this._x > rocks[i].x - (rocks[i].scaleX + 1) &&
						this._x < rocks[i].x + (rocks[i].scaleX + 1) &&
						this._y > rocks[i].y - (rocks[i].scaleY + 1) &&
						this._y < rocks[i].y + (rocks[i].scaleY + 1)) {
				this.reelHook();
			}
		}
	}

	moveHook() {
		if (this._casting && this._y < LEVEL_HEIGHT - 1) { // Save previous X and Y hook positions and move hook down
			if (37 in keysDown) {
				this._x -= 1; keysDown = []; // LEFT ARROW - Move left
			}
			if (39 in keysDown) {
				this._x += 1; keysDown = []; // RIGHT ARROW - Move right
			}

			this._prev.push(this._x);
			this._prev.push(this._y);
			this._y += 1;
		}
	}

	reverseHook() {
		if (this._x != this._startX || this._y != this._startY) {
			this._y = this._prev.pop();
			this._x = this._prev.pop();
		} else {
			this._casting = false;
			this._reelIn = false;
			sleepTime *= 10;

			if (this._x == this._startX && this._y == this._startY) {
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
					} else {
						nextLevel();
					}
				}
			}
		}
	}

	reelHook() {
		sleepTime /= 10;
		this._reelIn = true;
		music.pause();
		reel.play();
	}
}

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
	set fishImage(image)  { this._fishImage = image;    }

	get fishImageSrc()    { return this._fishImage.src; }
	set fishImageSrc(src) { this._fishImage.src = src;  }

	get x()               { return this._x;             }
	set x(x)              { this._x = x;                }

	get y()               { return this._y;             }
	set y(y)              { this._y = y;                }

	get waypoints()       { return this._waypoints;     }

	get point()           { return this._point;         }
	set point(point)      { this._point = point;        }

	get onBoat()          { return this._onBoat;        }

	update() {
		this.updateCount();
		this.updatePos();
	}

	render() {

	}

	updateCount() {
		if (hook.reelIn && hook.x == hook.startX && hook.y == hook.startY) {
			if (this._caught && !this._counted) {
				this._counted = true;
				PLAYER_CAUGHT++;
			}
		}
	}

	updatePos() {
		if (hook.reelIn && this._x == hook.x && (this._y == hook.y || this._y == hook.y - 1 || this._y == hook.y + 1)) {
			this._caught = true;
		}

		if (this._x == 12 && this._y == 0) {
			this._onBoat = true;
		}

		if (this._caught) {
			this._x = hook.x;
			this._y = hook.y;
		} else {
			if (this._x < this._waypoints[this._point].x) {
				this._x++;

				if (this._fishImageSrc != gameImages.fishImageRight.src) {
					this._fishImage = gameImages.fishImageRight;
				}
			}

			if (this._x > this._waypoints[this._point].x) {
				this._x--;

				if (this._fishImageSrc != gameImages.fishImageLeft.src) {
					this._fishImage = gameImages.fishImageLeft;
				}
			}

			if (this._x == this._waypoints[this._point].x && this._y < this._waypoints[this._point].y) {
				this._y++;
			}

			if (this._x == this._waypoints[this._point].x && this._y > this._waypoints[this._point].y) {
				this._y--;
			}

			if (this._x == this._waypoints[this._point].x && this._y == this._waypoints[this._point].y) {
				this._point += (this._point < this._waypoints.length - 1) ? 1 : -(this._waypoints.length - 1);
			}
		}
	}
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

let hook = new Hook(), fishes = [], rocks = [], keysDown = {};

addEventListener('keydown', function(e) { keysDown[e.keyCode] = true; }, false);
