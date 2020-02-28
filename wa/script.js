let textArea = document.getElementById("text"),
    lcSpan   = document.getElementById("lineCount"),
    wcSpan   = document.getElementById("wordCount"),

onInput = () => {
    let totalWords = 0, lineArr = textArea.value.split("\n").filter(el => el != "");

    lineArr.forEach(line => totalWords += line.split(" ").filter(el => el != "").length);

    lcSpan.innerHTML = `${lineArr.length} line${lineArr.length != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
};

textArea.oninput = () => onInput();

onInput();
