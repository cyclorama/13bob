var canvas =				document.createElement('canvas'),
ctx =						canvas.getContext('2d');
canvas.width =				window.innerHeight;
canvas.height =				canvas.width;
canvas.setAttribute('style', 'border-style:solid;border-width:9px;padding:0px 6px 6px 6px;position:absolute;left:50%;width:25%;margin-left:-12.5%;');
document.body.appendChild(canvas);
ctx.font =					'50px Arial';
ctx.textAlign =				'center';
ctx.fillStyle =				'white';
var LEVEL_WIDTH =			25,
	LEVEL_HEIGHT =			25,
	LEVEL =					0,
	BLOCK_SIZE =			canvas.width / LEVEL_WIDTH,
	sleepTime =				700,
	PLAYER_REELS =			0,
	PLAYER_CAUGHT =			0,
	PLAYER_SCORE =			0,
	PLAYER_SCORE_CHECK =	0,
	music =					new Audio('sound/the_fishing_hole_8bit.ogg');music.volume=0.25;
	reel =					new Audio('sound/reel_in.ogg');reel.volume=0.75;

function loadLevel(lvl) {
    var f = new XMLHttpRequest();
    f.responseType = 'text';
    f.open('GET', `lvls/${lvl}.txt`, true);
    f.onreadystatechange = function () {
    	if (f.readyState == 4 && (f.status === 200 || f.status == 0)) {
            var lines = f.responseText.split('\n');
            for (var i = 0; i < lines.length; i++) {
            	switch(lines[i].split('=')[0]) {
                	case 'fish':
						var fishPoints = lines[i].split('=')[1].split('/');
						for (var l = 0; l < fishPoints.length; l++)
							fishes.push(fish(fishPoints[l].split(',')));
                	break;
                	case 'rock':
                		var rockPoints = lines[i].split('=')[1].split('/');
                		for (var l = 0; l < rockPoints.length; l++) {
                			var rockX = rockPoints[l].split('.')[0].split(',')[0];
                			var rockY = rockPoints[l].split('.')[0].split(',')[1];
                			var rockScaleX = rockPoints[l].split('.')[1].split(',')[0];
                			var rockScaleY = rockPoints[l].split('.')[1].split(',')[1];
                			rocks.push(rock(rockX, rockY, rockScaleX, rockScaleY));
                		}
                	break;
                }
            }
        }
    }
    f.send(null);
}

function sleep (time) { return new Promise((resolve) => setTimeout(resolve, time)); }

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

var hook = {
	x: 12,
	y: 0,
	startX: 12,
	startY: 0,
	prev: [],
	casting: false,
	reelIn: false
};

function fish(waypoints) {
	fishImage = new Image(),
	fishImageLeft = new Image(),
	fishImageRight = new Image(),
	fishImageLeft.src = 'img/fish_left.png',
	fishImageRight.src = 'img/fish_right.png';

	return {
		x: parseInt(waypoints[0]),
		y: parseInt(waypoints[1]),
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
		fishImageLeftReady: fishImageLeft.onload = function() { return true; },
		fishImageRightReady: fishImageRight.onload = function() { return true; }
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
		x: parseInt(x),
		y: parseInt(y),
		scaleX: parseInt(scaleX),
		scaleY: parseInt(scaleY),
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
		rockImageSingleReady: rockImageSingle.onload = function() { return true; },
		rockImageCornerTopLeftReady: rockImageCornerTopLeft.onload = function() { return true; },
		rockImageCornerTopRightReady: rockImageCornerTopRight.onload = function() { return true; },
		rockImageCornerBottomLeftReady: rockImageCornerBottomLeft.onload = function() { return true; },
		rockImageCornerBottomRightReady: rockImageCornerBottomRight.onload = function() { return true; },
		rockImageLeftReady: rockImageLeft.onload = function() { return true; },
		rockImageHorizTopReady: rockImageHorizTop.onload = function() { return true; },
		rockImageHorizReady: rockImageHoriz.onload = function() { return true; },
		rockImageHorizBottomReady: rockImageHorizBottom.onload = function() { return true; },
		rockImageRightReady: rockImageRight.onload = function() { return true; },
		rockImageCenterReady: rockImageCenter.onload = function() { return true; },
		rockImageUpReady: rockImageUp.onload = function() { return true; },
		rockImageVertLeftReady: rockImageVertLeft.onload = function() { return true; },
		rockImageVertReady: rockImageVert.onload = function() { return true; },
		rockImageVertRightReady: rockImageVertRight.onload = function() { return true; },
		rockImageDownReady: rockImageDown.onload = function() { return true; }
	};
} rocks = [];

var keysDown = {};
addEventListener('keydown', function(e) { keysDown[e.keyCode] = true; }, false);

var hookReady = false;
var hookImage = new Image();
hookImage.src = 'img/hook.png';
hookImage.onload = function() { hookReady = true; };

var waterReady = false;
var waterImage = new Image();
waterImage.src = 'img/water.png';
waterImage.onload = function() { waterReady = true; };

var lineReady = false;
var lineImage = new Image();
lineImage.src = 'img/line.png';
lineImage.onload = function() { lineReady = true; };

var lineLeftDownReady = false;
var lineImageLeftDown = new Image();
lineImageLeftDown.src = 'img/line_left_down.png';
lineImageLeftDown.onload = function() { lineLeftDownReady = true; };

var lineRightDownReady = false;
var lineImageRightDown = new Image();
lineImageRightDown.src = 'img/line_right_down.png';
lineImageRightDown.onload = function() { lineRightDownReady = true; };

var lineLeftUpReady = false;
var lineImageLeftUp = new Image();
lineImageLeftUp.src = 'img/line_left_up.png';
lineImageLeftUp.onload = function() { lineLeftUpReady = true; };

var lineRightUpReady = false;
var lineImageRightUp = new Image();
lineImageRightUp.src = 'img/line_right_up.png';
lineImageRightUp.onload = function() { lineRightUpReady = true; };
