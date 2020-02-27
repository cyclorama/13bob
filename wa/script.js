let textArea = document.getElementById("text");
let wcSpan = document.getElementById("wordCount");
let lcSpan = document.getElementById("lineCount");

textArea.oninput = () => onInput();

let onInput = () => {
    let totalWords = 0;

    let wordArrWords = textArea.value.split("\n").filter(el => el != "").forEach(line => {
            totalWords += line.split(" ").filter(el => el != "").length;
        });

    let wordArrLines = textArea.value.split("\n").filter(el => el != "");

    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    lcSpan.innerHTML = `${wordArrWords.length} line${wordArrWords.length != 1 ? "s" : ""}`;
};
