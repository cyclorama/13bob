document.querySelector('body').addEventListener('mousemove', (e) => {
	body.style.backgroundPositionX = -e.offsetX + 'px';
	body.style.backgroundPositionY = -e.offsetY + 'px';
});