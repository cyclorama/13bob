const body = document.querySelector('body');
body.addEventListener('mousemove', e => {
	body.style.backgroundPositionX = (-e.offsetX * 0.02) + 'px';
	body.style.backgroundPositionY = (-e.offsetY * 0.02) + 'px';
});
