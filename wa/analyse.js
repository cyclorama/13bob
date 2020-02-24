let textArea = document.getElementById("text");
//textArea.onchange = () => { textArea.value += textArea.value; };
textArea.oninput = () => { document.getElementById("text").value += textArea.value; };

document.getElementById("text").value = "asd212312312312312312";
