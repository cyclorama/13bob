let textArea = document.getElementById("text");
let wordCount = document.getElementById("wordCount");
textArea.oninput = () => {
    let wordArr = textArea.value.split(" ").filter(el => { return el != "" });
    wordCount.value = wordArr.length;
};
