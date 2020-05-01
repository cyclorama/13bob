let textArea = $("#text"), statArea = $("#stat");

textArea.on("input", () => {
    let textAreaVal = textArea.val(),
        totalLines  = textAreaVal.split("\n").length,
        totalWords  = textAreaVal ? textAreaVal.split("\n").join(" ").split(" ").filter(Boolean).length : 0,
        totalBytes  = textAreaVal.split("").length,
        totalUpper  = textAreaVal.split("").filter(p => p >= "A" && p <= "z" && p == p.toUpperCase()).length,
        totalLower  = textAreaVal.split("").filter(p => p >= "A" && p <= "z" && p == p.toLowerCase()).length;

    statArea.val(`${totalLines} line${totalLines != 1 ? "s" : ""}\n${totalWords} word${totalWords != 1 ? "s" : ""}\n${totalBytes} byte${totalBytes != 1 ? "s" : ""}\n${totalUpper} CHAR${totalUpper != 1 ? "S" : ""}\n${totalLower} char${totalLower != 1 ? "s" : ""}`);
});
