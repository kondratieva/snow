'use strict';

// params to setup
var imgsrc =          'img/snow.png';    // picture of snowflake
var ampMultiplier =   20;                // amplitude multiplier, effects to snowflake amplitude
var flakeSpeed =      50;                // speed of snowflake fly down, used in setTimeout
var flakeFluctSpeed = 0.25;              // speed of snowflake fluctuation inside amplitude
var flakeDownSpeed =  2;                 // speed of snowflake fly down used in placeY
var answer =          42;                // Answer to the Ultimate Question of Life, the Universe and Everything

// internal variables
var height =          window.document.body.scrollHeight;        // height of screen
var width =           window.document.body.clientWidth;         // width of screen
var snowflakeCount =  Math.round(height/25);

var amplitude =       [];    // amplitude of snowflake fly
var posX =            [];    // X position of snowflake
var posY =            [];    // Y position of snowflake
var placeX =          [];    // X displacement
var placeY =          [];    // Y displacement
var deltaX =          [];
var obj =             [];    // instance of snowflake
var i =               0;     // counter


// generation of snowFlakes objects
function generateSnow() {
    for (i = 0; i < snowflakeCount; ++i) {
        amplitude[i] =  Math.random() * ampMultiplier;
        posX[i] =       Math.random() * (width - amplitude[i]);
        posY[i] =       Math.random() * height;
        placeX[i] =     Math.random() * flakeFluctSpeed;   // Х displacement
        placeY[i] =     Math.random() + flakeDownSpeed;               // Y displacement
        deltaX[i] =     0;

        var elem =      document.createElement('img');
        elem.id =       "snowflake" + i;
        elem.style =    "position:absolute;" + "z-index: " + i + "; visibility:visible; top:-50px; left:-50px;";
        elem.src =      imgsrc;
        elem.border =   0;
        document.body.appendChild(elem);

        obj[i] = document.getElementById("snowflake" + i);
    }
};


// movements of snowFlakes
function moveSnow() {
    for (i = 0; i < snowflakeCount; ++i) {
        posY[i] += placeY[i];

        // Generates new snowflake
        // Y answer: distance to the bottom of the page
        // used to hide one snowflake and show another one at the top
        // X answer: shift to generate snowflakes all over the page
        if (posY[i] > height - answer) {
            posX[i] = Math.random() * (width - amplitude[i] - answer);
            posY[i] = 0;
        }

        deltaX[i] += placeX[i];
        obj[i].style.top = posY[i] + "px";
        obj[i].style.left = posX[i] + amplitude[i] * Math.sin(deltaX[i]) + "px";
    }
    setTimeout("moveSnow()", flakeSpeed);
};

function getSnow() {
    generateSnow();
    moveSnow();
};

getSnow();
