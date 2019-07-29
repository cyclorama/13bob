window.onload = () => {
	const canvas    = document.getElementById('canvas');
	let   winWidth  = canvas.width = window.innerWidth,
		  winHeight = canvas.height = window.innerHeight,
		  stage     = 0;
	const context   = canvas.getContext('2d'),
	      centerX   = winWidth / 2, centerY = winHeight / 2,
	      fontSize  = centerY / 8;

	['click', 'keydown', 'mousemove', 'wheel'].forEach(event => document.addEventListener(event, genCanvas));
	addEventListener('resize', () => {
		winWidth  = canvas.width = window.innerWidth;
		winHeight = canvas.height = window.innerHeight;
		genCanvas();
	});

	function init() {
		context.font = `Bold ${fontSize}px Arial`;
		context.textAlign = 'center';
		context.fillStyle = 'rgb(255, 255, 255)';

		document.body.style.backgroundColor = 'rgb(0, 0, 0)';

		['PRESS', 'PRESSE', 'DRÜCKEN SIE', 'LEHDISTÖ', 'TRYKKE', 'TRYCK',
		 'НАЖМИТЕ', 'صحافة', '按', '押す', '프레스', 'ΤΎΠΟΣ', 'ללחוץ', 'दबाएँ'].forEach((text, i) =>
		 	context.fillText(text, centerX, (centerY / 6) + (fontSize * i)));
	}

	function genCanvas() {
		const rgb = () => `rgb(${getRand(255)},${getRand(255)},${getRand(255)})`;

		clearScreen();
		context.fillStyle = document.body.style.backgroundColor = rgb();
		context.fillRect(0, 0, canvas.width, canvas.height);

		while (stage < 2) {
			const numOfShapes = getRand(25);

			context.globalCompositeOperation = stage < 1 ? 'none' : [
			'source-over', 'source-in', 'source-out',
			'source-atop', 'destination-over', 'destination-in',
			'destination-out', 'destination-atop', 'lighter',
			'copy', 'xor', 'multiply',
			'screen', 'overlay', 'darken',
			'lighten', 'color-dodge', 'color-burn',
			'hard-light', 'soft-light', 'difference',
			'exclusion', 'hue', 'saturation',
			'color', 'luminosity'][getRand(26)];

			for (let i = 0; i < numOfShapes; i++) {
				let width     = getRand(winWidth),
					height    = getRand(winHeight),
					bezStartX = getRand(winWidth),
					bezStartY = getRand(winHeight),
					bezEndX   = getRand(winWidth),
					bezEndY   = getRand(winHeight),
					conX      = getRand(winWidth),
					conY      = getRand(winHeight),
					fill      = getRand(2);
	
				context.lineWidth = getRand(50);
				context.strokeStyle = rgb();
				context.fillStyle = rgb();
	
				switch (getRand(5)) {
					case 0:
						drawLine(width, height, getRand(winWidth), getRand(winHeight));
						break;
					case 1:
						drawCircle(width, height, getRand(winHeight * 0.3));
						break;
					case 2:
						drawRectangle(width, height, getRand(winHeight * 0.3), getRand(winHeight * 0.3));
						break;
					case 3:
						drawTriangle(width, height, getRand(winHeight * 0.3), getRand(winHeight * 0.3));
						break;
					case 4:
						drawBezierCurve(bezStartX, bezStartY, conX, conY, bezEndX, bezEndY);
						break;
				}
				if (fill) context.fill();
			}
			stage++;
		}
		stage = 0;
	}

	function getRand(range) {
		return Math.floor(Math.random() * range);
	}

	function clearScreen() {
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	function drawLine(x1, y1, x2, y2) {
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.closePath();
		context.stroke();
	}

	function drawCircle(x, y, radius) {
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI);
		context.closePath();
		context.stroke();
	}

	function drawRectangle(x, y, width, height) {
		context.strokeRect(x, y, width, height);
	}

	function drawTriangle(x, y, width, height) {
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x - width / 2, y);
		context.lineTo(x , y - height);
		context.lineTo(x + width / 2, y);
		context.closePath();
		context.stroke();
	}

	function drawBezierCurve(cp1x, cp1y, cp2x, cp2y, x, y) {
		context.beginPath();
		context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
		context.closePath();
		context.stroke();
	}

	init();
}
