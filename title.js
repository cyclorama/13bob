(async () => {
    const h1 = document.querySelector('h1'), sleep = time => new Promise(resolve => setTimeout(resolve, time));
    ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].forEach(async colour => {
        h1.innerHTML = `<a href="//13bob.net/"><font color=\'${colour}\'>13bob</font></a>`;
        await sleep(750);
    });
});
