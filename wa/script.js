let textArea = document.getElementById("text"),
    lcSpan   = document.getElementById("lineCount"),
    wcSpan   = document.getElementById("wordCount"),
    bSpan    = document.getElementById("byteCount"),

onInput = () => {
    let totalWords = 0,
        totalBytes = 0,
        lineArr = textArea.value.split("\n").filter(el => el != "");

    lineArr.forEach(line => {
        line.split("").forEach(char => totalBytes += char.length);
        let wordsArr = line.split(" ").filter(el => el != "");
        totalWords += wordsArr.length;
        totalBytes++;
    });

    lcSpan.innerHTML = `${lineArr.length} line${lineArr.length != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    bSpan.innerHTML = `${totalBytes} byte${totalBytes != 1 ? "s" : ""}`;
};

textArea.oninput = () => onInput();

onInput();
