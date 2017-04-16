(
    function () {
        var WIDTH, HEIGHT, canvas, con, g;
        var pxs = [];
        var rint = 1;

        $.fn.astral = function() {
            this.append($('<canvas class="b-content__canvas"></canvas>'));
            setup(this);
        };

        function setup(container) {
            var windowSize = function() {
                WIDTH = container.innerWidth();
                HEIGHT = container.innerHeight();
                canvas = container.find('.b-content__canvas');
                canvas.attr('width', WIDTH).attr('height', HEIGHT);
            };

            windowSize();

            $(window).resize(function() {
                windowSize();
            });

            con = canvas[0].getContext('2d');

            for (var i = 0; i < 100; i++) {
                pxs[i] = new Circle();
                pxs[i].reset();
            }

            requestAnimationFrame(draw);
        }

        function draw() {
            con.clearRect(0, 0, WIDTH, HEIGHT);
            con.globalCompositeOperation = "lighter";

            for (var i = 0; i < pxs.length; i++) {
                pxs[i].fade();
                pxs[i].move();
                pxs[i].draw();
            }

            requestAnimationFrame(draw);
        }

        function Circle() {
            this.s = {
                ttl: 15000,
                xmax: 6,
                ymax: 3,
                rmax: 6,
                rt: 1,
                xdef: 960,
                ydef: 540,
                xdrift: 4,
                ydrift: 4,
                random: true,
                blink: true
            };

            this.reset = function() {
                this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
                this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
                this.r = ((this.s.rmax - 1) * Math.random()) + 1;

                this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
                this.dy = (Math.random() * this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);

                this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
                this.rt = Math.random() * this.hl;

                this.stop = Math.random() * 0.2 + 0.4;

                this.s.rt = Math.random() + 1;
                this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
                this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
            };

            this.fade = function() {
                this.rt += this.s.rt;
            };

            this.draw = function() {
                var newo, cr;

                if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) {
                    this.s.rt = this.s.rt * -1;
                } else if (this.rt >= this.hl) {
                    this.reset();
                }

                newo = 1 - (this.rt / this.hl);

                con.beginPath();
                con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
                con.closePath();

                cr = this.r * newo;

                g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
                g.addColorStop(0.0, 'rgba(193,254,254,' + newo + ')');
                g.addColorStop(this.stop, 'rgba(193,254,254,' + (newo * 0.2) + ')');
                g.addColorStop(1.0, 'rgba(193,254,254,0)');

                con.fillStyle = g;
                con.fill();
            };

            this.move = function() {
                this.x += (this.rt / this.hl) * this.dx;
                this.y += (this.rt / this.hl) * this.dy;
                if (this.x > WIDTH || this.x < 0) this.dx *= -1;
                if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
            };

            this.getX = function() {
                return this.x;
            };

            this.getY = function() {
                return this.y;
            };
        }
    }()
);

$('.js-flying-flies').astral();

//
var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('.b-content__gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

setInterval(updateGradient,10);
