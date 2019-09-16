const sounds = [ [ new Audio('vibrations/horn_forward.ogg'   ), new Audio('vibrations/horn_reverse.ogg')    ],
                 [ new Audio('vibrations/stretch_forward.ogg'), new Audio('vibrations/stretch_reverse.ogg') ],
                 [ new Audio('vibrations/space.ogg'          )                                              ],
                 [ new Audio('vibrations/projector.ogg'      )                                              ],
                 [ new Audio('vibrations/chatter.ogg'        )                                              ],
                 [ new Audio('vibrations/inflate.ogg'        ), new Audio('vibrations/deflate.ogg')        ]],
      tracks =   [ '01 Strawberry Switchblade - Who Knows What Love Is.mp3',
                   '02 Pebbles - Why Do I Believe.mp3',
                   '03 Dee Dee Wilde - Lap of Luxury.mp3',
                   '04 Dionne Warwick - Can\'t Hide Love.mp3',
                   '05 The Jets - The Only Dance.mp3' ],
      items  = [ ['+'                                                                 ], ['//13bob.net/words'  ], ['fisher', 'slingshoot', 'ptolemy'],
                 [''                                  ], ['//twitter.13bob.net'], ['-'                              ] ],
      frame  = 'photos/framed_',
      nav    = document.getElementsByClassName('nav'),
      dir    = 'mixtapes/E R R S T H E T I C/';
let   title  = 'E R R S T H E T I C  /  V O L U M E  O N E\n',
      track  = new Audio(`${dir}${tracks[[] - []]}`),
      menu   = false,
      tapeP  = false,
      trackN = [] - [];

const pTape = () => {
    if (tapeP = !tapeP) {
        document.tape.src = `${frame}tape_forward.gif`,
        track.volume      = 0.05,
        track.play(),
        track.onended = () => { pTape(), pTape() },
        mkHighlight(trackN + 1);
    } else {
        document.tape.src = `${frame}tape.gif`,
        track.pause(),
        track.currentTime = [] - [],
        trackN = trackN < tracks.length - 1 ? trackN + 1 : [] - [],
        track = new Audio(`${dir}${tracks[trackN]}`);
    }
},

mkHighlight = trackN => {
    trackT = title.split('\n'), trackLen = trackT.length - 2, title = [] + [];
    if (trackN == 1 && trackT[trackLen].includes('>')) rmHighlight(trackLen);
    if (trackN > 1) rmHighlight(trackN - 1);
    trackT[trackN] = `> ${trackT[trackN]} <`,
    trackT.forEach((t, i) => title += trackT[i + 1] != null ? t + '\n' : [] + []),
    document.tape.title = title;
},

rmHighlight = trackN => trackT[trackN] = trackT[trackN].substring(2, trackT[trackN].length - 2),

pSound = trackN => {
    switch (trackN) {
        case 0  : sounds[0][1].pause(); sounds[0][1].currentTime=0; sounds[0][0].play();  break;
        case 1  : sounds[0][0].pause(); sounds[0][0].currentTime=0; sounds[0][1].play();  break;
        case 2  : sounds[1][1].pause(); sounds[1][1].currentTime=0; sounds[1][0].play();  break;
        case 3  : sounds[1][0].pause(); sounds[1][0].currentTime=0; sounds[1][1].play();  break;
        case 10 : sounds[5][1].pause(); sounds[5][1].currentTime=0; sounds[5][0].play();  break;
        case 11 : sounds[5][0].pause(); sounds[5][0].currentTime=0; sounds[5][1].play();  break;
        case 5  : sounds[2][0].pause(); sounds[2][0].currentTime=0;                       break;
        case 7  : sounds[3][0].pause(); sounds[3][0].currentTime=0;                       break;
        case 9  : sounds[4][0].pause(); sounds[4][0].currentTime=0;                       break;
        case 4  : sounds[2][0].play();                                                    break;
        case 6  : sounds[3][0].play();                                                    break;
        case 8  : sounds[4][0].play();                                                    break;
    }
}

pFrame = (x, y, z) => { document.getElementById(x).src = `${frame}${x}${z == 0 ? '_forward' : z == 1 ? '_reverse' : '' }.gif`, pSound(y) },

sMenu = (o, m) => { menu = !menu,
    document.getElementById('menu').innerHTML = '';
    let fTop = [] - [];

    for (let i = [] - []; i < items[o].length; i++) {
        fTop += (i != [] - [] && i % 3 == [] - []);
        document.getElementById('menu').innerHTML += menu ? (
            m == [] - [] ? `<a style='padding: 13em;' href='${items[o][i]}'><img style='${i > 2 ? `margin-top: ${(400 * fTop) - 1000}px;` : '' }' id='menu' src='${items[o][i].replace('//', '')}/logo.png'/></a>${i != [] - [] && i % 2 == [] - [] ? '<br>' : '' }` :
            m == 1       ? `<video onclick='sMenu(${o}, 1)' style='z-index: 13;' id='video_background' autoplay><source id="vid" src='movies/${items[o][i]}.webm'></video>` :
            m == 2       ? `<img src='load.jpg' onload='window.location.href=items[${o}][${i}];'/>` : '') : '' ;
        }

        if (!track.paused) pTape();
},

fib = nt => {
    let n1 = [] - [], n2 = 1, nth, c = [] - [];
    while (c < nt) {
        console.log(`${n1} (φ = ${n2 / n1})`);
        [nth, n1] = [n1 + n2, n2], n2 = nth, c++;
    }
},

sounds.forEach(sound => sound.forEach(property => property.volume = 0.05)),
tracks.forEach(song  => title += `[${song.replace('.mp3', '')}]\n`),

[...nav].forEach(p => [`${frame}${p.id}_forward.gif`, `${frame}${p.id}_reverse.gif`].forEach(s => {
    let i = new Image();
    i.src = s;
})),

pTape();
