window.onload = function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		mouseX, mouseY, mouseDist, example = 0,
		pointAX, pointAY,
		pointBX, pointBY,
		pointCX, pointCY,
		pDist, qDist, rDist;

		canvas.addEventListener('mousemove', function(evt) {
		    var mousePos = getMousePos(canvas, evt);
		    mouseX = mousePos.x; mouseY = mousePos.y;
		}, false);

		function update() {
			mouseDist = getDistance(mouseX, mouseY, width / 2, height / 2);
			pointAX = getCoordFromAngle(150, mouseDist).x;
			pointAY = getCoordFromAngle(150, mouseDist).y;
			pointBX = getCoordFromAngle(30, mouseDist).x;
			pointBY = getCoordFromAngle(30, mouseDist).y;
			pointCX = getCoordFromAngle(270, mouseDist).x;
			pointCY = getCoordFromAngle(270, mouseDist).y;
			pDist = parseInt(getDistance(width / 2, (height / 2) - mouseDist, mouseX, mouseY));
			qDist = parseInt(getDistance((width / 2) + pointAX, (height / 2) + pointAY, mouseX, mouseY));
			rDist = parseInt(getDistance((width / 2) + pointBX, (height / 2) + pointBY, mouseX, mouseY));
		}

		function render() {
			clearScreen();
			//drawText(`P: ${pDist} / Q: ${qDist} / R: ${rDist}`, width / 4, height / 4, 'red');
			drawCircle(width / 2, height / 2, mouseDist, 0, 2 * Math.PI, 'white');



			drawRectangle(width / 5, (height / 2) - (pDist / 2), 100, pDist, 'cyan'); // P
			drawRectangle((width / 5) + 100, (height / 2) - (qDist / 2), 100, qDist, 'yellow'); // Q
			drawRectangle((width / 5) + 200, (height / 2) - (rDist / 2), 100, rDist, 'magenta'); // R

			switch(example) {
				case 0:
					drawTriangle(width / 2, height / 2, mouseDist, 'red');
					drawLine(width / 2, (height / 2) - mouseDist, mouseX, mouseY, 'cyan'); // P
					drawLine((width / 2) + pointAX, (height / 2) + pointAY, mouseX, mouseY, 'yellow'); // Q
					drawLine((width / 2) + pointBX, (height / 2) + pointBY, mouseX, mouseY, 'magenta'); // R
					break;
			}
		}

		function clearScreen() {
			context.fillStyle = 'black';
			context.fillRect(0, 0, canvas.width, canvas.height);
		}

		function drawText(text, x, y, colour) {
			context.font = '30px Arial';
			context.fillStyle = colour;
			context.fillText(text, x, y);
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

		function drawCircle(x, y, radius, sAngle, eAngle, colour) {
			context.strokeStyle = colour;
			context.lineWidth = 5;
			context.beginPath();
			context.arc(x, y, radius, sAngle, eAngle);
			context.closePath();
			context.stroke();
		}

		function drawRectangle(x, y, width, height, colour) {
			context.fillStyle = colour
			context.fillRect(x, y, width, height);
		}

		function drawTriangle(x, y, radius, colour) { // Equilateral
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
			angle *= Math.PI / 180 // To radians
			return {
				x: distance * Math.cos(angle),
				y: distance * Math.sin(angle)
			};
		}

		function anim() { requestAnimationFrame(anim); render(); update(); } anim();
}
