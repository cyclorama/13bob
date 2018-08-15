/*
     __                            .-'''-.               
...-'  |`. ..-'''-.               '   _    \             
|      |  |\.-'''\ \   /|       /   /` '.   \ /|         
....   |  |       | |  ||      .   |     \  ' ||         
  -|   |  |    __/ /   ||      |   '      |  '||         
   |   |  |   |_  '.   ||  __  \    \     / / ||  __     
...'   `--'      `.  \ ||/'__ '.`.   ` ..' /  ||/'__ '.  
|         |`.      \ '.|:/`  '. '  '-...-'`   |:/`  '. ' 
` --------\ |       , |||     | |             ||     | | 
 `---------'        | |||\    / '             ||\    / ' 
                   / ,'|/\'..' /              |/\'..' /  
           -....--'  / '  `'-'`               '  `'-'`   
           `.. __..-'                                    
*/
function beautify() {
	var ul, msg, usr, i = 1, j, a = () => document.getElementById('chat'), l = (m) => m.split('\n'), c = a().value.split(':\n'); a().value = '';
	for (; i < c.length; i++) {
		msg = l(c[i]); ul = l(c[i - 1]); usr = ul[ul.length - 2];
		lc = i < c.length - 1 ? msg.length - 2 : msg.length;
		for (j = 0; j < lc;) a().value += `${usr} : ${msg[j++]}\n`;
}
