!async function (title, pos, html, colours, sleep) {
    const h1 = document.querySelector('h1');

    await sleep(1000).then(() => h1.style.animation = 'none');

    while (pos < title.length + colours.length) {
        for (let col = 0; col < colours.length; col++) {
            if (pos - col > title.length) continue;
            if (title[pos - col]) html = `<font color="${colours[col]}">${title[pos - col]}</font>${html}`;
        }
        await sleep(35).then(() => h1.innerHTML = `<a href="//13bob.net/">${title.substring(0, pos - title.length - 2)}${html}${title.substring(pos)}</a>`), html = '', pos++;
    }
    h1.style.animation = 'heartbeat 1s alternate infinite';

}('13bob', 0, '', ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], time => new Promise(resolve => setTimeout(resolve, time)));
