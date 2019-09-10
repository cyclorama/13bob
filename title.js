(async (title, position, html, colours, sleep) => { // Genesis 9:13 — I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.
    const h1 = $("h1");

    await sleep(1000).then(() => $("h1").css('animation', 'none'));

    while (position < 12) { html = '';
        for (let i = 0; i < colours.length; i++) {
            if (position - i > title.length) continue;
            if (title[position - i] != null) html = `<font color="${colours[i]}">${title[position - i]}</font>${html}`;
        }
        await sleep(35).then(() => $("h1").text(`<a href="//13bob.net/">${title.substring(0, position - title.length - 2)}${html}${title.substring(position)}</a>`, position++));
    }
    $("h1").css('animation', 'heartbeat 1s alternate infinite');

})('13bob', [] - [], [] + [], ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], time => new Promise(resolve => setTimeout(resolve, time)));
