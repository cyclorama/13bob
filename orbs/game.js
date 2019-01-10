window.onload = function() {
	let canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		blockSize = canvas.width / 100,
		centerX = (window.innerWidth / blockSize) / 2,
		centerY = (window.innerHeight / blockSize) / 2,
		levels = [
		[[centerX, centerY / 3], [centerX, centerY / 1.5], [centerX / 2, centerY]],
		[[centerX, centerY / 4], [centerX, centerY / 2], [centerX / 3, centerY]]
		], lvl = 0;

		ball = particle.create(width / 2, height / 2, 0, 0, 0);
		ball.radius = 10;
		ball.mass = 1;
		attract = false;
		mouseX = 0;
		mouseY = 0;
		planets = [], particles = [];

		sineWave = new Pizzicato.Sound({
			source: 'wave', 
		    options: {
		    	frequency: -1,
		    	volume: 0.05
		    }
		});

	function loadLevel(lvl) {
		levels[lvl].forEach(planet => {
			let p = particle.create(planet[0] * blockSize, planet[1] * blockSize, 0, 0, 0);
			p.radius = 20;
			p.mass = 1000;
			particles.push(p);
		});
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
			if (p.distanceTo(ball) <= ball.radius && (p.position.getX() / blockSize) == levels[0][0][0] && (p.position.getY() / blockSize) == levels[0][0][1]) {
				particles = null;
				loadLevel(lvl++);
			} else if (p.distanceTo(ball) <= ball.radius) {
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
			ctx.stroke();
			ctx.closePath();
		});
	}		
	function anim() { requestAnimationFrame(anim); render(); update(); } anim(); init();
}
