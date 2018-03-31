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
var hornForward =			new Audio('vibrations/flower_forward.mp3');hornForward.volume=0.15;
var hornReverse=			new Audio('vibrations/flower_reverse.mp3');hornReverse.volume=0.15;
var stretchForward =		new Audio('vibrations/stretch_forward.mp3');stretchForward.volume=0.15;
var stretchReverse =		new Audio('vibrations/stretch_reverse.mp3');stretchReverse.volume=0.15;
var space =					new Audio('vibrations/space.mp3');space.volume=0.15;
var projector =				new Audio('vibrations/projector.mp3');projector.volume=0.15;
var chatter =				new Audio('vibrations/chatter.mp3');chatter.volume=0.15;
var bombForward =			new Audio('vibrations/inflate.mp3');bombForward.volume=0.15;
var bombReverse =			new Audio('vibrations/deflate.mp3');bombReverse.volume=0.15;
var tape =					new Audio('tracks/17 - Strawberry Switchblade - Trees And Flowers.mp3'); tape.volume=0.1;
var tapePlay =				1;

document.tape.title = "> Strawberry Switchblade - Trees And Flowers <";

function playTape() {
	if (tapePlay) {
		document.tape.src = 'photos/whirlpool_framed_forward.gif';
		tape.play(); tape.onended = function() { tape.play(); };
	} else {
		document.tape.src = 'photos/whirlpool_framed.gif';
		tape.pause();
	}
}

function loadGifs() {
	if (typeof window.orientation !== 'undefined') {
		document.flower.src='photos/framed_flower_forward.gif';document.flower.src='photos/framed_flower_reverse.gif';document.flower.src='photos/framed_flower.gif';
		document.eye.src='photos/framed_eye_forward.gif';document.eye.src='photos/framed_eye_reverse.gif';document.eye.src='photos/framed_eye.gif';
		document.golden.src='photos/framed_spiral_forward.gif';document.golden.src='photos/framed_spiral.gif';
		document.horse.src='photos/framed_horse_forward.gif';document.horse.src='photos/framed_horse_reverse.gif';document.horse.src='photos/framed_horse.gif';
		document.mouth.src='photos/framed_mouth_forward.gif';document.mouth.src='photos/framed_mouth.gif';
		document.nuke.src='photos/framed_nuke_forward.gif';document.nuke.src='photos/framed_nuke_reverse.gif';document.nuke.src='photos/framed_nuke.gif';
		document.tape.src='photos/whirlpool_framed_forward.gif';document.tape.src='photos/whirlpool_framed.gif';
	}
}

function fibonacci(nterms)	{ var n1=0;var n2=1;var next;var goldenRatio;for(var i=0;i<nterms;i++){next=n1+n2;n1=n2;n2=next;goldenRatio=n2/n1;console.log(next+" (Golden ratio = "+goldenRatio+")");} }
function playHorn()			{ hornReverse.pause();hornReverse.currentTime=0;hornForward.play(); }
function stopHorn()			{ hornForward.pause();hornForward.currentTime=0; hornReverse.play(); }
function playStretch()		{ stretchReverse.pause();stretchReverse.currentTime=0;stretchForward.play(); }
function stopStretch()		{ stretchForward.pause();stretchForward.currentTime=0;stretchReverse.play(); }
function playSpace()		{ space.play(); }
function stopSpace()		{ space.pause();space.currentTime=0; }
function playProjector()	{ projector.play(); }
function stopProjector()	{ projector.pause();projector.currentTime=0; }
function playChatter()		{ chatter.play(); }
function stopChatter()		{ chatter.pause();chatter.currentTime=0; }
function playBomb()			{ bombReverse.pause();bombReverse.currentTime=0;bombForward.play(); }
function stopBomb()			{ bombForward.pause();bombForward.currentTime=0;bombReverse.play(); }

playTape();
