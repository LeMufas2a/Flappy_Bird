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

/* Fonction  animations */
const render = () => {
    index++;

    //  background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.clientHeight, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.clientHeight);



    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyheight, ...size)
    flyheight = (canvas.clientHeight / 2) - (size[1] / 2);

    window.requestAnimationFrame(render);
}
img.onload = render;

