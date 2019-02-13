window.onload = function() {
	let canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		blockSize = canvas.width / 100,
		centerX = (window.innerWidth / blockSize) / 2,
		centerY = (window.innerHeight / blockSize) / 2,
		levels = [
		[ [ [centerX, centerY / 3], [centerX, centerY / 1.25], [centerX / 2, centerY] ], [ [centerX, centerY * 0.5, centerX / 2, 50] ] ],
		[ [ [centerX, centerY / 4], [centerX, centerY / 2], [centerX / 3, centerY] ], [centerX / 4, centerX * 2] ]
		], lvl = 0; // levels[level_number][0 - orbs, 1 - walls][0][0]

		ball = particle.create(width / 2, height / 2, 0, 0, 0);
		ball.radius = 10;
		ball.mass = 10;
		attract = false;
		mouseX = 0;
		mouseY = 0;
		particles = [], walls = [];

		targetX = 0;
		targetY = 0;

		sineWave = new Pizzicato.Sound({
			source: 'wave',
		    options: {
		    	frequency: -1,
		    	volume: 0.05
		    }
		});

	function loadLevel(lvl) {
		targetX = levels[lvl][0][0][0];
		targetY = levels[lvl][0][0][1];
		walls.push(levels[lvl][0][1][0]);
		console.log(walls);
		console.log(targetX + ' ' + targetY);
		levels[lvl][0].forEach(planet => {
			let p = particle.create(planet[0] * blockSize, planet[1] * blockSize, 0, 0, 0);
			p.radius = 20;
			p.mass = 1000;
			particles.push(p);
		});
		console.log(lvl);
	}

	function init() {
		document.body.addEventListener('mousedown', event => {
			mouseX = event.clientX;
			mouseY = event.clientY;
			attract = true;
			sineWave.play();
		});

		document.body.addEventListener('mouseup', event => {
			attract = false;
			sineWave.stop();
		});

		loadLevel(lvl);
	}

	function update() {
		ball.update();

		if (attract) {
			particles.forEach(p => {
				if (p.distanceTo(particle.create(mouseX, mouseY, 0, 0, 0)) <= p.radius) {
					//console.log(p.position.getX() + ' ' + p.position.getY()); // Print position of particle
					sineWave.frequency = ball.distanceTo(p);
					ball.gravitateTo(p);
				}
			});
		}

		particles.forEach(p => {
			if (p.distanceTo(ball) <= p.radius + ball.radius && (p.position.getX() / blockSize) == targetX && (p.position.getY() / blockSize) == targetY) {
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
			if (ball.position.getX() > wall[0] - wall[2] &&
				ball.position.getX() < wall[0] + wall[2] &&
				ball.position.getY() > wall[1] - wall[3] &&
				ball.position.getY() < wall[1] + wall[3]) {
				ball.position.setX(width / 2);
				ball.position.setY(height / 2);
				ball.velocity = vector.create(0, 0);
			}
		});

		if (ball.position.getX() < 0 || ball.position.getY() < 0 || ball.position.getX() > width || ball.position.getY() > height) {
			ball.position.setX(width / 2);
			ball.position.setY(height / 2);
			ball.velocity = vector.create(0, 0);
		}
	}

	function render() {
		ctx.fillStyle = 'navy';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.lineWidth = 1;
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.arc(ball.position.getX(), ball.position.getY(), ball.radius, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		particles.forEach(p => {
			ctx.beginPath();
			ctx.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
			ctx.fill();

			if ((p.position.getX() / blockSize) == targetX && (p.position.getY() / blockSize) == targetY) {
				ctx.strokeStyle = 'red';
			} else ctx.strokeStyle = 'black';

			ctx.stroke();
			ctx.closePath();
		});

		walls.forEach(wall => {
			ctx.fillRect(wall[0], wall[1], wall[2] * 2, wall[3] * 2);
		});
	}		
	function anim() { requestAnimationFrame(anim); render(); update(); } anim(); init();
}
