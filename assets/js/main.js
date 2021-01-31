const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "../../assets/img/flappy-bird-set.png"

/* Settings general */
let gamePlaying = false;
const gravity = .5;
const speed = 3.2;
const size = [52, 36]
const jump = -10
const cTenth = (canvas.width / 10)

/* Tuyau ettings */
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * (canvas.clientHeight - (pipeGap + pipeWidth) - pipeWidth)) + pipeWidth;

/* Utile pour le jeux */
let index = 0,
    bestScore = 0,
    currentScore = 0,
    tuyau = [],
    flight,
    flyheight;

let setup = () => {
    currentScore = 0;
    flight = jump;
    flyheight = (canvas.clientHeight / 2) - (size[1] / 2);

    tuyau = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
}




/* Fonction  animations */
const render = () => {
    index++;

    //  Ajout du background 
    ctx.drawImage(img, 0, 0, canvas.width, canvas.clientHeight, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.clientHeight);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.clientHeight, -((index * (speed / 2)) % canvas.width), 0, canvas.width, canvas.clientHeight);

    if (gamePlaying) {
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyheight, ...size);
        flight += gravity;
        flyheight = Math.min(flyheight + flight, canvas.clientHeight - size[1]);
    } else {

        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyheight, ...size)
        flyheight = (canvas.clientHeight / 2) - (size[1] / 2);

        // Ajout du score + clique
        ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
        ctx.fillText("Cliquez pour jouer", 48, 535);

        ctx.font = "bold 30px courier";
    }

    // Display pipe
    if (gamePlaying) {
        tuyau.map(pipe => {
            pipe[0] -= speed;

            /* Top pipe */
            ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
            // Bottom pipe
            ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.clientHeight - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.clientHeight - pipe[1] + pipeGap)

            if (pipe[0] <= -pipeWidth) {
                currentScore++;
                bestScore = Math.max(bestScore, currentScore)
                // Add pipe (Ajout de pipe)
                tuyau = [...tuyau.slice(1), [tuyau[tuyau.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];
                console.log(tuyau);
            }
        })
    }

    window.requestAnimationFrame(render);
}
/* Appel de la fonction setup */
setup();

img.onload = render;
document.addEventListener("click", () => gamePlaying = true);
window.onclick = () => flight = jump;
