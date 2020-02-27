let textArea = document.getElementById("text");
let wcSpan = document.getElementById("wordCount");
let lcSpan = document.getElementById("lineCount");

textArea.oninput = () => onInput();

let onInput = () => {
    let totalWords = 0;

    let wordArrWords = textArea.value.split("\n").filter(el => el != "").forEach(line => {
            totalWords += line.split(" ").filter(el => el != "").length;
            console.log(line);
        });

    let wordArrLines = textArea.value.split("\n").filter(el => el != "");

    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    lcSpan.innerHTML = `${wordArrLines.length} line${wordArrLines.length != 1 ? "s" : ""}`;
};
