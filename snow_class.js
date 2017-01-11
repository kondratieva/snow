'use strict';

class Snow {

    constructor (props) {
        this.props =      Snow.defaults;
        this.height =     window.document.body.scrollHeight;        // height of screen
        this.width =      window.document.body.clientWidth;         // width of screen
        this.amplitude =  [];    // amplitude of snowflake fly
        this.posX =       [];    // X position of snowflake
        this.posY =       [];    // Y position of snowflake
        this.placeX =     [];    // X displacement
        this.placeY =     [];    // Y displacement
        this.deltaX =     [];
        this.obj =        [];    // instance of snowflake
        this.i =          0;     // counter
        this.snowflakeCount = 0;      // number of snowflakes
    }

    generateSnow() {
        for (this.i = 0; this.i<this.snowflakeCount; ++this.i) {
            this.amplitude[this.i] =  Math.random()*this.ampMultiplier;
            this.posX[this.i] =       Math.random()*(this.width-this.amplitude[i]);
            this.posY[i] =       Math.random()*this.height;
            this.placeX[i] =     Math.random()*this.flakeFluctSpeed;   // Х displacement
            this.placeY[i] =     Math.random() + this.flakeDownSpeed;               // Y displacement
            this.deltaX[i] =     0;
            this.snowflakeCount = Math.round(this.height/25);

            var elem = document.createElement('img');
            elem.id = "snowflake" + this.i;
            elem.style = "position:absolute;" + "z-index: "+ this.i +"; visibility:visible; top:-50px; left:-50px;";
            elem.src = this.imgsrc;
            elem.border=0;
            document.body.appendChild(elem);

            this.obj[i] = document.getElementById("snowflake"+i);
        }
    }

    moveSnow(){
        for (this.i=0; this.i<this.snowflakeCount; ++this.i) {
            this.posY[this.i]+=this.placeY[this.i];

            // Generates new snowflake
            // Y answer: distance to the bottom of the page
            // used to hide one snowflake and show another one at the top
            // X answer: shift to generate snowflakes all over the page
            if (this.posY[i]>this.height-this.answer) {
                this.posX[i]=Math.random()*(this.width-this.amplitude[i]-this.answer);
                this.posY[i]=0;
            }

            this.deltaX[this.i]+=this.placeX[this.i];
            this.obj[this.i].style.top=this.posY[this.i]+"px";
            this.obj[this.i].style.left=this.posX[this.i]+this.amplitude[this.i]*Math.sin(this.deltaX[this.i])+"px";
        }
        setTimeout("this.moveSnow()", this.flakeSpeed);
    }

    getSnow() {
        this.generateSnow();
        this.moveSnow();
    }
};


Snow.defaults = {
  imgsrc: 'snow.gif',               // picture of snowflake
  ampMultiplier: 20,                // amplitude multiplier, effects to snowflake amplitude
  flakeSpeed: 50,                   // speed of snowflake fly down, used in settimeout
  flakeFluctSpeed: 0.25,            // speed of snowflake fluctuation inside amplitude
  flakeDownSpeed: 2,                // speed of snowflake fly down used in placeY
  answer: 42                        // Answer to the Ultimate Question of Life, the Universe and Everything
};

let snow = new Snow();
snow.getSnow();
