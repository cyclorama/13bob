let textArea = document.getElementById("text");
textArea.oninput = () => {
    let wordArr = textArea.value.split(" ").filter(el => { return el != "" });
    console.log(wordArr.length);
};
