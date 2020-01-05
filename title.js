!async function (title, h1, colours, sleep) {
    await sleep(1000).then(() => h1.style.animation = html = '');

    for (let pos = 0; pos < title.length + colours.length; ) {
        for (let col = 0; col < colours.length; col++)
            if (title[pos - col] && pos - col < title.length) html = `<font color="${colours[col]}">${title[pos - col]}</font>${html}`;
        await sleep(35).then(() => h1.innerHTML = `<a href="//13bob.net/">${title.substr(0, pos - title.length - 2)}${html}${title.substr(pos)}</a>`, pos++).then(() => html = '');
    }
    h1.style.animation = 'heartbeat 1s alternate infinite';

}('13bob', document.querySelector('h1'), ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], time => new Promise(resolve => setTimeout(resolve, time)));
