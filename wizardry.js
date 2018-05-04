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
var sounds = 			[ 	[ new Audio('vibrations/flower_forward.mp3'), new Audio('vibrations/flower_reverse.mp3') ],
			 				[ new Audio('vibrations/stretch_forward.mp3'), new Audio('vibrations/stretch_reverse.mp3') ],
			 				[ new Audio('vibrations/space.mp3') ],
			 				[ new Audio('vibrations/projector.mp3') ],
			 				[ new Audio('vibrations/chatter.mp3') ],
			 				[ new Audio('vibrations/inflate.mp3'), new Audio('vibrations/deflate.mp3')] ]
var mixtape =				new Audio('mixtapes/E R R S T H E T I C/01 Strawberry Switchblade - Who Knows What Love Is.mp3');
var tracks =			[	"01 Strawberry Switchblade - Who Knows What Love Is.mp3",
							"02 Pebbles - Why Do I Believe.mp3",
							"03 Dee Dee Wilde - Lap of Luxury.mp3",
							"04 Dionne Warwick - Can't Hide Love.mp3",
							"05 The Jets - The Only Dance.mp3"	],
title = 					"E R R S T H E T I C  /  V O L U M E  O N E\n"+
							"[01 Strawberry Switchblade - Who Knows What Love Is]\n"+
							"[02 Pebbles - Why Do I Believe]\n"+
							"[03 Dee Dee Wilde - Lap of Luxury]\n"+
							"[04 Dionne Warwick - Can't Hide Love]\n"+
							"[05 The Jets - The Only Dance]\n",
tapePlay =					true,
track =						0,
menu = 						false;
items = [ ["0", "0"], ["1", "1"], ["games/fisher", "games/slingshoot"], ["3", "3"], ["4", "4"], ["5", "5"] ];
for (var x = 0; x < sounds.length; x++) for (var y = 0; y < sounds[x].length; y++) sounds[x][y].volume = 0.15;

function playTape() {
	if (tapePlay) {
		document.tape.src = 'photos/framed_tape_forward.gif';
		mixtape.volume = 0.15; mixtape.play();
		mixtape.onended = function() { for (var i = 0; i < 2; i++) { tapePlay = !tapePlay; playTape(); } };
		highlightTrack(track + 1);
	} else {
		document.tape.src = 'photos/framed_tape.gif';
		mixtape.pause(); mixtape.currentTime = 0;
		track = track < tracks.length - 1 ? track + 1 : 0;
		mixtape = new Audio('mixtapes/E R R S T H E T I C/' + tracks[track]);
	}
}

function highlightTrack(track) {
	trackTitle = title.split("\n");
	if (track == 1 && trackTitle[5].includes(">")) removeHighlight(5); if (track > 1) removeHighlight(track - 1);
	trackTitle[track] = "> " + trackTitle[track] + " <"; title = "";
	for (var i = 0; i < trackTitle.length; i++) title += trackTitle[i+1] != null ? trackTitle[i] + "\n" : "" ; document.tape.title = title;
} function removeHighlight(track) { trackTitle[track] = trackTitle[track].substring(2, trackTitle[track].length - 2); }

function init() {
	if (typeof window.orientation !== 'undefined') {
		document.flower.src='photos/framed_flower_forward.gif';document.flower.src='photos/framed_flower_reverse.gif';document.flower.src='photos/framed_flower.gif';
		document.eye.src='photos/framed_eye_forward.gif';document.eye.src='photos/framed_eye_reverse.gif';document.eye.src='photos/framed_eye.gif';
		document.golden.src='photos/framed_spiral_forward.gif';document.golden.src='photos/framed_spiral.gif';
		document.horse.src='photos/framed_horse_forward.gif';document.horse.src='photos/framed_horse_reverse.gif';document.horse.src='photos/framed_horse.gif';
		document.mouth.src='photos/framed_mouth_forward.gif';document.mouth.src='photos/framed_mouth.gif';
		document.nuke.src='photos/framed_nuke_forward.gif';document.nuke.src='photos/framed_nuke_reverse.gif';document.nuke.src='photos/framed_nuke.gif';
		document.tape.src='photos/framed_tape.gif';document.tape.src='photos/framed_tape_forward.gif';
	}
}

function showMenu(option)	{ document.getElementById("menu").innerHTML="";menu=!menu;for(var i=0;i<items[option].length;i++){document.getElementById("menu").innerHTML+=menu?"<a style='padding:13em;' href='"+items[option][i]+"'><img id='menu' src='"+items[option][i]+"/logo.png'/></a>":"";} }
function fibonacci(nterms)	{ var n1=0;var n2=1;var next;var goldenRatio;for(var i=0;i<nterms;i++){next=n1+n2;n1=n2;n2=next;goldenRatio=n2/n1;console.log(next+" (Golden ratio = "+goldenRatio+")");} }
function playHorn()			{ sounds[0][1].pause();sounds[0][1].currentTime=0;sounds[0][0].play(); }
function stopHorn()			{ sounds[0][0].pause();sounds[0][0].currentTime=0; sounds[0][1].play(); }
function playStretch()		{ sounds[1][1].pause();sounds[1][1].currentTime=0;sounds[1][0].play(); }
function stopStretch()		{ sounds[1][0].pause();sounds[1][0].currentTime=0;sounds[1][1].play(); }
function playSpace()		{ sounds[2][0].play(); }
function stopSpace()		{ sounds[2][0].pause();sounds[2][0].currentTime=0; }
function playProjector()	{ sounds[3][0].play(); }
function stopProjector()	{ sounds[3][0].pause();sounds[3][0].currentTime=0; }
function playChatter()		{ sounds[4][0].play(); }
function stopChatter()		{ sounds[4][0].pause();sounds[4][0].currentTime=0; }
function playBomb()			{ sounds[5][1].pause();sounds[5][1].currentTime=0;sounds[5][0].play(); }
function stopBomb()			{ sounds[5][0].pause();sounds[5][0].currentTime=0;sounds[5][1].play(); }

playTape();
