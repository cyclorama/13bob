window.onload = function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		centerX = width / 2, centerY = height / 2,
		mouseX, mouseY, mouseDist,
		pointAX, pointAY,
		pointBX, pointBY,
		pointCX, pointCY,
		pDist, qDist, rDist,
		autoX = 0, autoY = 0, pointAutoX, pointAutoY,
		movePointX = 0, movePointY = 0,
		scaleLock = width / 6;

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		mouseX = mousePos.x; mouseY = mousePos.y;
	}, false);

	function init() {
		mouseDist = (width / 6) + 1;
	}

	function update() {
		if (mouseX != null) mouseDist = getDistance(mouseX, mouseY, width / 2, height / 2);
		if (mouseDist > scaleLock) mouseDist = scaleLock + 1;

		movePointX = mouseDist > scaleLock ? pointAutoX : mouseX;
		movePointY = mouseDist > scaleLock ? pointAutoY : mouseY;

		pointAX = getCoordFromAngle(150, mouseDist).x;
		pointAY = getCoordFromAngle(150, mouseDist).y;
		pointBX = getCoordFromAngle(30, mouseDist).x;
		pointBY = getCoordFromAngle(30, mouseDist).y;
		pointCX = getCoordFromAngle(270, mouseDist).x;
		pointCY = getCoordFromAngle(270, mouseDist).y;

		pDist = parseInt(getDistance(centerX, centerY - mouseDist, movePointX, movePointY));
		qDist = parseInt(getDistance(centerX + pointAX, centerY + pointAY, movePointX, movePointY));
		rDist = parseInt(getDistance(centerX + pointBX, centerY + pointBY, movePointX, movePointY));

		pointAutoX = (width / 2) + getCoordFromAngle(autoX++, mouseDist).x;
		pointAutoY = (height / 2) + getCoordFromAngle(autoY++, mouseDist).y;
	}

	function render() {
		clearScreen();
		drawCircle(centerX, centerY, mouseDist, 'white');
		drawTriangle(centerX, centerY, mouseDist, 'red');
		drawLine(centerX, centerY - mouseDist, movePointX, movePointY, 'cyan'); // P
		drawLine(centerX + pointAX, centerY + pointAY, movePointX, movePointY, 'yellow'); // Q
		drawLine(centerX + pointBX, centerY + pointBY, movePointX, movePointY, 'magenta'); // R
		drawRectangle((centerX / 2) - (mouseDist / 2), centerY - (pDist / 2), 50, pDist, 'cyan'); // P
		drawRectangle(((centerX / 2) + 50) - (mouseDist / 2), centerY - (qDist / 2), 50, qDist, 'yellow'); // Q
		drawRectangle(((centerX / 2) + 100) - (mouseDist / 2), centerY - (rDist / 2), 50, rDist, 'magenta'); // R
	}

	function clearScreen() {
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	function drawLine(x1, y1, x2, y2, colour) {
		context.strokeStyle = colour;
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.closePath();
		context.stroke();
	}

	function drawCircle(x, y, radius, colour) {
		context.strokeStyle = colour;
		context.lineWidth = 5;
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI);
		context.closePath();
		context.stroke();
	}

	function drawRectangle(x, y, width, height, colour) {
		context.fillStyle = colour
		context.fillRect(x, y, width, height);
	}

	function drawTriangle(x, y, radius, colour) {
		context.strokeStyle = colour;
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(x, y - radius);
		context.lineTo(x + pointAX, y + pointAY);
		context.lineTo(x + pointBX, y + pointBY);
		context.lineTo(x + pointCX, y + pointCY);
		context.closePath();
		context.stroke();
	}

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	function getDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
	}

	function getCoordFromAngle(angle, distance) {
		angle *= Math.PI / 180
		return {
			x: distance * Math.cos(angle),
			y: distance * Math.sin(angle)
		};
	}
	function anim() { requestAnimationFrame(anim); render(); update(); } anim(); init();
}
