/*
Copyright (c) 2023 Daigo Sugiyama
Released under the MIT license
https://opensource.org/licenses/mit-license.php
*/

const BLUR_RANGE_CHECK_REGEXP = /^blrng\_([0-9]+)\_([0-9]+)\_([0-9]+)\_(0|1)$/;
const HUE_RANGE_CHECK_REGEXP = /^blhue\_([0-9]+)\_([0-9]+)\_([0-9]+)\_([0-9]+)\_(0|1)$/;
const MOVE_RANGE_CHECK_REGEXP = /^blmove\_([0-9]+)\_([0-9]+)\_([0-9]+)$/;

let blurElms = [];
let isError = false;

/**
 * initialize blur motion
 */
const initBlurMotion = () => {
    let elm = null;

    blurElms = $('.bm');

    blurElms.each((index) => {
        elm = blurElms[index];

        //blur range
        elm.blrngMin = 0;
        elm.blrngMax = 10;
        elm.blrngCurrent = 0;
        elm.blrngDir = 1;

        //hue range
        elm.blhueMin = 0;
        elm.blhueMax = 360;
        elm.blhueCurrent = 0;
        elm.blhueIdRange = 1;
        elm.blhueDir = 1;

        //move range
        elm.blmoveMin = 0;
        elm.blmoveMax = 100;
        elm.blmoveDur = 5000;

        let elmClassNames = elm.className.split(' ');

        let className = null;
        $(elmClassNames).each((index) => {
            if (!isError) {
                className = elmClassNames[index];
                if (className.match(BLUR_RANGE_CHECK_REGEXP) !== null) {
                    const values = className.split('_');
                    const blrngMin = parseInt(values[1]);
                    const blrngMax = parseInt(values[2]);
                    const blrngCurrent = parseInt(values[3]);
                    const blrngDir = parseInt(values[4]);

                    if (isError = checkMinAndMaxValue(blrngMin, blrngMax)) {
                        console.log(`blur value error: lower or upper limits are incorrect. ${className}`);
                    }

                    if (isError = checkCurrentValueRange(blrngCurrent, blrngMin, blrngMax)) {
                        console.log(`blur value error: the initial value is incorrect. ${className}`);
                    }

                    if (!isError) {
                        elm.blrngMin = blrngMin;
                        elm.blrngMax = blrngMax;
                        elm.blrngCurrent = blrngCurrent;
                        elm.blrngDir = blrngDir;
                        $(elm).css('filter', `blur(${elm.blrngCurrent}px)`);
                    }
                }

                if (className.match(HUE_RANGE_CHECK_REGEXP) !== null && !isError) {
                    const values = className.split('_');
                    const blhueMin = parseInt(values[1]);
                    const blhueMax = parseInt(values[2]);
                    const blhueCurrent = parseInt(values[3]);
                    const blhueIdRange = parseInt(values[4]);
                    const blhueDir = Boolean(values[5]);

                    if (isError = checkMinAndMaxValue(blhueMin, blhueMax)) {
                        console.log('hue value error: lower or upper limits are incorrect');
                    }

                    if (isError = checkCurrentValueRange(blhueCurrent, blhueMin, blhueMax)) {
                        console.log('hue value error: the initial value is incorrect.');
                    }

                    if (!isError) {
                        elm.blhueMin = blhueMin;
                        elm.blhueMax = blhueMax;
                        elm.blhueCurrent = blhueCurrent;
                        elm.blhueIdRange = blhueIdRange;
                        elm.blhueDir = blhueDir;
                        $(elm).css('filter', `hue-rotate(${elm.blhueCurrent}deg)`);
                    }
                }

                if (className.match(MOVE_RANGE_CHECK_REGEXP) !== null && !isError) {
                    const values = className.split('_');
                    const blmoveMin = parseInt(values[1]);
                    const blmoveMax = parseInt(values[2]);
                    const blmoveDur = parseInt(values[3]);

                    if (isError = checkMinAndMaxValue(blmoveMin, blmoveMax)) {
                        console.log('move value error: lower or upper limits are incorrect');
                    }

                    elm.blmoveMin = blmoveMin;
                    elm.blmoveMax = blmoveMax;
                    elm.blmoveDur = blmoveDur;
                }
            }
        })
    })
    if (!isError) {
        startAnim();
    }
}

/**
 * start blur animation
 * @return result
 */
const startAnim = () => {
    setInterval(blurAndHueAnim, 100);
    moveAnim();
}

/**
 * execute blur and hue animation
 * @return result
 */
const blurAndHueAnim = () => {
    let elm = null;
    blurElms.each((index) => {
        elm = blurElms[index];
        //blur
        if (elm.blrngCurrent === elm.blrngMin) {
            elm.blrngDir = true;
        }
        if (elm.blrngCurrent === elm.blrngMax) {
            elm.blrngDir = false;
        }

        elm.blrngDir ? elm.blrngCurrent++ : elm.blrngCurrent--;

        // hue
        if (elm.blhueCurrent < elm.blhueMin) {
            elm.blhueDir = true;
        }
        if (elm.blhueCurrent > elm.blhueMax) {
            elm.blhueDir = false;
        }

        elm.blhueDir ? elm.blhueCurrent += elm.blhueIdRange : elm.blhueCurrent -= elm.blhueIdRange;

        $(elm).css('filter', `blur(${elm.blrngCurrent}px) hue-rotate(${elm.blhueCurrent}deg)`);
    })
}

/**
 * start move animation
 */
const startMoveAnim = () => {
    moveAnim();
}

/**
 * execute move animation
 */
const moveAnim = () => {
    let elm = null;
    let minVal = 0;
    let maxVal = 0;
    let top = 0;
    let left = 0;
    blurElms.each((index) => {
        elm = blurElms[index];
        minVal = 0;
        maxVal = 0;
        maxValue = elm.blmoveMax - elm.blmoveMin;
        top = Math.floor((Math.random() * (elm.blmoveMax - elm.blmoveMin)) + elm.blmoveMin);
        left = Math.floor((Math.random() * (elm.blmoveMax - elm.blmoveMin)) + elm.blmoveMin);
        $(elm).animate({ top: `${top}%`, left: `${left}%` }, elm.blmoveDur, 'linear', () => { moveAnim(elm) });
    })
}

/**
 * check min and max value
 * @param minVal min value
 * @param maxVal max value
 * @return check result
 */
const checkMinAndMaxValue = (minVal, maxVal) => {
    return minVal > maxVal ? true : false;
}

/**
 * check current and min and max value
 * @param currentVal current value
 * @param minVal min value
 * @param maxVal max value
 * @return check result
 */
const checkCurrentValueRange = (currentVal, minVal, maxVal) => {
    return (currentVal < minVal) || (maxVal < currentVal) ? true : false;
}

$(() => {
    initBlurMotion();
});