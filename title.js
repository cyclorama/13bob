(async () => { // Genesis 9:13 — I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.
    const h1 = document.querySelector('h1'), sleep = time => new Promise(resolve => setTimeout(resolve, time)),
    colours  = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], title = '13bob';
    let position = 0, html;

    await sleep(1000);
    h1.style.animation = 'none';

    while (position < 12) { html = '';
        for (let i = 0; i < colours.length; i++) {
            if (position - i > title.length) {
                i++;
                continue;
            }

            if (title[position - i] != null)
                html = `<font color="${colours[i]}">${title[position - i]}</font>` + html;
        }
        position++;
        h1.innerHTML = title.substring(0, position - title.length - 2) + html + title.substring(position);

        await sleep(50);
    }

    h1.style.animation = 'heartbeat 1s alternate infinite';
})();
