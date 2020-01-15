window.onload = () => {
    const canvas  = document.getElementById('canvas'),
          context = canvas.getContext('2d'),
          colours = ['cyan', 'yellow', 'magenta'];
    let   width   = canvas.width = window.innerWidth,
          height  = canvas.height = window.innerHeight,
          centerX = width / 2, centerY = height / 2,
          mouseX, mouseY, mouseDist,
          pointAX, pointAY,
          pointBX, pointBY,
          pointCX, pointCY,
          pDist, qDist, rDist,
          autoX = 0, autoY = 0,
          pointAutoX, pointAutoY,
          movePointX = 0, movePointY = 0,
          scaleLock = width / 6;
    
    class Vec2 {
        static getDistanceFromCoords = (x1, y1, x2, y2) => Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    }

    canvas.addEventListener('mousemove', event => {
        const mousePos = getMousePos(canvas, event);
        mouseX = mousePos.x, mouseY = mousePos.y;
    });

    addEventListener('resize', () => {
        width  = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        centerX = width / 2, centerY = height / 2;
        scaleLock = width / 6;
        render();
    });

    function init() {
        mouseDist = scaleLock + 1;
    }

    function update() {
        if (mouseX != null)        mouseDist = Vec2.getDistanceFromCoords(mouseX, mouseY, width / 2, height / 2);
        if (mouseDist > scaleLock) mouseDist = scaleLock + 1;

        movePointX = mouseDist > scaleLock ? pointAutoX : mouseX;
        movePointY = mouseDist > scaleLock ? pointAutoY : mouseY;

        [[pointAX, pointAY], [pointBX, pointBY], [pointCX, pointCY]].forEach((angle, i) => {
            angle[0] = getCoordFromAngle(i * 120, mouseDist).x;
            angle[1] = getCoordFromAngle(i * 120, mouseDist).y;
        })

        pDist      = Vec2.getDistanceFromCoords(centerX, centerY - mouseDist, movePointX, movePointY);
        qDist      = Vec2.getDistanceFromCoords(centerX + pointAX, centerY + pointAY, movePointX, movePointY);
        rDist      = Vec2.getDistanceFromCoords(centerX + pointBX, centerY + pointBY, movePointX, movePointY);

        pointAutoX = (width  / 2) + getCoordFromAngle(autoX++, mouseDist).x;
        pointAutoY = (height / 2) + getCoordFromAngle(autoY++, mouseDist).y;
    }

    function render() {
        clearScreen();

        [[pDist, qDist, rDist], [qDist, pDist, rDist], [rDist, qDist, pDist]].forEach((p, i) => {
            if (p[0] > p[1] && p[0] > p[2]) { const y = i != 0 ? [2, 1] : [1, 2], c = n => (i + n) % 3;
                drawText('+          =', centerX +   -5, centerY);
                drawRectangle(-80      + centerX +  125, centerY - (p[0]     / 8), 50, p[0]    / 4, colours[i]);
                drawRectangle(-80      + centerX +  -25, centerY - (p[y[0]]) / 8 , 50, p[y[0]] / 4, colours[c(1)]);
                drawRectangle(-80      + centerX +   50, centerY - (p[y[1]]) / 8 , 50, p[y[1]] / 4, colours[c(2)]);
            }
        });

        drawCircle(centerX, centerY, mouseDist, 'white');
        drawTriangle(centerX, centerY, mouseDist, 'red');
        drawLine(centerX, centerY - mouseDist, movePointX, movePointY, colours[0]);
        drawLine(centerX + pointAX, centerY + pointAY, movePointX, movePointY, colours[1]);
        drawLine(centerX + pointBX, centerY + pointBY, movePointX, movePointY, colours[2]);

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
        context.font      = 'Bold 17px Verdana';
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
