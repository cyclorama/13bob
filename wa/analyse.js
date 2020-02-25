let textArea = document.getElementById("text");
let wordCount = document.getElementById("wordCount");
textArea.oninput = () => {
    let wordArr = textArea.value.split(" ").filter(el => { return el != "" });
    wordCount.innerHTML = wordArr.length;
};
