/*
     __                            .-'''-.               
...-'  |`. ..-'''-.               '   _    \             
|      |  |\.-'''\ \   /|       /   /` '.   \ /|         
....   |  |       | |  ||      .   |     \  ' ||         
  -|   |  |    __/ /   ||      |   '      |  '||         
   |   |  |   |_  '.   ||  __  \    \     / / ||  __     
...'   `--'      `.  \ ||/'__ '.`.   ` ..' /  ||/'__ '.  
|         |`.      \ '.|:/`  '. '  '-...-'`   |:/`  '. ' 
` --------\ |       , |||     | |             ||     | | 
 `---------'        | |||\    / '             ||\    / ' 
                   / ,'|/\'..' /              |/\'..' /  
           -....--'  / '  `'-'`               '  `'-'`   
           `.. __..-'                                    
*/
var canvas =				document.createElement("canvas");
var ctx =					canvas.getContext("2d");
canvas.width =				window.innerHeight;
canvas.height =				canvas.width;
canvas.setAttribute('style', "border-style:solid;border-width:9px;padding:0px 6px 6px 6px;position:absolute;left:50%;width:25%;margin-left:-12.5%;");
document.body.appendChild(canvas);
ctx.font =					"50px Arial";
ctx.textAlign =				"center";
ctx.fillStyle =				"white";
var LEVEL_WIDTH =			25,
	LEVEL_HEIGHT =			25,
	LEVEL =					0,
	BLOCK_SIZE =			canvas.width / LEVEL_WIDTH,
	sleepTime =				700,
	PLAYER_REELS =			0,
	PLAYER_CAUGHT =			0,
	PLAYER_SCORE =			0,
	PLAYER_SCORE_CHECK =	0;
var music =					new Audio('sound/the_fishing_hole_8bit.ogg');music.volume=0.25;
var reel =					new Audio('sound/reel_in.ogg');reel.volume=0.75;

function loadLevel(lvl) {
    var f = new XMLHttpRequest();
    f.open("GET", "lvls/"+lvl+".txt", false);
    f.onreadystatechange = function () {
    	if (f.readyState == 4 && (f.status === 200 || f.status == 0)) {
            var lines = f.responseText.split('\n');
            for (var i = 0; i < lines.length; i++) {
            	switch(lines[i].split('=')[0]) {
                	case "fish":
						var fishPoints = lines[i].split('=')[1].split('/');
						for (var l = 0; l < fishPoints.length; l++)
							fishes.push(fish(fishPoints[l].split(',')));
                	break;
                	case "rock":
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

function nextLevel() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fishes = [];
	rocks = [];
	PLAYER_REELS = 0;
	PLAYER_CAUGHT = 0;
	LEVEL += 1;
	loadLevel(LEVEL);
}

function sleep (time) { return new Promise((resolve) => setTimeout(resolve, time)); }

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
	var ret = {};
	ret.x = parseInt(waypoints[0]);
	ret.y = parseInt(waypoints[1]);
	ret.waypoints = waypoints;
	ret.point = 0;
	ret.direction = true;
	ret.caught = false;
	ret.onBoat = false;
	ret.counted = false;
	ret.blocks;
	ret.fishImageLeftReady = false;
	ret.fishImageRightReady = false;
	ret.fishImage = new Image();
	ret.fishImageLeft = new Image();
	ret.fishImageRight = new Image();
	ret.fishImageLeft.src = "img/fish_left.png";
	ret.fishImageRight.src = "img/fish_right.png";
	ret.fishImageLeft.onload = function() { ret.fishImageLeftReady = true; };
	ret.fishImageRight.onload = function() { ret.fishImageRightReady = true; };
	return ret;
} fishes = [];

function rock(x, y, scaleX, scaleY) {
	var ret = {};
	ret.x = parseInt(x);
	ret.y = parseInt(y);
	ret.scaleX = parseInt(scaleX);
	ret.scaleY = parseInt(scaleY);
	ret.rockImageSingleReady = false;
	ret.rockImageCornerTopLeftReady = false;
	ret.rockImageCornerTopRightReady = false;
	ret.rockImageCornerBottomLeftReady = false;
	ret.rockImageCornerBottomRightReady = false;
	ret.rockImageLeftReady = false;
	ret.rockImageHorizTopReady = false;
	ret.rockImageHorizReady = false;
	ret.rockImageHorizBottomReady = false;
	ret.rockImageRightReady = false;
	ret.rockImageCenterReady = false;
	ret.rockImageUpReady = false;
	ret.rockImageVertLeftReady = false;
	ret.rockImageVertReady = false;
	ret.rockImageVertRightReady = false;
	ret.rockImageDownReady = false;
	ret.rockImageSingle = new Image();
	ret.rockImageCornerTopLeft = new Image();
	ret.rockImageCornerTopRight = new Image();
	ret.rockImageCornerBottomLeft = new Image();
	ret.rockImageCornerBottomRight = new Image();
	ret.rockImageLeft = new Image();
	ret.rockImageHorizTop = new Image();
	ret.rockImageHoriz = new Image();
	ret.rockImageHorizBottom = new Image();
	ret.rockImageRight = new Image();
	ret.rockImageCenter = new Image();
	ret.rockImageUp = new Image();
	ret.rockImageVertLeft = new Image();
	ret.rockImageVert = new Image();
	ret.rockImageVertRight = new Image();
	ret.rockImageDown = new Image();
	ret.rockImageSingle.src = "img/rock_single.png";
	ret.rockImageCornerTopLeft.src = "img/rock_corner_top_left.png";
	ret.rockImageCornerTopRight.src = "img/rock_corner_top_right.png";
	ret.rockImageCornerBottomLeft.src = "img/rock_corner_bottom_left.png";
	ret.rockImageCornerBottomRight.src = "img/rock_corner_bottom_right.png";
	ret.rockImageLeft.src = "img/rock_left.png";
	ret.rockImageHorizTop.src = "img/rock_horiz_top.png";
	ret.rockImageHoriz.src = "img/rock_horiz.png";
	ret.rockImageHorizBottom.src = "img/rock_horiz_bottom.png"
	ret.rockImageRight.src = "img/rock_right.png";
	ret.rockImageCenter.src = "img/rock_center.png";
	ret.rockImageUp.src = "img/rock_up.png";
	ret.rockImageVertLeft.src = "img/rock_vert_left.png";
	ret.rockImageVert.src = "img/rock_vert.png";
	ret.rockImageVertRight.src = "img/rock_vert_right.png";
	ret.rockImageDown.src = "img/rock_down.png";
	ret.rockImageSingle.onload = function() { ret.rockImageSingleReady = true; };
	ret.rockImageCornerTopLeft.onload = function() { ret.rockImageCornerTopLeftReady = true; }
	ret.rockImageCornerTopRight.onload = function() { ret.rockImageCornerTopRightReady = true; }
	ret.rockImageCornerBottomLeft.onload = function() { ret.rockImageCornerBottomLeftReady = true; }
	ret.rockImageCornerBottomRight.onload = function() { ret.rockImageCornerBottomRightReady = true; }
	ret.rockImageLeft.onload = function() { ret.rockImageLeftReady = true; };
	ret.rockImageHorizTop.onload = function() { ret.rockImageHorizTopReady = true; };
	ret.rockImageHoriz.onload = function() { ret.rockImageHorizReady = true; };
	ret.rockImageHorizBottom.onload = function() { ret.rockImageHorizBottomReady = true; };
	ret.rockImageRight.onload = function() { ret.rockImageRightReady = true; };
	ret.rockImageCenter.onload = function() { ret.rockImageCenterReady = true; };
	ret.rockImageUp.onload = function() { ret.rockImageUpReady = true; };
	ret.rockImageVertLeft.onload = function() { ret.rockImageVertLeftReady = true; };
	ret.rockImageVert.onload = function() { ret.rockImageVertReady = true; };
	ret.rockImageVertRight.onload = function() { ret.rockImageVertRightReady = true; };
	ret.rockImageDown.onload = function() { ret.rockImageDownReady = true; };
	return ret;
} rocks = [];

var keysDown = {};
addEventListener("keydown", function(e) { keysDown[e.keyCode] = true; }, false);

var hookReady = false;
var hookImage = new Image();
hookImage.src = "img/hook.png";
hookImage.onload = function() { hookReady = true; };

var waterReady = false;
var waterImage = new Image();
waterImage.src = "img/water.png";
waterImage.onload = function() { waterReady = true; };

var lineReady = false;
var lineImage = new Image();
lineImage.src = "img/line.png";
lineImage.onload = function() { lineReady = true; };

var lineLeftDownReady = false;
var lineImageLeftDown = new Image();
lineImageLeftDown.src = "img/line_left_down.png";
lineImageLeftDown.onload = function() { lineLeftDownReady = true; };

var lineRightDownReady = false;
var lineImageRightDown = new Image();
lineImageRightDown.src = "img/line_right_down.png";
lineImageRightDown.onload = function() { lineRightDownReady = true; };

var lineLeftUpReady = false;
var lineImageLeftUp = new Image();
lineImageLeftUp.src = "img/line_left_up.png";
lineImageLeftUp.onload = function() { lineLeftUpReady = true; };

var lineRightUpReady = false;
var lineImageRightUp = new Image();
lineImageRightUp.src = "img/line_right_up.png";
lineImageRightUp.onload = function() { lineRightUpReady = true; };
