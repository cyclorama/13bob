let textArea = document.getElementById("text");
textArea.oninput = () => {
    let wordCount = textArea.value.split(" ").length;
    console.log(wordCount);
};
