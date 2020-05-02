const html = document.querySelector('html'), body = document.querySelector('body');
document.querySelector('html').addEventListener('mousemove', e => {
    html.style.backgroundPositionX = -e.clientX * 0.02 + 'px',
    html.style.backgroundPositionY = -e.clientY * 0.02 + 'px',
    body.style.backgroundPositionX = -e.clientX * 0.01 + 'px',
    body.style.backgroundPositionY = -e.clientY * 0.01 + 'px';
});
