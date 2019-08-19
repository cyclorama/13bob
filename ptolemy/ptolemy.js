window.onload = () => {
    const canvas  = document.getElementById('canvas'),
          context = canvas.getContext('2d'),
          width   = canvas.width = window.innerWidth,
          height  = canvas.height = window.innerHeight,
          centerX = width / 2, centerY = height / 2,
          colours = ['cyan', 'yellow', 'magenta'];
    let   mouseX, mouseY, mouseDist,
          pointAX, pointAY,
          pointBX, pointBY,
          pointCX, pointCY,
          pDist, qDist, rDist,
          autoX = 0, autoY = 0,
          pointAutoX, pointAutoY,
          movePointX = 0, movePointY = 0,
          scaleLock = width / 6;
    
    canvas.addEventListener('mousemove', event => {
        const mousePos = getMousePos(canvas, event);
        mouseX = mousePos.x, mouseY = mousePos.y;
    });

    function init() {
        mouseDist = scaleLock + 1;
    }

    function update() {
        if (mouseX != null)        mouseDist = getDistance(mouseX, mouseY, width / 2, height / 2);
        if (mouseDist > scaleLock) mouseDist = scaleLock + 1;

        movePointX = mouseDist > scaleLock ? pointAutoX : mouseX;
        movePointY = mouseDist > scaleLock ? pointAutoY : mouseY;

        pointAX    = getCoordFromAngle(150, mouseDist).x;
        pointAY    = getCoordFromAngle(150, mouseDist).y;
        pointBX    = getCoordFromAngle(30,  mouseDist).x;
        pointBY    = getCoordFromAngle(30,  mouseDist).y;
        pointCX    = getCoordFromAngle(270, mouseDist).x;
        pointCY    = getCoordFromAngle(270, mouseDist).y;

        pDist      = getDistance(centerX, centerY - mouseDist, movePointX, movePointY);
        qDist      = getDistance(centerX + pointAX, centerY + pointAY, movePointX, movePointY);
        rDist      = getDistance(centerX + pointBX, centerY + pointBY, movePointX, movePointY);

        pointAutoX = (width / 2) + getCoordFromAngle(autoX++, mouseDist).x;
        pointAutoY = (height / 2) + getCoordFromAngle(autoY++, mouseDist).y;
    }

    function render() {
        clearScreen();
        drawCircle(centerX, centerY, mouseDist, 'white');
        drawTriangle(centerX, centerY, mouseDist, 'red');
        drawLine(centerX, centerY - mouseDist, movePointX, movePointY, colours[0]);
        drawLine(centerX + pointAX, centerY + pointAY, movePointX, movePointY, colours[1]);
        drawLine(centerX + pointBX, centerY + pointBY, movePointX, movePointY, colours[2]);

        [[pDist, qDist, rDist], [qDist, pDist, rDist], [rDist, qDist, pDist]].forEach((cond, i) => {
            if (cond[0] > cond[1] && cond[0] > cond[2]) { const base = [((i + 1) % 2) + 1, ((i + 2) % 2) + 1];
                drawText('+', ((centerX / 2) + 75)  - (mouseDist / 2), centerY);
                drawText('=', ((centerX / 2) + 175) - (mouseDist / 2), centerY);
                drawRectangle(((centerX / 2) + 200) - (mouseDist / 2), centerY - (cond[0] / 2), 50, cond[0], colours[i]);
                drawRectangle(((centerX / 2) + 0)   - (mouseDist / 2), centerY - (cond[1] / 2), 50, cond[1], colours[base[0]]);
                drawRectangle(((centerX / 2) + 100) - (mouseDist / 2), centerY - (cond[2] / 2), 50, cond[2], colours[base[1]]);
            }
        });

        drawCircle(centerX + pointBX, centerY + pointBY, 2, colours[2]);
        drawCircle(centerX + pointAX, centerY + pointAY, 2, colours[1]);
        drawCircle(centerX, centerY - mouseDist, 2, colours[0]);
        drawCircle(movePointX, movePointY, 2, 'white');
    }

    function clearScreen() {
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawText(txt, x, y) {
        context.font      = '50px Verdana';
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText(txt, x, y);
    }

    function drawLine(x1, y1, x2, y2, colour) {
        context.strokeStyle = colour;
        context.lineWidth   = 5;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
    }

    function drawCircle(x, y, radius, colour) {
        context.strokeStyle = colour;
        context.lineWidth   = 5;
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
    }

    function drawRectangle(x, y, width, height, colour) {
        context.fillStyle = colour;
        context.fillRect(x, y, width, height);
    }

    function drawTriangle(x, y, radius, colour) {
        context.strokeStyle = colour;
        context.lineWidth   = 5;
        context.beginPath();
        context.moveTo(x, y - radius);
        context.lineTo(x + pointAX, y + pointAY);
        context.lineTo(x + pointBX, y + pointBY);
        context.lineTo(x + pointCX, y + pointCY);
        context.closePath();
        context.stroke();
    }

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    }

    function getCoordFromAngle(angle, distance) {
        angle *= Math.PI / 180; return {
            x: distance * Math.cos(angle), y: distance * Math.sin(angle)
        };
    }

    function anim() {
        requestAnimationFrame(anim);
        render();
        update();
    }
    anim();
    init();
}
