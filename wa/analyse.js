let textArea = document.getElementById("text");
let wcSpan = document.getElementById("wordCount");
textArea.oninput = () => {
    let wordArr = textArea.value.split(" ").filter(el => { return el != "" });
    wcSpan.innerHTML = `${wordArr.length} word${wordArr.length != 1 ? "": "s"}...`;
};
