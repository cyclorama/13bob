let textArea = document.getElementById("text"),
    lcSpan   = document.getElementById("lineCount"),
    wcSpan   = document.getElementById("wordCount"),
    bSpan    = document.getElementById("byteCount"),

onInput = () => {
    let totalLines = 0, totalWords = 0, totalBytes = 0;

    totalLines = textArea.value.split("\n").length - 1;
    totalWords = textArea.value.split(" ").length - 1;
    totalBytes = textArea.value.split("").length - 1;

    lcSpan.innerHTML = `${totalLines} line${totalLines != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    bSpan.innerHTML = `${totalBytes} byte${totalBytes != 1 ? "s" : ""}`;
};

textArea.oninput = () => onInput();

onInput();
