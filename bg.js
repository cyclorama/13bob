const body = document.querySelector('body');
body.style.backgroundImage = "url(space.gif), url(space_foreground.png)";
document.querySelector('html').addEventListener('mousemove', e => { body.style.backgroundPositionX = -e.clientX * 0.01 + 'px', body.style.backgroundPositionY = -e.clientY * 0.01 + 'px'; } );
