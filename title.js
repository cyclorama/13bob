(async () => {
    const h1 = document.querySelector('h1'), sleep = time => new Promise(resolve => setTimeout(resolve, time)),
    colours  = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], title = '13bob';
    let c = 0;

    await sleep(1111);
    h1.style.animation = 'none';

    while (c < 12) {

        for (const char of title) {

        }

        //await sleep(750);
        c++;
    }

    for (const colour of colours) {
        h1.innerHTML = `<a href="//13bob.net/"><font color=\'${colour}\'>13bob</font></a>`;
        await sleep(500);
    }

})();
