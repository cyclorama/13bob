let textArea = document.getElementById("text");
//textArea.onchange = () => { textArea.value += textArea.value; };
textArea.oninput = () => {
    let wordCount = textArea.split(" ").length;
    console.log(wordCount);
};
