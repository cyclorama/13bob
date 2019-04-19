const h1 = document.querySelector('h1');
let c = 0;

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

async function roygbiv() {
	let colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	for (let i = 0; i < colours.length; i++) {
		h1.innerHTML = `<a href="//13bob.net/"><font color=\'${colours[i]}\'>13bob</font></a>`;
		await sleep(750);
	}
}

roygbiv();