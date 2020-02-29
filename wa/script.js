let textArea = document.getElementById("text"),
    lcSpan   = document.getElementById("lineCount"),
    wcSpan   = document.getElementById("wordCount"),
    bSpan    = document.getElementById("byteCount"),

onInput = () => {
    let totalWords = 0,
        totalBytes = 0,
        lineArr = textArea.value.split("\n").filter(el => el != "");

    totalBytes += lineArr.length == 0 ? 0 : -1;

    lineArr.forEach(line => {
        let wordsArr = line.split(" ").filter(el => el != "");
        line.split().forEach(letter => totalBytes += letter.length);
        totalWords += wordsArr.length;
    });

    lcSpan.innerHTML = `${lineArr.length} line${lineArr.length != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    bSpan.innerHTML = `${totalBytes} byte${totalBytes != 1 ? "s" : ""}`;
};

textArea.oninput = () => onInput();

onInput();
