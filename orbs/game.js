window.onload = function() {
	let canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		blockSize = canvas.width / 100,
		centerX = (window.innerWidth / blockSize) / 2,
		centerY = (window.innerHeight / blockSize) / 2,
		levels = [
		[ [ [centerX, centerY / 3], [centerX, centerY / 1.28],[centerX / 2, centerY] ], [ [centerX, centerY * 0.55, 400, 25] ] ],
		[ [ [centerX, centerY / 4], [centerX, centerY / 2], [centerX, centerY * 1.5], [centerX / 4, centerX * 2], [centerX * 1.25, centerY] ], [ [centerX, centerY * 0.75, 400, 25] ] ]
		], lvl = 0, // levels[level_number][0 - orbs, 1 - walls][0 - orb/wall one, 1 - orb/wall two, 2 - orb/wall three][0 - x, 1 - y, 2 - width, 3 - height]
		ball = particle.create(width / 2, height / 2, 0, 0, 0);
		ball.radius = 10;
		ball.mass = 10;
		attract = false,
		mouseX = 0,
		mouseY = 0,
		particles = [], walls = [],
		targetX = 0,
		targetY = 0,
		pressedOrbX = 0,
		pressedOrbY = 0;

		sineWave = new Pizzicato.Sound({
			source: 'wave',
		    options: {
		    	frequency: -1,
		    	volume: 0.05
		    }
		});

	function loadLevel(lvl) {
		targetX = levels[lvl][0][0][0]; // First particle is always the target
		targetY = levels[lvl][0][0][1]; // ''

		console.clear();
		console.log(`target {\nx: ${targetX * blockSize}\ny: ${targetY * blockSize}\n}`);

		levels[lvl][0].forEach((orb, i) => {
			console.log(`orb[${i}] {\nx: ${orb[0] * blockSize}\ny: ${orb[1] * blockSize}\n}`);
			let p = particle.create(orb[0] * blockSize, orb[1] * blockSize, 0, 0, 0);
			p.radius = 20;
			p.mass = 1000;
			particles.push(p);
		});

		levels[lvl][1].forEach((wall, i) => {
			console.log(`wall[${i}] {\nx: ${wall[0] * blockSize}\ny: ${wall[1] * blockSize}\nwidth: ${wall[2]}\nheight: ${wall[3]}\n}`);
			walls.push(wall);
		})
	}

	function reset() {
		ball.position.setX(width / 2);
		ball.position.setY(height / 2);
		ball.velocity = vector.create(0, 0);
	}

	function init() {
		document.body.addEventListener('mousedown', event => {
			mouseX = event.clientX, mouseY = event.clientY;

			particles.forEach((p, i) => {
				if (i != 0 && p.distanceTo(particle.create(mouseX, mouseY, 0, 0, 0)) <= p.radius) {
					attract = true;
					sineWave.play();
				}
			});
		});

		document.body.addEventListener('mouseup', event => {
			attract = false;
			sineWave.stop();
		});

		loadLevel(lvl );
	}

	function update() {
		ball.update();

		if (attract) {
			particles.forEach(p => {
				if (p.distanceTo(particle.create(mouseX, mouseY, 0, 0, 0)) <= p.radius) {
					pressedOrbX = p.position.getX();
					pressedOrbY = p.position.getY();
					sineWave.frequency = ball.distanceTo(p);
					ball.gravitateTo(p);
				}
			});
		}

		particles.forEach((p, i) => {
			if (i == 0 && p.distanceTo(ball) <= p.radius + ball.radius) {
				particles = [];
				ball.position.setX(width / 2);
				ball.position.setY(height / 2);
				ball.velocity = vector.create(0, 0);
				lvl++;
				loadLevel(lvl);
			} else if (p.distanceTo(ball) <= ball.radius + p.radius) {
				ball.position.setX(width / 2);
				ball.position.setY(height / 2);
				ball.velocity = vector.create(0, 0);
			}
		});

		walls.forEach(wall => {
			if (ball.position.getX() > ((wall[0] * blockSize) - (wall[2] / 2)) - ball.radius &&
				ball.position.getY() > ((wall[1] * blockSize) - (wall[3] / 2)) - ball.radius &&
				ball.position.getX() < ((wall[0] * blockSize) + (wall[2] / 2)) + ball.radius &&
				ball.position.getY() < ((wall[1] * blockSize) + (wall[3] / 2)) + ball.radius) {
				reset();
			}
		});

		if (ball.position.getX() < 0 ||
			ball.position.getY() < 0 ||
			ball.position.getX() > width ||
			ball.position.getY() > height) {
			reset();
		}
	}

	function render() {
		ctx.fillStyle = 'navy';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (attract) {
			ctx.strokeStyle = '#ff0000';
			ctx.beginPath();
			ctx.moveTo(ball.position.getX(), ball.position.getY());
			ctx.lineTo(pressedOrbX, pressedOrbY);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.arc(pressedOrbX, pressedOrbY, 35 - Math.sin((Math.PI / 180) * ball.distanceTo(particle.create(pressedOrbX, pressedOrbY, 0, 0, 0)) * 20), 0, 2 * Math.PI);
			ctx.stroke(); 
			ctx.closePath();
		}

		ctx.lineWidth = 2;
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.arc(ball.position.getX(), ball.position.getY(), ball.radius, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		particles.forEach((p, i) => {
			ctx.beginPath();
			ctx.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
			ctx.fill();

			if (i == 0)
				ctx.strokeStyle = '#ff0000'; else ctx.strokeStyle = 'black';

			ctx.stroke();
			ctx.closePath();
		});

		walls.forEach(wall => {
			ctx.beginPath();
			ctx.fillRect((wall[0] * blockSize) - (wall[2] / 2), (wall[1] * blockSize) - (wall[3] / 2), wall[2], wall[3]);
			ctx.strokeRect((wall[0] * blockSize) - (wall[2] / 2), (wall[1] * blockSize) - (wall[3] / 2), wall[2], wall[3]);
			ctx.closePath();
		});
	}		
	function anim() { requestAnimationFrame(anim); render(); update(); } anim(); init();
}
