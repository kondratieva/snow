'use strict';

class Snow {

    constructor (props) {
        // const {imgsrc, flakeSpeed, flakeFluctSpeed, flakeDownSpeed, answer} = props;
        this.flake = [];
        this.height = window.document.body.scrollHeight;
        this.width = window.document.body.clientWidth;
        this.snowflakeCount = Math.round(this.height/25);
    }

    generate () {
        for (var i = 0; i < this.snowflakeCount; ++i) {
            let tmp = {};
            tmp.amplitude =  Math.random() * this.ampMultiplier;
            tmp.posX =       Math.random() * (this.width - tmp.amplitude);
            tmp.posY =       Math.random() * this.height;
            tmp.placeX =     Math.random() * this.flakeFluctSpeed;   // Х displacement
            tmp.placeY =     Math.random() + this.flakeDownSpeed;               // Y displacement
            tmp.deltaX =     0;

            let elem =      document.createElement('img');
            elem.id =       "snowflake" + i;
            elem.style =    "position:absolute;" + "z-index: " + i + "; visibility:visible; top:-50px; left:-50px;";
            elem.src =      this.imgsrc;
            elem.border =   0;
            document.body.appendChild(elem);

            tmp.obj = document.getElementById("snowflake" + i);
            this.flake.push(tmp);
        };
    }

    moveSnow () {
    for (var i = 0; i < this.snowflakeCount; ++i) {
        this.flake[i].posY += this.flake[i].placeY;

        if (this.flake[i].posY > this.height - this.answer) {
            this.flake[i].posX = Math.random() * (this.width - this.flake[i].amplitude - this.answer);
            this.flake[i].posY = 0;
        };

        this.flake[i].deltaX += this.flake[i].placeX;
        this.flake[i].obj.style.top = this.flake[i].posY + "px";
        this.flake[i].obj.style.left = this.flake[i].posX + this.flake[i].amplitude * Math.sin(this.flake[i].deltaX) + "px";
    }
    setTimeout(this.moveSnow.bind(this), this.flakeSpeed);
    }

    getSnow () {
        this.generate();
        this.moveSnow();
    }
};

let defaults = {
    imgsrc: 'img/snow.png',
    ampMultiplier: 20,
    flakeSpeed: 50,
    flakeFluctSpeed: 0.25,
    flakeDownSpeed: 2,
    answer: 42
};

let snow = new Snow(defaults);
snow.getSnow();
