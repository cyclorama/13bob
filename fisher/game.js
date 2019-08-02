function update() {
    hook.update();

    for (let i = 0; i < fishes.length; i++) {
        fishes[i].update();
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    hook.render();
    renderLine();

    for (let i = 0; i < fishes.length; i++) {
        fishes[i].render();
    }

    for (let i = 0; i < rocks.length; i++) {
        rocks[i].render();
    }
    document.getElementById('boat').src = `img/boat${PLAYER_CAUGHT}.png`;
}

async function main() {
    update();
    render();

    await sleep(sleepTime);
    requestAnimationFrame(main);
}

document.getElementById('score').innerText = PLAYER_SCORE;
loadLevel().next();
menu();
