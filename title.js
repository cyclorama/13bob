
(async () => {
    const h1 = document.querySelector('h1');
    for await (let html of () => {
        let i = 0;
        const colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
            sleep = time => new Promise(resolve => setTimeout(resolve, time));
          
        while (i < colours.length) {
            yield `<a href="//13bob.net/"><font color=\'${colours[i++]}\'>13bob</font></a>`;
            await sleep(750);
        }
    }) {
        h1.innerHTML = html;
    }
})();
