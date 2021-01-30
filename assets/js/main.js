const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "../../assets/img/flappy-bird-set.png"

/* Settings general */
let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36]
const jump = -11.5
const cTenth = (canvas.width / 10)

let a = "salut"
let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyheight;

const render = () => {
    index++;


    ctx.drawImage(img, 432, 0, ...size, ((canvas.width / 2) - size
    [0] / 2), flyheight, ...size);

    window.requestAnimationFrame(render);
}
img.onload = render;

