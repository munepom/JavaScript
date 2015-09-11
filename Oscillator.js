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
        alert('お使いのブラウザでは、AudioContext を使えません。\nSorry... Web Audio API is not supported in this browser.');
	return;
}
var context = new AudioContext();
var destination = context.destination;
var funcFrequency = Oscillator_getFrequencyEqualTemperament; // 律取得関数 (音階の幅を設定する)

var real; // real: 余弦項(cos)の配列 (伝統的なA項) // PeriodicWave 生成に用いる
var imag; // imag: 正弦項(sin)の配列 (伝統的なB項) // PeriodicWave 生成に用いる
// デフォルト PeriodicWave 用 real, imag 設定
real = new Float32Array(10);
imag = new Float32Array(10);
for(var i = 0; i < 10; ++i) {
        real[i] = imag[i] = 0;
}
imag[1] = 1;
imag[2] = 0.5;

// Class ------------------------------------------------
function Oscillator() {
        this.context = context;
        this.destination = destination;
        this.funcFrequency = funcFrequency;
        this.real = real;
        this.imag = imag;
	return this;
};

// Header -----------------------------------------------
Oscillator["prototype"]["getAudioContext"] = Oscillator_getAudioContext; // Oscillator#getAudioContext():AudioContext
Oscillator["prototype"]["getDestination"] = Oscillator_getDestination; // Oscillator#getDestination():AudioDestinationNode
Oscillator["prototype"]["createPeriodicWave"] = Oscillator_createPeriodicWave; // Oscillator#createPeriodicWave(real:Float32Array, imag:Float32Array):PeriodicWave
Oscillator["prototype"]["setReal"] = Oscillator_setReal; // Oscillator#setReal(real:Float32Array):Void
Oscillator["prototype"]["getReal"] = Oscillator_getReal; // Oscillator#getReal():PeriodicWave
Oscillator["prototype"]["setImag"] = Oscillator_setImag; // Oscillator#setImag(imag:Float32Array):Void
Oscillator["prototype"]["getImag"] = Oscillator_getImag; // Oscillator#getImag():PeriodicWave
Oscillator["prototype"]["createOsc"]  = Oscillator_createOsc; // Oscillator#createOsc(type:String, frequency:Integer):OscillatorNode
Oscillator["prototype"]["createCustomOsc"] = Oscillator_createCustomOsc; // Oscillator#createCustomOsc(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createGain"] = Oscillator_createGain; // Oscillator#createGain(gainValue:Integer):GainNode
Oscillator["prototype"]["createOsc2Gain"] = Oscillator_createOsc2Gain; // Oscillator#createOsc2Gain(type:String, frequency:Integer, gainValue:Integer):{OscillatorNode, GainNode}
Oscillator["prototype"]["createSine"] = Oscillator_createSine; // Oscillator#createSine(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createSquare"] = Oscillator_createSquare; // Oscillator#createSquare(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createSawtooth"] = Oscillator_createSawtooth; // Oscillator#createSawtooth(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createTriangle"] = Oscillator_createTriangle; // Oscillator#createTriangle(frequency:Integer):OscillatorNode
Oscillator["prototype"]["createCustom"] = Oscillator_createCustom; // Oscillator#createCustom(frequency:Integer):OscillatorNode

Oscillator["prototype"]["getFrequencyEqualTemperament"] = Oscillator_getFrequencyEqualTemperament; // Oscillator_getFrequencyEqualTemperament(noteName:String, octave:Integer):OscillatorNode

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

Oscillator["prototype"]["sawtoothC"] = Oscillator_sawtoothC; // Oscillator#sawtoothC(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothCis"] = Oscillator_sawtoothCis; // Oscillator#sawtoothCis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothD"] = Oscillator_sawtoothD; // Oscillator#sawtoothD(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothDis"] = Oscillator_sawtoothDis; // Oscillator#sawtoothDis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothE"] = Oscillator_sawtoothE; // Oscillator#sawtoothE(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothF"] = Oscillator_sawtoothF; // Oscillator#sawtoothF(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothFis"] = Oscillator_sawtoothFis; // Oscillator#sawtoothFis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothG"] = Oscillator_sawtoothG; // Oscillator#sawtoothG(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothGis"] = Oscillator_sawtoothGis; // Oscillator#sawtoothGis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothA"] = Oscillator_sawtoothA; // Oscillator#sawtoothA(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothAis"] = Oscillator_sawtoothAis; // Oscillator#sawtoothAis(octave:Integer):OscillatorNode
Oscillator["prototype"]["sawtoothH"] = Oscillator_sawtoothH; // Oscillator#sawtoothH(octave:Integer):OscillatorNode

Oscillator["prototype"]["triangleC"] = Oscillator_triangleC; // Oscillator#triangleC(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleCis"] = Oscillator_triangleCis; // Oscillator#triangleCis(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleD"] = Oscillator_triangleD; // Oscillator#triangleD(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleDis"] = Oscillator_triangleDis; // Oscillator#triangleDis(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleE"] = Oscillator_triangleE; // Oscillator#triangleE(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleF"] = Oscillator_triangleF; // Oscillator#triangleF(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleFis"] = Oscillator_triangleFis; // Oscillator#triangleFis(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleG"] = Oscillator_triangleG; // Oscillator#triangleG(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleGis"] = Oscillator_triangleGis; // Oscillator#triangleGis(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleA"] = Oscillator_triangleA; // Oscillator#triangleA(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleAis"] = Oscillator_triangleAis; // Oscillator#triangleAis(octave:Integer):OscillatorNode
Oscillator["prototype"]["triangleH"] = Oscillator_triangleH; // Oscillator#triangleH(octave:Integer):OscillatorNode

Oscillator["prototype"]["customC"] = Oscillator_customC; // Oscillator#customC(octave:Integer):OscillatorNode
Oscillator["prototype"]["customCis"] = Oscillator_customCis; // Oscillator#customCis(octave:Integer):OscillatorNode
Oscillator["prototype"]["customD"] = Oscillator_customD; // Oscillator#customD(octave:Integer):OscillatorNode
Oscillator["prototype"]["customDis"] = Oscillator_customDis; // Oscillator#customDis(octave:Integer):OscillatorNode
Oscillator["prototype"]["customE"] = Oscillator_customE; // Oscillator#customE(octave:Integer):OscillatorNode
Oscillator["prototype"]["customF"] = Oscillator_customF; // Oscillator#customF(octave:Integer):OscillatorNode
Oscillator["prototype"]["customFis"] = Oscillator_customFis; // Oscillator#customFis(octave:Integer):OscillatorNode
Oscillator["prototype"]["customG"] = Oscillator_customG; // Oscillator#customG(octave:Integer):OscillatorNode
Oscillator["prototype"]["customGis"] = Oscillator_customGis; // Oscillator#customGis(octave:Integer):OscillatorNode
Oscillator["prototype"]["customA"] = Oscillator_customA; // Oscillator#customA(octave:Integer):OscillatorNode
Oscillator["prototype"]["customAis"] = Oscillator_customAis; // Oscillator#customAis(octave:Integer):OscillatorNode
Oscillator["prototype"]["customH"] = Oscillator_customH; // Oscillator#customH(octave:Integer):OscillatorNode


// Implementation ---------------------------------------
function Oscillator_getAudioContext() {
	return context;
}

function Oscillator_getDestination() {
	return destination;
}

function Oscillator_setReal(real) {
        this.real = real;
}

function Oscillator_getReal() {
        return this.real;
}

function Oscillator_setImag(imag) {
        this.imag = imag;
}

function Oscillator_getImag() {
        return this.imag;
}

function Oscillator_getFuncFrequency() {
        return this.funcFrequency();
}

function Oscillator_setFuncFrequency(funcFrequency) {
        this.funcFrequency = funcFrequency;
}

function Oscillator_createOsc(type, frequency) {
	var osc = context.createOscillator();
	osc.type = type;
	osc.frequency.value = frequency;
	return osc;
}

function Oscillator_createCustomOsc(frequency, real, imag) {
        var periodicWave = this.createPeriodicWave(real || this.real, imag || this.imag);
	var osc = context.createOscillator();
	osc.frequency.value = frequency;
        osc.setPeriodicWave(periodicWave);
	return osc;
}

function Oscillator_createPeriodicWave(real, imag) { // createPeriodicWave により任意の波形を生成し、OscillatorNode にセットすることで、custom として利用可能
        var periodicWave = context.createPeriodicWave(real, imag);
        return periodicWave;
}

function Oscillator_createGain(gainValue) {
	var gain = context.createGain();
	gain.gain.value = gainValue;
	return gain;
}

function Oscillator_createOsc2Gain(type, frequency, gainValue) {
	var osc = this.createOsc(type, frequency);
	var gain = this.createGain(gainValue);
	osc.connect(gain);
	return {
		osc:      osc,
		gainNode: gainNode
	};
}

function Oscillator_createSine(frequency) {
	return this.createOsc("sine", frequency);
}
function Oscillator_createSquare(frequency) {
	return this.createOsc("square", frequency);
}
function Oscillator_createSawtooth(frequency) {
	return this.createOsc("saw", frequency);
}
function Oscillator_createTriangle(frequency) {
	return this.createOsc("triangle", frequency);
}
function Oscillator_createCustom(frequency, real, imag) {
//	return this.createOsc("custom", frequency);
        return this.createCustomOsc(frequency, real, imag);
}

function Oscillator_createSine2Gain(frequency, gain) {
	return this.createOsc2Gain("sine", frequency, gain);
}
function Oscillator_createSquare2Gain(frequency, gain) {
	return this.createOsc2Gain("square", frequency, gain);
}
function Oscillator_createSawtooth2Gain(frequency, gain) {
	return this.createOsc2Gain("saw", frequency, gain);
}
function Oscillator_createTriangle2Gain(frequency, gain) {
	return this.createOsc2Gain("triangle", frequency, gain);
}
function Oscillator_createCustom2Gain(frequency, gain) {
	return this.createOsc2Gain("custom", frequency, gain);
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
	return this.createSine(this.funcFrequency('C', octave));
}
function Oscillator_sineCis(octave) {
	return this.createSine(this.funcFrequency('Cis', octave));
}
function Oscillator_sineD(octave) {
	return this.createSine(this.funcFrequency('D', octave));
}
function Oscillator_sineDis(octave) {
	return this.createSine(this.funcFrequency('Dis', octave));
}
function Oscillator_sineE(octave) {
	return this.createSine(this.funcFrequency('E', octave));
}
function Oscillator_sineF(octave) {
	return this.createSine(this.funcFrequency('F', octave));
}
function Oscillator_sineFis(octave) {
	return this.createSine(this.funcFrequency('Fis', octave));
}
function Oscillator_sineG(octave) {
	return this.createSine(this.funcFrequency('G', octave));
}
function Oscillator_sineGis(octave) {
	return this.createSine(this.funcFrequency('Gis', octave));
}
function Oscillator_sineA(octave) {
	return this.createSine(this.funcFrequency('A', octave));
}
function Oscillator_sineAis(octave) {
	return this.createSine(this.funcFrequency('Ais', octave));
}
function Oscillator_sineH(octave) {
	return this.createSine(this.funcFrequency('H', octave));
}

//Square Wave ----------------------------------
function Oscillator_squareC(octave) {
	return this.createSquare(this.funcFrequency('C', octave));
}
function Oscillator_squareCis(octave) {
	return this.createSquare(this.funcFrequency('Cis', octave));
}
function Oscillator_squareD(octave) {
	return this.createSquare(this.funcFrequency('D', octave));
}
function Oscillator_squareDis(octave) {
	return this.createSquare(this.funcFrequency('Dis', octave));
}
function Oscillator_squareE(octave) {
	return this.createSquare(this.funcFrequency('E', octave));
}
function Oscillator_squareF(octave) {
	return this.createSquare(this.funcFrequency('F', octave));
}
function Oscillator_squareFis(octave) {
	return this.createSquare(this.funcFrequency('Fis', octave));
}
function Oscillator_squareG(octave) {
	return this.createSquare(this.funcFrequency('G', octave));
}
function Oscillator_squareGis(octave) {
	return this.createSquare(this.funcFrequency('Gis', octave));
}
function Oscillator_squareA(octave) {
	return this.createSquare(this.funcFrequency('A', octave));
}
function Oscillator_squareAis(octave) {
	return this.createSquare(this.funcFrequency('Ais', octave));
}
function Oscillator_squareH(octave) {
	return this.createSquare(this.funcFrequency('H', octave));
}

//Sawtooth Wave ----------------------------------
function Oscillator_sawtoothC(octave) {
	return this.createSawtooth(this.funcFrequency('C', octave));
}
function Oscillator_sawtoothCis(octave) {
	return this.createSawtooth(this.funcFrequency('Cis', octave));
}
function Oscillator_sawtoothD(octave) {
	return this.createSawtooth(this.funcFrequency('D', octave));
}
function Oscillator_sawtoothDis(octave) {
	return this.createSawtooth(this.funcFrequency('Dis', octave));
}
function Oscillator_sawtoothE(octave) {
	return this.createSawtooth(this.funcFrequency('E', octave));
}
function Oscillator_sawtoothF(octave) {
	return this.createSawtooth(this.funcFrequency('F', octave));
}
function Oscillator_sawtoothFis(octave) {
	return this.createSawtooth(this.funcFrequency('Fis', octave));
}
function Oscillator_sawtoothG(octave) {
	return this.createSawtooth(this.funcFrequency('G', octave));
}
function Oscillator_sawtoothGis(octave) {
	return this.createSawtooth(this.funcFrequency('Gis', octave));
}
function Oscillator_sawtoothA(octave) {
	return this.createSawtooth(this.funcFrequency('A', octave));
}
function Oscillator_sawtoothAis(octave) {
	return this.createSawtooth(this.funcFrequency('Ais', octave));
}
function Oscillator_sawtoothH(octave) {
	return this.createSawtooth(this.funcFrequency('H', octave));
}

//Triangle Wave ----------------------------------
function Oscillator_triangleC(octave) {
	return this.createTriangle(this.funcFrequency('C', octave));
}
function Oscillator_triangleCis(octave) {
	return this.createTriangle(this.funcFrequency('Cis', octave));
}
function Oscillator_triangleD(octave) {
	return this.createTriangle(this.funcFrequency('D', octave));
}
function Oscillator_triangleDis(octave) {
	return this.createTriangle(this.funcFrequency('Dis', octave));
}
function Oscillator_triangleE(octave) {
	return this.createTriangle(this.funcFrequency('E', octave));
}
function Oscillator_triangleF(octave) {
	return this.createTriangle(this.funcFrequency('F', octave));
}
function Oscillator_triangleFis(octave) {
	return this.createTriangle(this.funcFrequency('Fis', octave));
}
function Oscillator_triangleG(octave) {
	return this.createTriangle(this.funcFrequency('G', octave));
}
function Oscillator_triangleGis(octave) {
	return this.createTriangle(this.funcFrequency('Gis', octave));
}
function Oscillator_triangleA(octave) {
	return this.createTriangle(this.funcFrequency('A', octave));
}
function Oscillator_triangleAis(octave) {
	return this.createTriangle(this.funcFrequency('Ais', octave));
}
function Oscillator_triangleH(octave) {
	return this.createTriangle(this.funcFrequency('H', octave));
}

//Custom Wave ----------------------------------
function Oscillator_customC(octave) {
	return this.createCustom(this.funcFrequency('C', octave));
}
function Oscillator_customCis(octave) {
	return this.createCustomOsc(this.funcFrequency('Cis', octave));
}
function Oscillator_customD(octave) {
	return this.createCustomOsc(this.funcFrequency('D', octave));
}
function Oscillator_customDis(octave) {
	return this.createCustomOsc(this.funcFrequency('Dis', octave));
}
function Oscillator_customE(octave) {
	return this.createCustomOsc(this.funcFrequency('E', octave));
}
function Oscillator_customF(octave) {
	return this.createCustomOsc(this.funcFrequency('F', octave));
}
function Oscillator_customFis(octave) {
	return this.createCustomOsc(this.funcFrequency('Fis', octave));
}
function Oscillator_customG(octave) {
	return this.createCustomOsc(this.funcFrequency('G', octave));
}
function Oscillator_customGis(octave) {
	return this.createCustomOsc(this.funcFrequency('Gis', octave));
}
function Oscillator_customA(octave) {
	return this.createCustomOsc(this.funcFrequency('A', octave));
}
function Oscillator_customAis(octave) {
	return this.createCustomOsc(this.funcFrequency('Ais', octave));
}
function Oscillator_customH(octave) {
	return this.createCustomOsc(this.funcFrequency('H', octave));
}

// Exports ----------------------------------------------
if ("process" in global) {
    module["exports"] = Oscillator;
}
global["Oscillator"] = Oscillator;

})((this || 0).self || global);
