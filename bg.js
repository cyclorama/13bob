const html = document.querySelector('html'), body = document.querySelector('body');
html.addEventListener('mousemove', e => {
	body.style.backgroundPositionX = -e.clientX * 0.01 + 'px';
	body.style.backgroundPositionY = -e.clientY * 0.01 + 'px';
});
