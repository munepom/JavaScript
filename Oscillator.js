/**
 * oscillator.js
 * @param global
 * @author munepom
 */
(function(global) {
"use strict;"
	
// var --------------------------------
var AudioContext = window.AudioContext || window.webkitAudioContext; // Safariでは、ベンダプレフィックスが必要かいな
if (! AudioContext) {
	return;
}
var context = new AudioContext();
var destination = context.destination;

// Class ------------------------------------------------
function Oscillator() {
	return this;
};

// Header -----------------------------------------------
Oscillator["prototype"]["getAudioContext"] = Oscillator_getAudioContext;
Oscillator["prototype"]["getDestination"] = Oscillator_getDestination;
Oscillator["prototype"]["createOsc"]  = Oscillator_createOsc; // Oscillator#createOsc(type:String, frequency:Integer):OscillatorNode
Oscillator["prototype"]["createGain"] = Oscillator_createGain; // Oscillator#createGain(gainValue:Integer):GainNode
Oscillator["prototype"]["createOsc2Gain"] = Oscillator_createOsc2Gain; // Oscillator#createOsc2Gain(type:String, frequency:Integer, gainValue:Integer):{OscillatorNode, GainNode}
Oscillator["prototype"]["createSine"] = Oscillator_createSine; // Oscillator#createSine(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createSquare"] = Oscillator_createSquare; // Oscillator#createSquare(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createSawtooth"] = Oscillator_createSawtooth; // Oscillator#createSawtooth(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createTriangle"] = Oscillator_createTriangle; // Oscillator#createTriangle(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createCustom"] = Oscillator_createCustom; // Oscillator#createCustom(frequency:Integer):OscillatorNode

Oscillator["prototype"]["sineC"] = Oscillator_sineC; // Oscillator#sineC(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineCis"] = Oscillator_sineCis; // Oscillator#sineCis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineD"] = Oscillator_sineD; // Oscillator#sineD(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineDis"] = Oscillator_sineDis; // Oscillator#sineDis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineE"] = Oscillator_sineE; // Oscillator#sineE(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineF"] = Oscillator_sineF; // Oscillator#sineF(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineFis"] = Oscillator_sineFis; // Oscillator#sineFis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineG"] = Oscillator_sineG; // Oscillator#sineG(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineGis"] = Oscillator_sineGis; // Oscillator#sineGis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineA"] = Oscillator_sineA; // Oscillator#sineA(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineAis"] = Oscillator_sineAis; // Oscillator#sineAis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sineH"] = Oscillator_sineH; // Oscillator#sineH(octave:Integer):OscillatorNode

Oscillator["prototype"]["squareC"] = Oscillator_squareC; // Oscillator#squareC(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareCis"] = Oscillator_squareCis; // Oscillator#squareCis(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareD"] = Oscillator_squareD; // Oscillator#squareD(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareDis"] = Oscillator_squareDis; // Oscillator#squareDis(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareE"] = Oscillator_squareE; // Oscillator#squareE(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareF"] = Oscillator_squareF; // Oscillator#squareF(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareFis"] = Oscillator_squareFis; // Oscillator#squareFis(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareG"] = Oscillator_squareG; // Oscillator#squareG(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareGis"] = Oscillator_squareGis; // Oscillator#squareGis(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareA"] = Oscillator_squareA; // Oscillator#squareA(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareAis"] = Oscillator_squareAis; // Oscillator#squareAis(octave:Integer):OscillatorNode
Oscillator["prototype"]["squareH"] = Oscillator_squareH; // Oscillator#squareH(octave:Integer):OscillatorNode


// Implementation ---------------------------------------
function Oscillator_getAudioContext() {
	return context;
}

function Oscillator_getDestination() {
	return destination;
}

function Oscillator_createOsc(type, frequency) {
	var osc = context.createOscillator();
	osc.type = type;
	osc.frequency.value = frequency;
	return osc;
}

function Oscillator_createGain(gainValue) {
	var gain = context.createGain();
	gain.gain.value = gainValue;
	return gain;
}

function Oscillator_createOsc2Gain(type, frequency, gainValue) {
	var osc = Oscillator_createOsc(type, frequency);
	var gain = Oscillator_createGain(gainValue);
	osc.connect(gain);
	return {
		osc:      osc,
		gainNode: gainNode
	};
}

function Oscillator_createSine(frequency) {
	return Oscillator_createOsc("sine", frequency);
}
function Oscillator_createSquare(frequency) {
	return Oscillator_createOsc("square", frequency);
}
function Oscillator_createSawtooth(frequency) {
	return Oscillator_createOsc("saw", frequency);
}
function Oscillator_createTriangle(frequency) {
	return Oscillator_createOsc("triangle", frequency);
}
function Oscillator_createCustom(frequency) {
	return Oscillator_createOsc("custom", frequency);
}

function Oscillator_createSine2Gain(frequency, gain) {
	return Oscillator_createOsc2Gain("sine", frequency, gain);
}
function Oscillator_createSquare2Gain(frequency, gain) {
	return Oscillator_createOsc2Gain("square", frequency, gain);
}
function Oscillator_createSawtooth2Gain(frequency, gain) {
	return Oscillator_createOsc2Gain("saw", frequency, gain);
}
function Oscillator_createTriangle2Gain(frequency, gain) {
	return Oscillator_createOsc2Gain("triangle", frequency, gain);
}
function Oscillator_createCustom2Gain(frequency, gain) {
	return Oscillator_createOsc2Gain("custom", frequency, gain);
}

/**
 * 平均律計算
 * http://homepage1.nifty.com/musica/enharmonic.htm
 */
function Oscillator_getFrequencyEqualTemperament(noteName, octave) {
	var base = 32.5;
	var ratio;
	switch (noteName) {
	case 'C':
		ratio = 1;
		break;
	case 'Cis':
		ratio = 1.060;
		break;
	case 'D':
		ratio = 1.122;
		break;
	case 'Dis':
		ratio = 1.189;
		break;
	case 'E':
		ratio = 1.260;
		break;
	case 'F':
		ratio = 1.335;
		break;
	case 'Fis':
		ratio = 1.414;
		break;
	case 'G':
		ratio = 1.498;
		break;
	case 'Gis':
		ratio = 1.587;
		break;
	case 'A':
		ratio = 1.682;
		break;
	case 'Ais':
		ratio = 1.782;
		break;
	case 'H':
		ratio = 1.888;
		break;
	default: 
		ratio = 1.682;
		break;
	}
	return Math.ceil(base * ratio * Math.pow(2, octave));
}

// Sine Wave ----------------------------------
function Oscillator_sineC(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('C', octave));
}
function Oscillator_sineCis(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('Cis', octave));
}
function Oscillator_sineD(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('D', octave));
}
function Oscillator_sineDis(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('Dis', octave));
}
function Oscillator_sineE(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('E', octave));
}
function Oscillator_sineF(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('F', octave));
}
function Oscillator_sineFis(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('Fis', octave));
}
function Oscillator_sineG(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('G', octave));
}
function Oscillator_sineGis(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('Gis', octave));
}
function Oscillator_sineA(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('A', octave));
}
function Oscillator_sineAis(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('Ais', octave));
}
function Oscillator_sineH(octave) {
	return Oscillator_createSine(Oscillator_getFrequencyEqualTemperament('H', octave));
}

//SqSawtoothave ----------------------------------
function Oscillator_squareC(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('C', octave));
}
function Oscillator_squareCis(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('Cis', octave));
}
function Oscillator_squareD(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('D', octave));
}
function Oscillator_squareDis(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('Dis', octave));
}
function Oscillator_squareE(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('E', octave));
}
function Oscillator_squareF(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('F', octave));
}
function Oscillator_squareFis(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('Fis', octave));
}
function Oscillator_squareG(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('G', octave));
}
function Oscillator_squareGis(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('Gis', octave));
}
function Oscillator_squareA(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('A', octave));
}
function Oscillator_squareAis(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('Ais', octave));
}
function Oscillator_squareH(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('H', octave));
}

//Sawtooth Wave ----------------------------------
function Oscillator_sawtoothC(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('C', octave));
}
function Oscillator_sawtoothCis(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('Cis', octave));
}
function Oscillator_sawtoothD(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('D', octave));
}
function Oscillator_sawtoothDis(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('Dis', octave));
}
function Oscillator_sawtoothE(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('E', octave));
}
function Oscillator_sawtoothF(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('F', octave));
}
function Oscillator_sawtoothFis(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('Fis', octave));
}
function Oscillator_sawtoothG(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('G', octave));
}
function Oscillator_sawtoothGis(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('Gis', octave));
}
function Oscillator_sawtoothA(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('A', octave));
}
function Oscillator_sawtoothAis(octave) {
	return Oscillator_createSawtooth(Oscillator_getFrequencyEqualTemperament('Ais', octave));
}
function Oscillator_sawtoothH(octave) {
	return Oscillator_createSquare(Oscillator_getFrequencyEqualTemperament('H', octave));
}

//Triangle Wave ----------------------------------
function Oscillator_triangleC(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('C', octave));
}
function Oscillator_triangleCis(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('Cis', octave));
}
function Oscillator_triangleD(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('D', octave));
}
function Oscillator_triangleDis(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('Dis', octave));
}
function Oscillator_triangleE(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('E', octave));
}
function Oscillator_triangleF(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('F', octave));
}
function Oscillator_triangleFis(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('Fis', octave));
}
function Oscillator_triangleG(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('G', octave));
}
function Oscillator_triangleGis(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('Gis', octave));
}
function Oscillator_triangleA(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('A', octave));
}
function Oscillator_triangleAis(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('Ais', octave));
}
function Oscillator_triangleH(octave) {
	return Oscillator_createTriangle(Oscillator_getFrequencyEqualTemperament('H', octave));
}

// Exports ----------------------------------------------
if ("process" in global) {
    module["exports"] = Oscillator;
}
global["Oscillator"] = Oscillator;

})((this || 0).self || global);

/* memo

gainNode の使い方で、音の調整が可能。
http://modernweb.com/2013/10/28/audio-synthesis-in-javascript/
gainNode を context.destination に接続した場合、gainNode.gain.value で音量調整が可能。
gainNode を oscillator.frequency に接続した場合、frequency を gainNode.gain.value の +- 幅で揺らすことが可能。
別 oscillator を接続すれば、周波数変更の周期の調整が可能。oscillator2.frequency.value = 1 なら 1 秒周期、など。
そこそこの周期にすると、トレモロっぽい音色を作れそうだ。

var context = new window.AudioContext();

var oscillator = context.createOscillator();
var osc2 = context.createOscillator();
var gainNode = context.createGain();

oscillator.type = "sine";
oscillator.frequency.value = 55 * Math.pow(2,3);
oscillator.connect(gainNode);

osc2.type = "triangle";
osc2.frequency.value = 54.5 * Math.pow(2,3);
osc2.connect(gainNode);

gainNode.connect(context.destination);
gainNode.gain.value = 0.5;

oscillator.noteOn(0);
osc2.noteOn(0);
oscillator.noteOff(1);
osc2.noteOff(1);
*/
