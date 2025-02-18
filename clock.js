const TAU = 6.283185307179586;
const QTAU = TAU/4.0;
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

// Stroke widths
const CLOCK_BORDER_WIDTH = 2;
const HOUR_MARK_WIDTH = 2;
const MINUTE_MARK_WIDTH = 1;
const SECOND_HAND_WIDTH = 1;
const MINUTE_HAND_WIDTH = 2;
const HOUR_HAND_WIDTH = 5;


function drawClock() {
    canvas = document.getElementById("clock");
    ctx = canvas.getContext("2d");
    ctx.translate(HW, HH); // move origin to center of canvas
    ctx.scale(1.0, -1.0); // flip y axis so it goes up instead of down
    drawHelper(ctx);
}

function drawHelper(ctx) {
    // clear the canvas
    // Normally clearRect takes the top left corner of the rectangle to clear,
    // along with the width and height. But since the coordinate transform flipped the
    // y-axis, it needs the bottom left corner instead.
    ctx.clearRect(-HW, -HH, WIDTH, HEIGHT);

    // draw circular clock outline
    ctx.strokeStyle = "black";
    ctx.lineWidth = CLOCK_BORDER_WIDTH;
    ctx.beginPath();
    ctx.arc(0.0, 0.0, RADIUS, 0.0, TAU);
    ctx.stroke();

    // draw hour ticks
    ctx.lineWidth = HOUR_MARK_WIDTH;
    for(let i=0; i<12; i++){
        let angle = BIG_STEP*i;
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(RADIUS*c, RADIUS*s);
        ctx.lineTo(0.9*RADIUS*c, 0.9*RADIUS*s);
        ctx.stroke();
    }

    // draw minute ticks
    ctx.lineWidth = MINUTE_MARK_WIDTH;
    for(let i=1; i<60; i++){
        if((i%5) == 0){
            continue;
        }
        let angle = SMALL_STEP*i;
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(RADIUS*c, RADIUS*s);
        ctx.lineTo(0.95*RADIUS*c, 0.95*RADIUS*s);
        ctx.stroke();
    }

    // draw the hands
    ctx.strokeStyle = "red";
    let time = new Date(Date.now());
    let seconds = time.getSeconds() + time.getMilliseconds()/1000;
    let minutes = time.getMinutes() + seconds/60;
    let hours = time.getHours() + minutes/60;

    // draw second hand
    ctx.lineWidth = SECOND_HAND_WIDTH;
    ctx.beginPath();
    ctx.moveTo(0.0, 0.0);
    ctx.lineTo(
        SECOND_LENGTH * Math.cos(QTAU - SMALL_STEP*seconds),
        SECOND_LENGTH * Math.sin(QTAU - SMALL_STEP*seconds)
    );
    ctx.stroke();

    // draw minute hand
    ctx.strokeStyle = "black";
    ctx.lineWidth = MINUTE_HAND_WIDTH;
    ctx.beginPath();
    ctx.moveTo(0.0, 0.0);
    ctx.lineTo(
        MINUTE_LENGTH * Math.cos(QTAU - SMALL_STEP*minutes),
        MINUTE_LENGTH * Math.sin(QTAU - SMALL_STEP*minutes)
    );
    ctx.stroke();

    // draw hour hand
    ctx.lineWidth = HOUR_HAND_WIDTH;
    ctx.beginPath();
    ctx.moveTo(0.0, 0.0);
    ctx.lineTo(
        HOUR_LENGTH * Math.cos(QTAU - BIG_STEP*hours),
        HOUR_LENGTH * Math.sin(QTAU - BIG_STEP*hours)
    );
    ctx.stroke();

    setTimeout(drawHelper, TICK, ctx);
}
