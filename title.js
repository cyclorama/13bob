(() => {
    const h1 = document.querySelector('h1'), sleep = time => new Promise(resolve => setTimeout(resolve, time)), bow = async () => {
        ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].forEach(colour => {
            h1.innerHTML = `<a href="//13bob.net/"><font color=\'${colour}\'>13bob</font></a>`;
            await sleep(750);
        });
    }
    bow();
});
