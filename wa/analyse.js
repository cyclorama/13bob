let textArea = document.getElementById("text");
//textArea.onchange = () => { textArea.value += textArea.value; };
textArea.oninput = () => { textArea.value += textArea.value; };
