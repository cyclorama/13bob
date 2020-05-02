const html = document.querySelector('html'), body = document.querySelector('body');
document.querySelector('html').addEventListener('mousemove', e => {
    html.style.backgroundPosition = `${-e.clientX * 0.01}px ${-e.clientY * 0.01}px`,
    body.style.backgroundPosition = `${-e.clientX * 0.015}px ${-e.clientY * 0.015}px`
});
