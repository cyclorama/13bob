let textArea = document.getElementById("text");
textArea.oninput = () => {
    let wordCount = textArea.value.split(" ").filter(el => { return el != "" });
    console.log(wordCountFiltered.length);
};
