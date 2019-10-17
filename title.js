!async function (title, position, html, colours, sleep) {
    const h1 = document.querySelector('h1');

    await sleep(1000).then(() => h1.style.animation = 'none');

    while (position < 12) { html = '';
        for (let i = 0; i < colours.length; ) {
            if (position - i > title.length) continue;
            if (title[position - i]) html = `<font color="${colours[i]}">${title[position - i++]}</font>${html}`;
        }
        await sleep(35).then(() => h1.innerHTML = `<a href="//13bob.net/">${title.substring(0, position - title.length - 2)}${html}${title.substring(position)}</a>`, position++);
    }
    h1.style.animation = 'heartbeat 1s alternate infinite';

}('13bob', 0, '', ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], time => new Promise(resolve => setTimeout(resolve, time)));
