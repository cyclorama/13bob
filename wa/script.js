let textArea = document.getElementById("text");
let wcSpan = document.getElementById("wordCount");
let lcSpan = document.getElementById("lineCount");

textArea.oninput = () => onInput();

let onInput = () => {
    let wordArrSpace = textArea.value.split(" ").filter(el => { return el != "" });
    let wordArrNewline = textArea.value.split("\n").filter(el => { return el != "" });

    wcSpan.innerHTML = `${wordArrSpace.length} word${wordArrSpace.length != 1 ? "s" : ""}`;
    lcSpan.innerHTML = `${wordArrNewline.length} line${wordArrNewline.length != 1 ? "s" : ""}`;
};
