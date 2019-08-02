const body = document.querySelector('body');
document.querySelector('html').addEventListener('mousemove', e => {
    body.style.backgroundPositionX = -e.clientX * 0.01 + 'px';
    body.style.backgroundPositionY = -e.clientY * 0.01 + 'px';
});
