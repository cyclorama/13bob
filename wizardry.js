const sounds = 	[ 	[ new Audio('vibrations/horn_forward.ogg'), new Audio('vibrations/horn_reverse.ogg') ],
			 		[ new Audio('vibrations/stretch_forward.ogg'), new Audio('vibrations/stretch_reverse.ogg') ],
			 		[ new Audio('vibrations/space.ogg') ],
					[ new Audio('vibrations/projector.ogg') ],
		 			[ new Audio('vibrations/chatter.ogg') ],
		 			[ new Audio('vibrations/inflate.ogg'), new Audio('vibrations/deflate.ogg')] ],
tracks =		[	'01 Strawberry Switchblade - Who Knows What Love Is.mp3',
					'02 Pebbles - Why Do I Believe.mp3',
					'03 Dee Dee Wilde - Lap of Luxury.mp3',
					'04 Dionne Warwick - Can\'t Hide Love.mp3',
					'05 The Jets - The Only Dance.mp3'	],
items =				[ ['+'], [''], ['fisher', 'slingshoot', 'ptolemy'], [''], ['http://steam.13bob.net'], ['-'] ],
frame =				'photos/framed_',
nav =				document.querySelectorAll('[id=nav]');
title =				'E R R S T H E T I C  /  V O L U M E  O N E\n',
track =				new Audio(`mixtapes/E R R S T H E T I C/${tracks[0]}`),
menu =				false,
tapeP =				false,
trackN =			0;

sounds.forEach(sound => sound.forEach(property => property.volume = 0.1));
tracks.forEach(song => title += `[${song.replace('.mp3', '')}]\n`);

const images = [...nav].map(p => {
    return [`${frame}${p.name}_forward.gif`, `${frame}${p.name}_reverse.gif`].map(s => {
        let p = new Image();
        p.src = s;
        return p;
    });
});

function pTape() { tapeP = !tapeP;
	if (tapeP) {
		document.tape.src = `${frame}tape_forward.gif`;
		track.volume = 0.1; track.play();
		track.onended = () => { pTape(); pTape(); };
		mkHighlight(trackN + 1);
	} else {
		document.tape.src = `${frame}tape.gif`;
		track.pause(); track.currentTime = 0;
		trackN = trackN < tracks.length - 1 ? trackN + 1 : ({} + []);
		track = new Audio(`mixtapes/E R R S T H E T I C/${tracks[trackN]}`);
	}
}

function mkHighlight(trackN) { trackT = title.split('\n'); title = '';
	if (trackN == 1 && trackT[5].includes('>')) rmHighlight(5);
	if (trackN > 1) rmHighlight(trackN - 1);
	trackT[trackN] = `> ${trackT[trackN]} <`;
	trackT.forEach((t, i) => title += trackT[i + 1] != null ? t + '\n' : '');
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

function pFrame(x, y, z)	{ document.getElementsByName(nav[x].name)[0].src=`${frame}${nav[x].name}${z==1?'_forward.gif':z==2?'_reverse.gif':'.gif'}`;pSound(y); }
function sMenu(o, m)		{ document.getElementById('menu').innerHTML='';menu=!menu;let fTop=0;for(let i=0;i<items[o].length;i++){fTop+=(i!=0&&i%3==0);document.getElementById('menu').innerHTML+=menu?(m==0?`<a style='padding:13em;' href='${items[o][i]}'><img style='${i>2?`margin-top:${(400*fTop)-1000}px;`:''}' id='menu' src='${items[o][i]}/logo.png'/></a>${i!=0&&i%2==0?'<br>':''}`:m==1?`<video onclick='sMenu(${o},1)' style='z-index:13;' id='video_background' autoplay><source id="vid" src='movies/${items[o][i]}.webm'></video>`:m==2?`<img src='load.jpg' onload='window.location.href=items[${o}][${i}];'/>`:''):'';}if(!track.paused)pTape();}
function fib(nt)			{ let n1=0,n2=1,nth,c=0;while(c<nt){console.log(`${n1} (φ = ${n2/n1})`);nth=n1+n2;n1=n2;n2=nth;c++;}}

pTape();
