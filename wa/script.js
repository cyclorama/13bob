let textArea = document.getElementById("text");
let lcSpan = document.getElementById("lineCount");
let wcSpan = document.getElementById("wordCount");

textArea.oninput = () => onInput();

let onInput = () => {
    let totalWords = 0;
    let wordArrLines = textArea.value.split("\n").filter(el => el != "");

    wordArrLines.forEach(line => totalWords += line.split(" ").filter(el => el != "").length);

    lcSpan.innerHTML = `${wordArrLines.length} line${wordArrLines.length != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
};
