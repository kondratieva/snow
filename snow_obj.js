'use strict';

var snow = {

    
    imgsrc: 'img/snow.png',
    ampMultiplier: 20,
    flakeSpeed: 50,
    flakeFluctSpeed: 0.25,
    flakeDownSpeed: 2,
    answer: 42,
    flakeSpeed :50,                // speed of snowflake fly down, used in setTimeout
    flakeFluctSpeed: 0.25,              // speed of snowflake fluctuation inside amplitude
    flakeDownSpeed: 2,                 // speed of snowflake fly down used in placeY
    answer: 42,                // Answer to the Ultimate Question of Life, the Universe and Everything
    height: 0,
    width: 0,
    snowflakeCount: 0,
    amplitude: [],    // amplitude of snowflake fly
    posX: [],    // X position of snowflake
    posY: [],    // Y position of snowflake
    placeX: [],    // X displacement
    placeY: [],    // Y displacement
    deltaX: [],
    obj: [],    // instance of snowflake

    init: function () {
        this.height = window.document.body.scrollHeight;
        this.width = window.document.body.clientWidth;
        this.snowflakeCount = Math.round(this.height/25);
    },

    generate: function () {
        var i = 0;
        this.init();
        for (i = 0; i < this.snowflakeCount; ++i) {
            this.amplitude[i] =  Math.random() * this.ampMultiplier;
            this.posX[i] =       Math.random() * (this.width - this.amplitude[i]);
            this.posY[i] =       Math.random() * this.height;
            this.placeX[i] =     Math.random() * this.flakeFluctSpeed;   // Х displacement
            this.placeY[i] =     Math.random() + this.flakeDownSpeed;               // Y displacement
            this.deltaX[i] =     0;

            var elem =      document.createElement('img');
            elem.id =       "snowflake" + i;
            elem.style =    "position:absolute;" + "z-index: " + i + "; visibility:visible; top:-50px; left:-50px;";
            elem.src =      this.imgsrc;
            elem.border =   0;
            document.body.appendChild(elem);

            this.obj[i] = document.getElementById("snowflake" + i);
        }
    },

    moveSnow: function () {
        var i =0;
        for (i = 0; i < this.snowflakeCount; ++i) {
            this.posY[i] += this.placeY[i];

            if (this.posY[i] > this.height - this.answer) {
                this.posX[i] = Math.random() * (this.width - this.amplitude[i] - this.answer);
                this.posY[i] = 0;
            };

            this.deltaX[i] += this.placeX[i];
            this.obj[i].style.top = this.posY[i] + "px";
            this.obj[i].style.left = this.posX[i] + this.amplitude[i] * Math.sin(this.deltaX[i]) + "px";
        }
        setTimeout(this.moveSnow.bind(this), this.flakeSpeed);
    },

    getSnow: function() {
       this.generate();
       this.moveSnow();
    }
};

snow.getSnow();
