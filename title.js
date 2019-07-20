(async () => {
    const h1 = document.querySelector('h1'), sleep = time => new Promise(resolve => setTimeout(resolve, time)),
    colours  = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], title = '13bob';
    let c = 0;

    await sleep(1000);
    h1.style.animation = 'none';

    let html = '';

    while (c < 12) {

        if (c - i > title.length) {
            i++;
            continue;
        }

        for (let i = 0; i < colours.length; i++) {
            if (title[c - i] != null) {
                html += title.substring() + `<font color="${colours[i]}">${title[c - i]}` + title.substring(c + 1);
            }
        }

        await sleep(2000);
        c++;

        h1.innerHTML = html;
    }
})();
