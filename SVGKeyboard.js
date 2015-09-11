// SVG 描くよ！
// TODO: 設定も SVG で描き、このクラスで管理できるようにする
(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    function SVGKeyboard() {
        return this;
    };
    
    function SVGKeyboard(displayOctave, osc, baseOctave, waveForm, volume) {
        this.displayOctave = displayOctave;
        this.osc = osc;
        this.baseOctave = baseOctave;
        this.waveForm = waveForm;
        this.volume = volume;
        return this;
    }


    // Header -----------------------------------------------
    SVGKeyboard["prototype"]["setOscillator"] = SVGKeyboard_setOscillator; // SVGKeyboard#setOscillator(osc:Oscillator):Void
    SVGKeyboard["prototype"]["setWaveForm"] = SVGKeyboard_setWaveForm; // SVGKeyboard#setWaveForm(waveForm:String):Void
    SVGKeyboard["prototype"]["setVolume"] = SVGKeyboard_setVolume; // SVGKeyboard#setVolume(volume:Integer):Void
    SVGKeyboard["prototype"]["setBaseOctave"] = SVGKeyboard_setBaseOctave; // SVGKeyboard#setBaseOctave(baseOctave:Integer):Void
    SVGKeyboard["prototype"]["setDisplayOctave"] = SVGKeyboard_setDisplayOctave; // SVGKeyboard#setDisplayOctave(displayOctave:Integer):Void
    
    SVGKeyboard["prototype"]["draw"] = SVGKeyboard_draw; // SVGKeyboard#draw(octave:Integer):Void
    SVGKeyboard["prototype"]["init"] = SVGKeyboard_init; // SVGKeyboard#init(displayOctave:Integer, osc:Oscillator, baseOctave:Integer, waveForm:String, volume:Integer):Void
    SVGKeyboard["prototype"]["getStartedNum"] = SVGKeyboard_getStartedNum; // SVGKeyboard_getStartedNum(oscHash:Object):Integer
    
    // Implementation ---------------------------------------
    function SVGKeyboard_setOscillator(osc) {
        this.osc = osc;
    }
    
    function SVGKeyboard_setWaveForm(waveForm) {
        this.waveForm = waveForm;
    }
    
    function SVGKeyboard_setVolume(volume) {
        this.volume = volume;
    }
    
    function SVGKeyboard_setBaseOctave(baseOctave) {
        this.baseOctave = baseOctave;
    }
    
    function SVGKeyboard_setDisplayOctave(displayOctave) {
        this.displayOctave = displayOctave;
    }
    
    function SVGKeyboard_draw() {
        var octave = this.displayOctave || 1;

        var x = 0;
        var y = 0;

        var styleWhite = 'fill:white;stroke:black';
        var widthWhite = 30;
        var heightWhite = 120;

        var styleBlack = 'fill:black;stroke:black';
        var widthBlack = widthWhite * 3 / 5;
        var heightBlack = 70;

        var widthOctave = widthWhite * 7;
        var widthSvg = widthOctave * octave;

        var elmSvg = document.getElementById('SVGKeyboard');
        elmSvg.setAttribute('width', widthSvg + 'px');
        elmSvg.setAttribute('height', heightWhite);
 //       elmSvg.innerHTML = '<!-- White keys -->';


/*
        var i = 0;
        var repeat = 7 * octave;
        for (i = 0; i < repeat; i++) {
            x = widthWhite * i;
            elmSvg.innerHTML += '<rect id="SVGKeyBoard" style="' + styleWhite + '" x="' + x + '" y="' + y + '" width="' + widthWhite + '" height="' + heightWhite + '"/>';
        }
*/
//        elmSvg.innerHTML += '<!-- Black keys -->';

        var htmlWhite = ''; // HTML for White Keys
        var htmlBlack = ''; // HTML for Black Keys

        var i = 0;
        var j = 0;
        var repeatOctave = octave;
        var repeatKey = 12;
        var idxFillArr = [1, 3, 6, 8, 10];
        var idAllKeyArr = ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'Ais', 'H'];
        var mod = 0;
        var baseWidth = 0;
        var id = 'SVGKey_';
        var classWhite = 'svg-keyboard-key svg-keyboard-key-white';
        var classBlack = 'svg-keyboard-key svg-keyboard-key-black';
        var cntBlackKey = 0;
        for (i = 0; i < repeatOctave; i++) {
            baseWidth = widthOctave * i;
            cntBlackKey = 0;
            for (j = 0; j < repeatKey; j++) {
                id = 'SVGKey_' + idAllKeyArr[j] + '_' + i;
                mod = j % 12;
                if (idxFillArr.indexOf(mod) >= 0) { // Black Key
                    cntBlackKey++;
                    switch (mod) {
                    case 1:   // Cis
                    case 3:   // Dis
                    case 6:   // Fis
                        x = widthBlack * j;
                        break;
                    case 8:   // Gis
                        x = widthBlack * j - (widthBlack * 2 / 12 * 1);
                        break;
                    case 10:   // Ais
                        x = widthBlack * j - (widthBlack * 2 / 12 * 2);
                        break;
                    default:
                        // do nothing in default
                        break;
                    }
                    x += baseWidth;
                    htmlBlack += '<rect id="' + id + '" class="' + classBlack + '" style="' + styleBlack + '" x="' + x + '" y="' + y + '" width="' + widthBlack + '" height="' + heightBlack + '"/>';
                }
                else { // White Key
                    x = widthWhite * (j - cntBlackKey) + baseWidth;
                    htmlWhite += '<rect id="' + id + '" class="' + classWhite + '" style="' + styleWhite + '" x="' + x + '" y="' + y + '" width="' + widthWhite + '" height="' + heightWhite + '"/>';
                }
            }
        }
        elmSvg.innerHTML += htmlWhite + htmlBlack;
    }

    function SVGKeyboard_init() {
        var baseOctave = this.baseOctave;
        var waveForm = this.waveForm;
        var volume = this.volume;
        var osc = this.osc;
        var context = osc.getAudioContext();
        var destination = osc.getDestination();
        this.draw();
        var elmKeyboard = document.querySelector('#SVGKeyboard');
        var elmKeyArr = elmKeyboard.querySelectorAll('rect');
        var elmKey;
        var oscHash = {}; // 発振中の autioNode を保持し、再利用可能とする。とりあえず。メモリどうなるん？
        var gainHash = {}; // 発振中の gainNode を保持し、再利用可能とする。とりあえず。メモリどうなるん？
        var getStartedNum = this.getStartedNum;
        var i = 0;
        var len = elmKeyArr.length;
        for (i = 0; i < len; i++) {
            elmKey = elmKeyArr[i];
            elmKey.addEventListener('mousedown', function(event) {
                // start
                var id = this.id;
                var tmpArr = id.split('_');
                var scale = tmpArr[1];
                var octave = parseInt(tmpArr[2]) + baseOctave;
                var gain = volume / (1000 * (getStartedNum(gainHash) + 1) );
                var oscNode = oscHash[id];
                var gainNode = gainHash[id];
                if (oscNode && gainNode) {
                    gainNode.gain.value = 0;
                    oscNode.stop(context.currentTime + 0.01); // stop すると、再生成必須となる
                    gainNode.gain.value = gain;
                }
                oscNode = osc[waveForm + scale](octave);
                gainNode = gainNode || osc.createGain(gain);
                oscNode.connect(gainNode);
                gainNode.connect(destination);
                oscHash[id] = oscNode;
                gainHash[id] = gainNode;
                oscNode.start(context.currentTime);
            });
            elmKey.addEventListener('mouseup', function(event) {
                // stop
                var id = this.id;
                var oscNode = oscHash[id];
                var gainNode = gainHash[id];
                if (oscNode && gainNode) {
                    gainNode.gain.value = 0;
                    oscNode.stop(context.currentTime + 0.01); // stop すると、再生成必須となる
//                  oscNode.disconnect(gainNode); // disconnect は、プチプチノイズ発生...
                }
            });
            elmKey.addEventListener('mouseleave', function(event) {
                // stop
                var id = this.id;
                var oscNode = oscHash[id];
                var gainNode = gainHash[id];
                if (oscNode && gainNode) {
                    gainNode.gain.value = 0;
                    oscNode.stop(context.currentTime + 0.01); // stop すると、再生成必須となる
//                  oscNode.disconnect(gainNode); // disconnect は、プチプチノイズ発生...
                }
            });
        }
    }

    function SVGKeyboard_getStartedNum(gainHash) {
        var num = 0;
        var key, gainNode;
        for (key in gainHash) {
            if (gainHash.hasOwnProperty(key)) {
                gainNode = gainHash[key];
                if (gainNode && gainNode.gain.value) {
                    num++;
                }
            }
        }
        return num;
    }

    // Exports ----------------------------------------------
    if ("process" in global) {
        module["exports"] = SVGKeyboard;
    }
    global["SVGKeyboard"] = SVGKeyboard;

})((this || 0).self || global);
