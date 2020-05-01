let textArea = $("#text"),
    statArea = $("stats"),
    lcSpan   = $("#lineCount"),
    wcSpan   = $("#wordCount"),
    bySpan   = $("#byteCount"),
    ucSpan   = $("#upperCount"),
    lwSpan   = $("#lowerCount");

textArea.on("input", () => {
    let textAreaVal = textArea.val(),
        totalLines  = textAreaVal.split("\n").length,
        totalWords  = textAreaVal ? textAreaVal.split("\n").join(" ").split(" ").filter(Boolean).length : 0,
        totalBytes  = textAreaVal.split("").length,
        totalUpper  = textAreaVal.split("").filter(p => p >= "A" && p <= "z" && p == p.toUpperCase()).length,
        totalLower  = textAreaVal.split("").filter(p => p >= "A" && p <= "z" && p == p.toLowerCase()).length;


    statArea.val(`line${totalLines != 1 ? "s" : ""}: ${totalLines}\n
                  word${totalWords != 1 ? "s" : ""}: ${totalWords}\n
                  byte${totalBytes != 1 ? "s" : ""}: ${totalBytes}\n
                  CHAR${totalUpper != 1 ? "S" : ""}: ${totalUpper}\n
                  char${totalLower != 1 ? "s" : ""}: ${totalLower}`);
});
