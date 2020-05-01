let textArea = $("#text"), statArea = $("#stat");

textArea.on("input", () => {
    let textAreaVal = textArea.val(),
        totalLines  = textAreaVal.split("\n").length,
        totalWords  = textAreaVal ? textAreaVal.split("\n").join(" ").split(" ").filter(Boolean).length : 0,
        totalBytes  = textAreaVal.split("").length,
        totalUpper  = textAreaVal.split("").filter(p => p >= "A" && p <= "z" && p == p.toUpperCase()).length,
        totalLower  = textAreaVal.split("").filter(p => p >= "A" && p <= "z" && p == p.toLowerCase()).length;


    statArea.val(`line${totalLines != 1 ? "s" : ""}: ${totalLines}\nword${totalWords != 1 ? "s" : ""}: ${totalWords}\nbyte${totalBytes != 1 ? "s" : ""}: ${totalBytes}\nCHAR${totalUpper != 1 ? "S" : ""}: ${totalUpper}\nchar${totalLower != 1 ? "s" : ""}: ${totalLower}`);
});
