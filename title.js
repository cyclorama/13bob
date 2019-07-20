(async () => {
    const h1 = document.querySelector('h1'), sleep = time => new Promise(resolve => setTimeout(resolve, time)),
    colours = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    
    h1.style.animation = 'none';
    await sleep(1000);
    
    for (const colour of colours) {
        h1.innerHTML = `<a href="//13bob.net/"><font color=\'${colour}\'>13bob</font></a>`;
        await sleep(750);
    }
})();
