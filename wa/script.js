let textArea = $("#text"),
    lcSpan   = $("#lineCount"),
    wcSpan   = $("#wordCount"),
    bSpan    = $("#byteCount"),
    ucSpan   = $("#upperCase"),
    lwSpan   = $("#lowerCount");

textArea.on("input", () => {
    let textAreaVal = textArea.val(),
        totalLines  = textAreaVal.split("\n").length,
        totalWords  = textAreaVal ? textAreaVal.split("\n").join(" ").split(" ").filter(Boolean).length : 0,
        totalBytes  = textAreaVal.split("").length,
        totalUpper  = textAreaVal.split("").filter(p => p == p.toUpperCase()).length,
        totalLower  = textAreaVal.split("").filter(p => p == p.toLowerCase()).length;

    lcSpan.html(`${totalLines} line${totalLines != 1 ? "s" : ""}`);
    wcSpan.html(`${totalWords} word${totalWords != 1 ? "s" : ""}`);
    bSpan.html(`${totalBytes} byte${totalBytes != 1 ? "s" : ""}`);
    ucSpan.html(`${totalUpper} CHAR${totalUpper != 1 ? "s" : ""}`);
    lwSpan.html(`${totalLower} char${totalLower != 1 ? "s" : ""}`);
});
