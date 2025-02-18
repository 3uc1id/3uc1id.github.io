const TAU = 6.283185307179586;
const QTAU = TAU/4.0;
// const TICK = 100; // ms per frame
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
    let canvas = document.getElementById("clock");
    let ctx = canvas.getContext("2d");
    ctx.translate(HW, HH); // move origin to center of canvas
    ctx.scale(1.0, -1.0); // flip y axis so it goes up instead of down
    
    // set initial angles for the hands based on the current time.
    let last_frame;
    let start_time = new Date();
    let seconds = start_time.getSeconds() + start_time.getMilliseconds()/1000;
    let minutes = start_time.getMinutes() + seconds/60;
    let hours = start_time.getHours() + minutes/60;

    let seconds_angle = QTAU - seconds*SMALL_STEP;
    let minutes_angle = QTAU - minutes*SMALL_STEP;
    let hours_angle = QTAU - hours*BIG_STEP;

    // draw clock face once and save image data.
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

    // ctx.getImageData is not affected by ctx transforms
    let clock_face = ctx.getImageData(0, 0, WIDTH, HEIGHT);

    function drawHelper(timestamp) {
        if(last_frame === undefined){
            last_frame=timestamp;
            requestAnimationFrame(drawHelper);
            return;
        }
        // clear the canvas
        // Normally clearRect takes the top left corner of the rectangle to clear,
        // along with the width and height. But since the coordinate transform flipped the
        // y-axis, it needs the bottom left corner instead.
        ctx.clearRect(-HW, -HH, WIDTH, HEIGHT);
        // putImageData is not affected by the ctx transforms.
        ctx.putImageData(clock_face, 0, 0);
    
        // draw the hands
        ctx.strokeStyle = "red";

        let timestep = (timestamp - last_frame)/1000;
        seconds_angle -= (timestep%60)*SMALL_STEP;
        timestep /= 60;
        minutes_angle -= (timestep%60)*SMALL_STEP;
        timestep /= 60;
        hours_angle -= (timestep%12)*BIG_STEP;
    
        // draw second hand
        ctx.lineWidth = SECOND_HAND_WIDTH;
        ctx.beginPath();
        ctx.moveTo(0.0, 0.0);
        ctx.lineTo(
            SECOND_LENGTH * Math.cos(seconds_angle),
            SECOND_LENGTH * Math.sin(seconds_angle)
        );
        ctx.stroke();
    
        // draw minute hand
        ctx.strokeStyle = "black";
        ctx.lineWidth = MINUTE_HAND_WIDTH;
        ctx.beginPath();
        ctx.moveTo(0.0, 0.0);
        ctx.lineTo(
            MINUTE_LENGTH * Math.cos(minutes_angle),
            MINUTE_LENGTH * Math.sin(minutes_angle)
        );
        ctx.stroke();
    
        // draw hour hand
        ctx.lineWidth = HOUR_HAND_WIDTH;
        ctx.beginPath();
        ctx.moveTo(0.0, 0.0);
        ctx.lineTo(
            HOUR_LENGTH * Math.cos(hours_angle),
            HOUR_LENGTH * Math.sin(hours_angle)
        );
        ctx.stroke();
        
        last_frame=timestamp;
        requestAnimationFrame(drawHelper);
    }
    

    requestAnimationFrame(drawHelper);
}
