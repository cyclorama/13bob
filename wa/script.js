let textArea = document.getElementById("text");
let wcSpan = document.getElementById("wordCount");

textArea.oninput = () => onInput();

let onInput = () => {
    let wordArr = textArea.value.split(" ").filter(el => { return el != "" });
    wcSpan.innerHTML = `${wordArr.length} word${wordArr.length != 1 ? "s" : ""}`;
};
