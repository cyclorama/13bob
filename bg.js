const html = document.querySelector('html'), body = document.querySelector('body');
document.querySelector('html').addEventListener('mousemove', e => {
    html.style.backgroundPosition = `${-e.clientX * 0.0050}px ${-e.clientY * 0.0050}px`,
    body.style.backgroundPosition = `${-e.clientX * 0.0075}px ${-e.clientY * 0.0075}px`
});
