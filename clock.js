/**
 * Clock
 * @author munepuyo
 * 
 * usage:
 * var clock = new Clock();
 * clock.start(document.getElementById("ClockArea"));
 */
(function(global) {
"use strict;"

// Class ------------------------------------------------
function Clock() {
};

// Header -----------------------------------------------
Clock["prototype"]["start"] = Clock_start; // Clock#start(elmClockArea):void

// Implementation ---------------------------------------
var elmCanvas = document.createElement('canvas');
elmCanvas.width = 100;
elmCanvas.height = 100;
//elmCanvas.setAttribute('width',100);
//elmCanvas.setAttribute('height',100);

var elmBackground     = elmCanvas.cloneNode(true);
var elmBackgroundText = elmCanvas.cloneNode(true);
var elmClock          = elmCanvas.cloneNode(true);

elmBackground.style.position = elmBackgroundText.style.position = elmClock.style.position = 'absolute';

var ctx_bg      = elmBackground.getContext('2d');
var ctx_bg_text = elmBackgroundText.getContext('2d');
var ctx_clock   = elmClock.getContext('2d');

//background
ctx_bg.fillStyle='#E0FFFF';
ctx_bg.fillRect(0,0,50,50);
ctx_bg.fillStyle='#BBDDEF';
ctx_bg.fillRect(50,0,50,50);
ctx_bg.fillStyle='#BBDDEF';
ctx_bg.fillRect(0,50,50,50);
ctx_bg.fillStyle='#E0FFFF';
ctx_bg.fillRect(50,50,50,50);

//background text 
var textFill = ['#F09FFF','#F09EFF','#F09DFF','#F09CFF','#F09BFF','#F09AFF','#F06FFF','#F07FFF','#F08FFF','#F09FFF','#F0AFFF','#F0BFFF'];
for(var i=0;i<textFill.length;i++){
	ctx_bg_text.fillStyle=textFill[i];
	ctx_bg_text.beginPath();
	ctx_bg_text.arc(50+40*Math.sin(30*i*Math.PI/180),50-40*Math.cos(30*i*Math.PI/180),3,0,Math.PI*2,false);
	ctx_bg_text.fill();
	ctx_bg_text.closePath();
}

// 
function Clock_start(elmClockArea) {
	elmClockArea.appendChild(elmBackground);
	elmClockArea.appendChild(elmBackgroundText);
	elmClockArea.appendChild(elmClock);

	setInterval(Clock_move, 1000);
}

function Clock_move() {
	//get hour, minute, second
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	//clear
	ctx_clock.clearRect(0,0,100,100);

	//stroke second
	Clock_stroke_second(ctx_clock, second);

	//stroke minute
	Clock_stroke_minute(ctx_clock, minute);

	//stroke hour
	Clock_stroke_hour(ctx_clock, minute, hour);
}

function Clock_stroke_second(ctx, second) {
	ctx.strokeStyle='#00FF00';
	ctx.beginPath();
	ctx.moveTo(50,50);
	ctx.lineTo(50+40*Math.sin(second*6*Math.PI/180),50-40*Math.cos(second*6*Math.PI/180));
	ctx.stroke();
	ctx.closePath();
}

function Clock_stroke_minute(ctx, minute) {
	ctx.strokeStyle='#FF0000';
	ctx.beginPath();
	ctx.moveTo(50,50);
	ctx.lineTo(50+38*Math.sin(minute*6*Math.PI/180),50-38*Math.cos(minute*6*Math.PI/180));
	ctx.stroke();
	ctx.closePath();
}

function Clock_stroke_hour(ctx, minute, hour) {
	ctx.strokeStyle='#0000FF';
	ctx.beginPath();
	ctx.moveTo(50,50);
	ctx.lineTo(50+30*Math.sin((minute/60+hour)*30*Math.PI/180),50-30*Math.cos((minute/60+hour)*30*Math.PI/180));
	ctx.stroke();
	ctx.closePath();
}

// Exports ----------------------------------------------
if ("process" in global) {
    module["exports"] = Clock;
}
global["Clock"] = Clock;

})((this || 0).self || global); // function
