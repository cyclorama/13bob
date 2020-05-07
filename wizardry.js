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
      items  = [ ['+'], ['//13bob.net/words'], ['fisher', 'slingshoot', 'ptolemy'],
                 ['//spotify.13bob.net', '//steam.13bob.net', '//gitlab.13bob.net'], ['//twitter.13bob.net'], ['-'] ],
      frame  = 'photos/framed_',
      nav    = document.getElementsByClassName('nav'),
      dir    = 'mixtapes/E R R S T H E T I C/';
let   title  = 'E R R S T H E T I C  /  V O L U M E  O N E\n',
      track  = new Audio(`${dir}${tracks[0]}`),
      menu   = false,
      tapeP  = false,
      trackN = 0;

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
        track.currentTime = 0,
        trackN = trackN < tracks.length - 1 ? trackN + 1 : 0,
        track = new Audio(`${dir}${tracks[trackN]}`);
    }
},

mkHighlight = trackN => {
    trackT = title.split('\n'), trackLen = trackT.length - 2, title = '';
    if (trackN == 1 && trackT[trackLen].includes('>')) rmHighlight(trackLen);
    if (trackN > 1) rmHighlight(trackN - 1);
    trackT[trackN] = `> ${trackT[trackN]} <`,
    trackT.forEach((t, i) => title += trackT[i + 1] != null ? t + '\n' : ''),
    document.tape.title = title;
},

rmHighlight = trackN => trackT[trackN] = trackT[trackN].substr(2, trackT[trackN].length - 3),

pSound = trackN => {
    switch (trackN) {
        case 0  : sounds[0][1].pause(); sounds[0][1].currentTime = 0; sounds[0][0].play();  break;
        case 1  : sounds[0][0].pause(); sounds[0][0].currentTime = 0; sounds[0][1].play();  break;
        case 2  : sounds[1][1].pause(); sounds[1][1].currentTime = 0; sounds[1][0].play();  break;
        case 3  : sounds[1][0].pause(); sounds[1][0].currentTime = 0; sounds[1][1].play();  break;
        case 10 : sounds[5][1].pause(); sounds[5][1].currentTime = 0; sounds[5][0].play();  break;
        case 11 : sounds[5][0].pause(); sounds[5][0].currentTime = 0; sounds[5][1].play();  break;
        case 5  : sounds[2][0].pause(); sounds[2][0].currentTime = 0;                       break;
        case 7  : sounds[3][0].pause(); sounds[3][0].currentTime = 0;                       break;
        case 9  : sounds[4][0].pause(); sounds[4][0].currentTime = 0;                       break;
        case 4  : sounds[2][0].play();                                                      break;
        case 6  : sounds[3][0].play();                                                      break;
        case 8  : sounds[4][0].play();                                                      break;
    }
}

pFrame = (x, y, z) => { document.getElementById(x).src = `${frame}${x}${z == 0 ? '_forward' : z == 1 ? '_reverse' : '' }.gif`, pSound(y) },

sMenu = (o, m) => { menu = !menu,
    document.getElementById('menu').innerHTML = '';
    let fTop = 0;

    for (let i = 0; i < items[o].length; i++) {
        fTop += (i != 0 && i % 3 == 0);
        document.getElementById('menu').innerHTML += menu ? (
            m == 0 ? `<a style='padding: 13em;' href='${items[o][i]}'><img style='${i > 2 ? `margin-top: ${(400 * fTop) - 1000}px;` : '' }' id='menu' src='${items[o][i].replace('//', '')}/logo.png'/></a>${i != 0 && i % 2 == 0 ? '<br>' : '' }` :
            m == 1 ? `<video onclick='sMenu(${o}, 1)' style='z-index: 13;' id='video_background' autoplay><source id="vid" src='movies/${items[o][i]}.webm'></video>` :
            m == 2 ? `<img src='load.webp' onload='window.location.href=items[${o}][${i}];'/>` : '') : '' ;
        }
    if (!track.paused) pTape();
},

fib = nt => {
    let nth, n2 = 1, n1 = c = 0;
    while (c++ < nt) console.log(`${n1} (φ = ${n2 / n1})`), [nth, n1] = [n1 + n2, n2], n2 = nth;
},

window.isMobile = () => 
    (u => 
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(u)
        ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(u.substr(0, 4))
        ||
        false
    )(navigator.userAgent || navigator.vendor || window.opera);

sounds.forEach(sound => sound.forEach(property => property.volume = 0.05));
tracks.forEach(song  => title += `[${song.replace('.mp3', '')}]\n`);

[...nav].forEach(p => [`${frame}${p.id}_forward.gif`, `${frame}${p.id}_reverse.gif`].forEach(s => {
    let i = new Image();
    i.src = s;
}));

pTape();
