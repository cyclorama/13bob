let getElemById = id => document.getElementById(id),

textArea = getElemById("text"), lcSpan = getElemById("lineCount"), wcSpan = getElemById("wordCount"),

onInput = () => {
    let totalWords = 0, wordArrLines = textArea.value.split("\n").filter(el => el != "");

    wordArrLines.forEach(line => totalWords += line.split(" ").filter(el => el != "").length);

    lcSpan.innerHTML = `${wordArrLines.length} line${wordArrLines.length != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
};

textArea.oninput = () => onInput();

onInput();
