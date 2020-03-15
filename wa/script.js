let textArea = $("#text"),
    lcSpan   = $("#lineCount"),
    wcSpan   = $("#wordCount"),
    bSpan    = $("#byteCount");

textArea.change(() => {
    let textAreaVal = textArea.value(),
        totalLines  = textAreaVal.split("\n").length,
        totalWords  = textAreaVal ? textAreaVal.split("\n").join(" ").split(" ").filter(Boolean).length : 0,
        totalBytes  = textAreaVal.split("").length;

    lcSpan.innerHTML = `${totalLines} line${totalLines != 1 ? "s" : ""}`;
    wcSpan.innerHTML = `${totalWords} word${totalWords != 1 ? "s" : ""}`;
    bSpan.innerHTML  = `${totalBytes} byte${totalBytes != 1 ? "s" : ""}`;
});
