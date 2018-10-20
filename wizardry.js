var sounds = 	[ 	[ new Audio('vibrations/flower_forward.mp3'), new Audio('vibrations/flower_reverse.mp3') ],
			 		[ new Audio('vibrations/stretch_forward.mp3'), new Audio('vibrations/stretch_reverse.mp3') ],
			 		[ new Audio('vibrations/space.mp3') ],
					[ new Audio('vibrations/projector.mp3') ],
		 			[ new Audio('vibrations/chatter.mp3') ],
		 			[ new Audio('vibrations/inflate.mp3'), new Audio('vibrations/deflate.mp3')] ],
title =				'E R R S T H E T I C  /  V O L U M E  O N E\n',
tracks =		[	'01 Strawberry Switchblade - Who Knows What Love Is.mp3',
					'02 Pebbles - Why Do I Believe.mp3',
					'03 Dee Dee Wilde - Lap of Luxury.mp3',
					'04 Dionne Warwick - Can\'t Hide Love.mp3',
					'05 The Jets - The Only Dance.mp3'	],
track =				new Audio(`mixtapes/E R R S T H E T I C/${tracks[0]}`),
items =				[ ['+'], [''], ['fisher', 'slingshoot', 'ptolemy', 'btc', 'btc2'], [''], ['http://steamcommunity.com/id/huh'], ['-'] ],
images =			new Array(),
menu =				false,
tapeP =				false,
trackN =			0;

for (var x = 0; x < sounds.length; x++) for (var y = 0; y < sounds[x].length; y++) sounds[x][y].volume = 0.15;
for (var i = 0; i < tracks.length; i++) title += `[${tracks[i].replace('.mp3', '')}]\n`

function pTape() { tapeP = !tapeP;
	if (tapeP) {
		document.tape.src = 'photos/framed_tape_forward.gif';
		track.volume = 0.15; track.play();
		track.onended = function() { pTape(); pTape(); };
		addHighlight(trackN + 1);
	} else {
		document.tape.src = 'photos/framed_tape.gif';
		track.pause(); track.currentTime = 0;
		trackN = trackN < tracks.length - 1 ? trackN + 1 : 0;
		track = new Audio(`mixtapes/E R R S T H E T I C/${tracks[trackN]}`);
	}
}

function addHighlight(trackN) { trackT = title.split('\n'); title = '';
	if (trackN == 1 && trackT[5].includes('>')) rmHighlight(5);
	if (trackN > 1) rmHighlight(trackN - 1);
	trackT[trackN] = `> ${trackT[trackN]} <`;
	for (var i = 0; i < trackT.length; i++) title += trackT[i+1] != null ? trackT[i] + '\n' : '' ;
	document.tape.title = title;
} function rmHighlight(trackN) { trackT[trackN] = trackT[trackN].substring(2, trackT[trackN].length - 2); }

function pSound(s) {
	if (s == 0)  { sounds[0][1].pause();sounds[0][1].currentTime=0;sounds[0][0].play(); }
	if (s == 1)  { sounds[0][0].pause();sounds[0][0].currentTime=0;sounds[0][1].play(); }
	if (s == 2)  { sounds[1][1].pause();sounds[1][1].currentTime=0;sounds[1][0].play(); }
	if (s == 3)  { sounds[1][0].pause();sounds[1][0].currentTime=0;sounds[1][1].play(); }
	if (s == 10) { sounds[5][1].pause();sounds[5][1].currentTime=0;sounds[5][0].play(); }
	if (s == 11) { sounds[5][0].pause();sounds[5][0].currentTime=0;sounds[5][1].play(); }
	if (s == 5)  { sounds[2][0].pause();sounds[2][0].currentTime=0; }
	if (s == 7)  { sounds[3][0].pause();sounds[3][0].currentTime=0; }
	if (s == 9)  { sounds[4][0].pause();sounds[4][0].currentTime=0; }
	if (s == 4)  { sounds[2][0].play(); }
	if (s == 6)  { sounds[3][0].play(); }
	if (s == 8)  { sounds[4][0].play(); }
}

function preload() { var img = 0;
	for (var i = 0; i < (document.querySelectorAll('[id=nav]').length - 1) * 2; i+=2) {
		images[i] = new Image(); images[i + 1] = new Image();
		images[i].src = `photos/framed_${document.querySelectorAll('[id=nav]')[img].name}_forward.gif`;
		images[i + 1].src = `photos/framed_${document.querySelectorAll('[id=nav]')[img].name}_reverse.gif`;
		img++;
	}
}

function pFrame(x, y, z)	{ document.getElementsByName(document.querySelectorAll('[id=nav]')[x].name)[0].src=`photos/framed_${document.querySelectorAll('[id=nav]')[x].name}${z==1?'_forward.gif':z==2?'_reverse.gif':'.gif'}`;pSound(y); }
function sMenu(o, m)		{ document.getElementById('menu').innerHTML='';menu=!menu;var fTop=0;for(var i=0;i<items[o].length;i++){fTop+=(i!=0&&i%3==0);console.log(fTop);document.getElementById('menu').innerHTML+=menu?(m==0?`<a style='transform:translate(0,${800*fTop}px);padding:13em;' href='${items[o][i]}'><img id='menu' src='${items[o][i]}/logo.png'/></a>${i!=0&&i%2==0?'<br>':''}`:m==1?`<video onclick='sMenu(${o},1)' style='z-index:13;' id='video_background' autoplay><source src='movies/${items[o][i]}.mp4'></video>`:m==2?`<img src='load.jpg' onload='window.location.href=items[${o}][${i}];'/>`:''):'';}if(!track.paused)pTape();}
function fibonacci(nterms)	{ var n1=0,n2=1,next,goldenRatio;for(var i=0;i<nterms;i++){next=n1+n2;n1=n2;n2=next;goldenRatio=n2/n1;console.log(`${next} (Golden ratio = ${goldenRatio})`);} }

preload();
pTape();
