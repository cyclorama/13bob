window.onload = () => {
	const canvas    = document.getElementById('canvas'),
	      context   = canvas.getContext('2d'),
	      winWidth  = canvas.width = window.innerWidth,
	      winHeight = canvas.height = window.innerHeight,
	      centerX   = winWidth / 2, centerY = winHeight / 2,
	      colours   = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white'],
	      fontSize  = centerY / 8;

	window.addEventListener('keyup', event => {
		if (event.keyCode == 32) {
			let numOfShapes = Math.floor(Math.random() * 100);

			clearScreen();
			context.fillStyle = colours[Math.floor(Math.random() * colours.length)];
			context.fillRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < numOfShapes; i++) {
				let width     = Math.floor(Math.random() * winWidth),
				    height    = Math.floor(Math.random() * winHeight),
				    scale     = Math.floor(Math.random() * (winHeight * 0.3)),
				    fill      = Math.floor(Math.random() * 2),
				    colour    = colours[Math.floor(Math.random() * colours.length)],
				    bezStartX = Math.floor(Math.random() * winWidth),
				    bezStartY = Math.floor(Math.random() * winHeight),
				    bezEndX   = Math.floor(Math.random() * winWidth),
				    bezEndY   = Math.floor(Math.random() * winHeight),
				    conX      = Math.floor(Math.random() * winWidth),
				    conY      = Math.floor(Math.random() * winHeight);

				switch (Math.floor(Math.random() * 4)) {
					case 0:
						drawCircle(width, height, scale, colour, fill);
						break;
					case 1:
						drawRectangle(width, height, Math.floor(Math.random() * (winHeight * 0.3)), Math.floor(Math.random() * (winHeight * 0.3)), colour, fill);
						break;
					case 2:
						drawTriangle(width, height, scale, colour, fill);
						break;
					case 3:
						drawBezierCurve(bezStartX, bezStartY, conX, conY, bezEndX, bezEndX, 'white');
						break;
				}
			}
		}
	}, false);

	function init() {
		context.font = `${fontSize}px arial`;
		context.textAlign = 'center';
		context.fillStyle = 'white';

		['PRESS SPACE', 'APPUYER SUR ESPACE', 'LEERTASTE DRÜCKEN', 'PAINA TILAA', 'TRYK PÅ PLADS',
		'TRYCK PÅ MELLANSLAG', 'ПРЕСС ПРОСТРАНСТВО', 'اضغط على زر المسافة', '按空格', 'プレススペース',
		'보도 자료', 'ΠΑΤΉΣΤΕ ΚΕΝΌ', 'לחץ רווח', 'स्पेस बार दबाये'].forEach((text, i) => {
			context.fillText(text, centerX, 70 + (fontSize * i));
		});
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

	function drawCircle(x, y, radius, colour, fill) {
		context.strokeStyle = colour;
		context.lineWidth = 5;
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI);
		context.closePath();
		context.stroke();

		if (fill) {
			context.fillStyle = colour;
			context.fill();
		}
	}

	function drawRectangle(x, y, width, height, colour, fill) {
		context.strokeStyle = colour;
		context.strokeRect(x, y, width, height);

		if (fill) {
			context.fillStyle = colour;
			context.fillRect(x, y, width, height);
		}
	}

	function drawTriangle(x, y, radius, colour, fill) {
		context.strokeStyle = colour;
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x - radius / 2, y);
		context.lineTo(x , y - radius);
		context.lineTo(x + radius / 2, y);
		context.closePath();
		context.stroke();

		if (fill) { 
			context.fillStyle = colour;
			context.fill();
		}
	}

	function drawBezierCurve(cp1x, cp1y, cp2x, cp2y, x, y, colour) {
		context.strokeStyle = colour;
		context.beginPath();
		context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
		context.closePath();
		context.stroke();
	}
	
	init();
}
