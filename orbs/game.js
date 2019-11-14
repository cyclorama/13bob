window.onload = function() {
    let canvas      = document.getElementById('canvas'),
        ctx         = canvas.getContext('2d'),
        width       = canvas.width = window.innerWidth,
        height      = canvas.height = window.innerHeight,
        blockSize   = canvas.width / 100,
        centerX     = (window.innerWidth / blockSize) / 2,
        centerY     = (window.innerHeight / blockSize) / 2,

        levels = [
        [ [ [centerX, centerY / 2.5], [centerX, centerY / 1.4],[centerX / 1.5, centerY] ], [ [centerX, centerY * 0.55, 400, 25] ] ],
        [ [ [centerX, centerY / 4], [centerX, centerY / 2], [centerX * 1.25, centerY] ], [ [centerX, centerY * 0.75, 400, 25] ] ],
        [ [ [centerX + 4, centerY], [centerX, centerY / 4.5], [centerX * 0.75, centerY] ], [ [centerX + 1.85, centerY, 25, 200] ] ],
        [ [ [centerX, centerY + 2], [centerX, centerY / 4.5], [centerX * 1.25, centerY] ], [ [centerX + 1.85, centerY, 25, 200] ] ],
        [ [ [centerX * 0.5, centerY], [centerX, centerY / 4.5], [centerX * 1.25, centerY] ], [ [centerX * 0.75, centerY, 25, 200] ] ]
        ],

        lvl         = 0, // levels[level_number][0 - orbs, 1 - walls][0 - orb/wall one, 1 - orb/wall two, 2 - orb/wall three][0 - x, 1 - y, 2 - width, 3 - height]
        ball        = new Particle(width / 2, height / 2, 0, 0, 0);
        ball.radius = 10;
        ball.mass   = 10;
        attract     = false,
        mouseX      = 0,
        mouseY      = 0,
        particles   = [], walls = [],
        targetX     = 0,
        targetY     = 0,
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
        //targetX = levels[lvl][0][0][0]; // First particle is always the target
        //targetY = levels[lvl][0][0][1]; // ''

        for (let i = 0; i < levels[lvl][0].length; i++) {
            let p    = new Particle(levels[lvl][0][i][0] * blockSize, levels[lvl][0][i][1] * blockSize, 0, 0, 0);
            p.radius = 20;
            p.mass   = 1000;
            particles.push(p);
        }

        for (let i = 0; i < levels[lvl][1].length; i++) {
            walls.push(levels[lvl][1][i]);
        }
    }

    function reset() {
        ball.position.x = width / 2;
        ball.position.y = height / 2;
        ball.velocity = new Vector2(0, 0);
    }

    function init() {
        document.body.addEventListener('mousemove', event => {
            mouseX = event.clientX, mouseY = event.clientY;
        });

        document.body.addEventListener('mousedown', event => {
            for (let i = 0; i < particles.length; i++) {
                if (i != 0 && particles[i].distanceTo(new Particle(mouseX, mouseY, 0, 0, 0)) <= particles[i].radius) {
                    pressedOrbX = particles[i].position.x;
                    pressedOrbY = particles[i].position.y;
                    attract = true;
                    sineWave.play();
                }
            }
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
            for (let i = 0; i < particles.length; i++) {
                if (particles[i].distanceTo(new Particle(mouseX, mouseY, 0, 0, 0)) <= particles[i].radius) {
                    sineWave.frequency = ball.distanceTo(particles[i]);
                    ball.gravitateTo(particles[i]);
                }
            }
        }

        for (let i = 0; i < particles.length; i++) {
            if (i == 0 && particles[i].distanceTo(ball) <= particles[i].radius + ball.radius) {
                particles = [];
                walls = [];
                ball.position.x = width / 2;
                ball.position.y = height / 2;
                ball.velocity = new Vector2(0, 0);
                lvl++;
                loadLevel(lvl);
            } else if (particles[i].distanceTo(ball) <= ball.radius + particles[i].radius) {
                ball.position.x = width / 2;
                ball.position.y = height / 2;
                ball.velocity = new Vector2(0, 0);
            }
        }

        for (let i = 0; i < walls.length; i++) {
            if (ball.position.x > ((walls[i][0] * blockSize) - (walls[i][2] / 2)) - ball.radius &&
            ball.position.y > ((walls[i][1] * blockSize) - (walls[i][3] / 2)) - ball.radius &&
            ball.position.x < ((walls[i][0] * blockSize) + (walls[i][2] / 2)) + ball.radius &&
            ball.position.y < ((walls[i][1] * blockSize) + (walls[i][3] / 2)) + ball.radius) {
            reset(); }
        }

        if (ball.position.x < 0 ||
            ball.position.y < 0 ||
            ball.position.x > width ||
            ball.position.y > height) {
            reset();
        }
    }

    function render() {
        ctx.fillStyle = 'navy';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText(`${lvl}`, 100, 100);

        if (attract) {
            ctx.strokeStyle = '#ff0000';
            ctx.beginPath();
            ctx.moveTo(ball.position.x, ball.position.y);
            ctx.lineTo(pressedOrbX, pressedOrbY);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(pressedOrbX, pressedOrbY, 35 - Math.sin((Math.PI / 180) * ball.distanceTo(new Particle(pressedOrbX, pressedOrbY, 0, 0, 0)) * 20), 0, 2 * Math.PI);
            ctx.stroke(); 
            ctx.closePath();
        }

        ctx.lineWidth = 2;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        for (let i = 0; i < particles.length; i++) {
            ctx.beginPath();
            ctx.arc(particles[i].position.x, particles[i].position.y, particles[i].radius, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.strokeStyle = i == 0 ? '#ff0000' : '#ffffff';
            ctx.stroke();
            ctx.closePath();
        }

        for (let i = 0; i < walls.length; i++) {
            ctx.beginPath();
            ctx.fillRect((walls[i][0] * blockSize) - (walls[i][2] / 2), (walls[i][1] * blockSize) - (walls[i][3] / 2), walls[i][2], walls[i][3]);
            ctx.strokeRect((walls[i][0] * blockSize) - (walls[i][2] / 2), (walls[i][1] * blockSize) - (walls[i][3] / 2), walls[i][2], walls[i][3]);
            ctx.closePath();
        }
    }

    function anim() {
        requestAnimationFrame(anim);
        render();
        update();
    }
    anim();
    init();
}
