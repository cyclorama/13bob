let textArea = document.getElementById("text");
//textArea.onchange = () => { textArea.value += textArea.value; };
textArea.oninput = () => { document.getElementById("text").value += textArea.value; };
