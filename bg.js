const html = document.querySelector('html'), body = document.querySelector('body');
document.querySelector('html').addEventListener('mousemove', e => {
    html.style.backgroundPosition = `${-e.clientX * 0.010}px ${-e.clientY * 0.010}px`,
    body.style.backgroundPosition = `${-e.clientX * 0.015}px ${-e.clientY * 0.015}px`
});
