const TAU = 6.283185307179586;
const RADIUS = 100;
const WIDTH = 250;
const HEIGHT = 250;
const TIMESTEP = 0.1;


function drawClock() {
    canvas = document.getElementById("clock");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(125,125,100,0,TAU);
    ctx.stroke();

    for(let i=0; i<12; i++){
        let angle = TAU*i/12;
        ctx.beginPath();
        ctx.moveTo(WIDTH/2 + RADIUS*Math.cos(angle), HEIGHT/2 - RADIUS*Math.sin(angle));
        ctx.lineTo(WIDTH/2 + 0.9*RADIUS*Math.cos(angle), HEIGHT/2 - 0.9*RADIUS*Math.sin(angle));
        ctx.stroke();
    }

}
