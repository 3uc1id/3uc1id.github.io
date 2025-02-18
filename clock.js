const TAU = 6.283185307179586;
const TICK = 100; // ms per frame
const RADIUS = 100; // radius of clock circle
const WIDTH = 250; // canvas width
const HEIGHT = 250; // canvas height
const BIG_STEP = TAU / 12;
const SMALL_STEP = TAU / 60;
const HH = HEIGHT / 2;
const HW = WIDTH / 2;

// lengths of the hands of the clock
const SECOND_LENGTH = RADIUS * 0.9;
const MINUTE_LENGTH = RADIUS * 0.8;
const HOUR_LENGTH = RADIUS * 0.5;


function drawClock() {
    canvas = document.getElementById("clock");
    ctx = canvas.getContext("2d");
    drawHelper(ctx);
}

function drawHelper(ctx) {
    // clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // draw ciruclar clock outline
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(125,125,100,0,TAU);
    ctx.stroke();

    // draw hour ticks
    for(let i=0; i<12; i++){
        let angle = BIG_STEP*i;
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(HW + RADIUS*c, HH - RADIUS*s);
        ctx.lineTo(HW + 0.9*RADIUS*c, HH - 0.9*RADIUS*s);
        ctx.stroke();
    }

    // draw minute ticks
    ctx.lineWidth = 1;
    for(let i=1; i<60; i++){
        if((i%5) == 0){
            continue;
        }
        let angle = SMALL_STEP*i;
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(HW + RADIUS*c, HH - RADIUS*s);
        ctx.lineTo(HW + 0.95*RADIUS*c, HH - 0.95*RADIUS*s);
        ctx.stroke();
    }

    // draw the hands
    ctx.strokeStyle = "red";
    let time = new Date(Date.now());
    let seconds = time.getSeconds() + time.getMilliseconds()/1000;
    let minutes = time.getMinutes() + seconds/60;
    let hours = time.getHours() + minutes/60;

    // draw second hand
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(WIDTH/2, HEIGHT/2);
    ctx.lineTo(
        HW + SECOND_LENGTH * Math.cos(TAU/4 - SMALL_STEP*seconds),
        HH - SECOND_LENGTH * Math.sin(TAU/4 - SMALL_STEP*seconds)
    );
    ctx.stroke();

    ctx.strokeStyle = "black";
    // draw minute hand
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(WIDTH/2, HEIGHT/2);
    ctx.lineTo(
        HW + MINUTE_LENGTH * Math.cos(TAU/4 - SMALL_STEP*minutes),
        HH - MINUTE_LENGTH * Math.sin(TAU/4 - SMALL_STEP*minutes)
    );
    ctx.stroke();

    // draw hour hand
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(WIDTH/2, HEIGHT/2);
    ctx.lineTo(
        HW + HOUR_LENGTH * Math.cos(TAU/4 - BIG_STEP*hours),
        HH - HOUR_LENGTH * Math.sin(TAU/4 - BIG_STEP*hours)
    );
    ctx.stroke();

    setTimeout(drawHelper, TICK, ctx);
}
