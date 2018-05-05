<!--
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
-->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="author" content="ebob">
		<meta name="description" content="Homepage">
		<link rel="icon" href="//13bob.net/world.gif">
		<link rel="stylesheet" type="text/css" href="//13bob.net/coolness.css">
		<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
		<title>13bob</title>
	</head>
	<body onload="init();">
		<h1><a href="//13bob.net/">13bob</a></h1>
		<center>
			<img onclick="menu(0);" onMouseOver="play(0,0,1);" onMouseOut="play(0,1,2);" src="photos/framed_flower.gif" name="flower" id="nav"/>
			<img onclick="menu(1);" onMouseOver="play(1,2,1);" onMouseOut="play(1,3,2);" src="photos/framed_eye.gif" name="eye" id="nav"/>
			<img onclick="menu(2);" onMouseOver="play(2,4,1);" onMouseOut="play(2,5,0);" src="photos/framed_golden.gif" name="golden" id="nav"/><br>
			<img onclick="menu(3);" onMouseOver="play(3,6,1);" onMouseOut="play(3,7,0);" src="photos/framed_horse.gif" name="horse" id="nav"/>
			<img onclick="menu(4);" onMouseOver="play(4,8,1);" onMouseOut="play(4,9,0);" src="photos/framed_mouth.gif" name="mouth" id="nav"/>
			<img onclick="menu(5);" onMouseOver="play(5,10,1);" onMouseOut="play(5,11,2);" src="photos/framed_nuke.gif" name="nuke" id="nav"/><br>
			<img onclick="tape();" name="tape" id="nav"/><div id="menu"></div>
		</center>
		<script src="wizardry.js" type="text/javascript"></script>
	</body>
</html>
