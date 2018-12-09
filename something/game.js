window.onload = function() {
	let canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
		
		ball = particle.create(width / 2, height / 2, 0, 0, 0);
		ball.radius = 7;
		ball.mass = 1;
		attract = false;
		mouseX = 0;
		mouseY = 0;

		sineWave = new Pizzicato.Sound({
			source: 'wave', 
		    options: {
		    	frequency: -1,
		    	volume: 0.1
		    }
		});

	function init() {
		loadLevel(0);

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

		let blockSize = canvas.width / 25;

		console.log(planets);
		
		planets.forEach(p => {
			let planet = particle.create(window.innerWidth / 4, window.innerHeight / 4, 0, 0, 0);
			console.log(planet);
			planet.radius = 20;
			planet.mass = 1000;
			particles.push(planet);
		});

		console.log(particles);
		
		/*
		for (let i = 0; i < 2; i++) {
			let x = Math.floor(Math.random() * width);
			let y = Math.floor(Math.random() * height);

			let p = particle.create(x, y, 0, 0, 0);
			p.radius = 20;
			p.mass = 1000;
			particles.push(p);
		}
		*/
		
	}

	function update() {
		ball.update();

		if (attract) {
			particles.forEach(p => {
				if (p.distanceTo(particle.create(mouseX, mouseY, 0, 0, 0)) < p.radius) {
					console.log(p.position.getX() + ' ' + p.position.getY());
					sineWave.frequency = ball.distanceTo(p);
					ball.gravitateTo(p);
				}
			});
		}

		if (ball.position.getX() < 0 || ball.position.getY() < 0 || ball.position.getX() > width || ball.position.getY() > height) {
			ball.position.setX(width / 2);
			ball.position.setY(height / 2);
			ball.velocity = vector.create(0, 0);
		}
	}

	function render() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.arc(ball.position.getX(), ball.position.getY(), ball.radius, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();

		particles.forEach(p => {
			ctx.beginPath();
			ctx.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.closePath();
		});
	}		
	function anim() { requestAnimationFrame(anim); render(); update(); } anim(); init();
}
