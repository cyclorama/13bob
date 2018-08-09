function beautify() {
	var ul, msg, usr, lc, c = document.getElementById('chat').value.split(':\n'), l = (m) => m.split('\n');
	document.getElementById('chat').value = '';
	for (var i = 1; i < c.length; i++) {
		ul = l(c[i - 1]);
		msg = l(c[i]);
		usr = ul[ul.length - 2];
		lc = i < c.length - 1 ? msg.length - 2 : msg.length;
		for (var j = 0; j < lc; j++) {
			document.getElementById('chat').value += usr + ' : ' + msg[j] + '\n';
		}
	}
}