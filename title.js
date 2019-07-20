(async () => {
    const h1 = document.querySelector('h1'), sleep = time => new Promise(resolve => setTimeout(resolve, time)),
    colours  = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], title = '13bob';
    let c = 0;

    await sleep(1000);
    h1.style.animation = 'none';

    let html = '';

    while (c < 12) {
        for (let i = 0; i < colours.length; i++) {

            if (c - i > title.length) {
                i++;
                continue;
            }

            if (title[c - i] != null) {
                html = `<font color="${colours[i]}">${title[c - i]}</font>` + html;
            }
        }

        await sleep(1000);
        c++;

        h1.innerHTML = html;
    }
})();
