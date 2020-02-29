let textArea = document.getElementById("text"),
    lcSpan   = document.getElementById("lineCount"),
    wcSpan   = document.getElementById("wordCount"),
    bSpan    = document.getElementById("byteCount"),

onInput = () => {
    let totalWords = 0,
        totalBytes = 0,
        lineArr = textArea.value.split("\n").filter(el => el != "");

    lineArr.forEach(line => {
        totalWords += line.split(" ").filter(el => el != "").length;
        line = line.split(" ").filter(el => el != "");
        line.forEach(letter => totalBytes += letter.length);
    });

    lcSpan.innerHTML = `${lineArr.length} line${lineArr.length != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    bSpan.innerHTML = `${totalBytes} bytes${totalBytes != 1 ? "s" : ""}`;
};

textArea.oninput = () => onInput();

onInput();
