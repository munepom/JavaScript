// SVG 描くよ！
(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    function SVGKeyboard() {
        return this;
    };

    // Header -----------------------------------------------
    SVGKeyboard["prototype"]["draw"] = SVGKeyboard_draw; // SVGKeyboard#draw(octave:Integer):Void

    // Implementation ---------------------------------------
    function SVGKeyboard_draw(octave) {
        octave = octave || 1;

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
                id = 'SVGKey_' + idAllKeyArr[j] + '_' + (i+1);
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

    // Exports ----------------------------------------------
    if ("process" in global) {
        module["exports"] = SVGKeyboard;
    }
    global["SVGKeyboard"] = SVGKeyboard;

})((this || 0).self || global);
