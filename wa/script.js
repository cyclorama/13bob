let textArea = $("#text"),
    lcSpan   = $("#lineCount"),
    wcSpan   = $("#wordCount"),
    bSpan    = $("#byteCount");

textArea.change(() => {
    let textAreaVal = textArea.val(),
        totalLines  = textAreaVal.split("\n").length,
        totalWords  = textAreaVal ? textAreaVal.split("\n").join(" ").split(" ").filter(Boolean).length : 0,
        totalBytes  = textAreaVal.split("").length;

    lcSpan.html(`${totalLines} line${totalLines != 1 ? "s" : ""}`);
    wcSpan.html(`${totalWords} word${totalWords != 1 ? "s" : ""}`);
    bSpan.html(`${totalBytes} byte${totalBytes != 1 ? "s" : ""}`);
});
