const html = document.querySelector('html'), body = document.querySelector('body');
document.querySelector('html').addEventListener('mousemove', e => {
    html.style.backgroundPosition = `${-e.clientX * 0.0100}px ${-e.clientY * 0.0100}px`,
    body.style.backgroundPosition = `${-e.clientX * 0.0125}px ${-e.clientY * 0.0125}px`
});
