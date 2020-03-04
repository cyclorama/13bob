let textArea = document.getElementById("text"),
    lcSpan   = document.getElementById("lineCount"),
    wcSpan   = document.getElementById("wordCount"),
    bSpan    = document.getElementById("byteCount"),

onInput = () => {
    let textAreaVal = textArea.value, totalLines = 0, totalWords = 0, totalBytes = 0;

    totalLines = textAreaVal.split("\n").length;

    totalWords = textAreaVal.split("\n").length > 0 ? textAreaVal.replace("\n", " ").split(" ").length : 0;

    totalBytes = textAreaVal.split("").length;

    lcSpan.innerHTML = `${totalLines} line${totalLines != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    bSpan.innerHTML = `${totalBytes} byte${totalBytes != 1 ? "s" : ""}`;
};

textArea.oninput = () => onInput();

onInput();
