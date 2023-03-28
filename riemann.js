
// code taken from https://github.com/prajwalsouza/Complex-Functions
math.config({
            number: 'BigNumber', // Default type of number: 
            // 'number' (default), 'BigNumber', or 'Fraction'
            precision: 128        // Number of significant digits for BigNumbers
        })
        bernoulliNumbers = [1.0, -0.5, 0.16666666666666666, 0.0, -0.033333333333275914, 0.0, 0.02380952380952236, 0.0, -0.03333333333333301, 0.0, 0.07575757575757562, 0.0, -0.253113553113553, 0.0, 1.1666666666666672, 0.0, -7.092156862745103, 0.0, 54.97117794486221, 0.0, -529.124242424243, 0.0, 6192.123188405805, 0.0, -86580.25311355322, 0.0, 1425517.1666666688, 0.0, -27298231.067816135, 0.0, 601580873.9006432, 0.0, -15116315767.092178, 0.0, 429614643061.1673, 0.0, -13711655205088.354, 0.0, 488332318973593.94, 0.0, -1.92965793419401e+16, 0.0, 8.416930475736838e+17, 0.0, -4.033807185405952e+19, 0.0, 2.115074863808203e+21, 0.0, -1.208662652229655e+23, 0.0, 7.500866746076979e+24, 0.0, -5.03877810148108e+26, 0.0, 3.65287764848182e+28, 0.0, -2.8498769302450944e+30, 0.0, 2.386542749968368e+32, 0.0, -2.1399949257225386e+34, 0.0, 2.050097572347815e+36, 0.0, -2.0938005911346432e+38, 0.0, 2.275269648846358e+40, 0.0, -2.625771028623965e+42, 0.0, 3.212508210271813e+44, 0.0, -4.159827816679484e+46, 0.0, 5.692069548203546e+48, 0.0, -8.218362941978484e+50, 0.0, 1.2502904327167034e+53, 0.0, -2.001558323324844e+55, 0.0, 3.3674982915364494e+57, 0.0, -5.947097050313566e+59, 0.0, 1.1011910323628018e+62, 0.0, -2.135525954525358e+64, 0.0, 4.332889698664135e+66, 0.0, -9.188552824166966e+68, 0.0, 2.0346896776329147e+71, 0.0, -4.70038339580359e+73, 0.0, 1.131804344548429e+76, 0.0, -2.838224957069381e+78]
        function zetaEMS(input, Nzeta, vzeta) {
            // vzeta not more than 49
            // This is to incooperate the fact that we dont have many bernoulli numbers. Only 100 of them.
            if (vzeta > 45) {
                vzeta = 45
            }
            sum1 = math.complex(0)
            input = math.complex(input)
            for (n = 1; n < Nzeta; n++) {
                sum1 = math.add(sum1, math.pow(n, math.multiply(-1, input)))
            }
            sum1 = math.add(sum1, math.divide(math.pow(Nzeta, math.subtract(1, input)), math.subtract(input, 1)))
            sum1 = math.add(sum1, math.divide(math.pow(Nzeta, math.multiply(-1, input)), 2))
            sum2 = math.complex(0)
            for(k1 = 1; k1 <= vzeta + 2; k1++) {
                t1 = math.divide(bernoulliNumbers[2*k1], fact(2*k1))

                prd = math.complex(1)
                for (h = 0; h <=  (2*k1) - 2; h++) {
                    prd = math.multiply(prd, math.add(input, h))
                }
                t2 = prd
                t3 = math.pow(Nzeta, math.subtract(math.subtract(1, input), 2*k1))
                sum2 = math.add(sum2, math.multiply(t1, t2, t3))
            }     
            return math.add(sum1, sum2)
        }
        function fact(val) {
            pd = 1
            for (a = 1; a <= val; a++) {
                pd = pd*a
            }
            return pd
        }
        function nCr(n, r) {
            return fact(n)/fact(r)*fact(n - r)
        }
            
const canvas = document.querySelector('canvas');
//canvas.style = "position: relative; top: 5%; left: 5%; right: 5%; bottom: 5%; margin: auto; border:4px solid white";
const ctx = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = "white";
//ctx.font = "30px Times";
var start_stop = document.getElementById("start_stop");
x_value = parseFloat(document.getElementById("valor_x").value);
//var i = parseInt(document.getElementById("valor_x").value)*30;
var last = 0;
var x0 = 0;
var y0 = 0;
var x1 = 0;
var y1 = 0;
var i = parseInt(document.getElementById("tmin").value)*30;
var t_last = 0;

var sj = math.complex(0,0);

ctx.fillStyle = "white";
    reset();
var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
function step(){
    if (start_stop.value == "Stop"){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(canvasData, 0, 0);
    i=i+1;
    ctx.beginPath();
    ctx.strokeStyle = "#FFD700";
    ctx.globalAlpha = 0.5;
    sj = math.complex(x_value,i/30);
    x0 =canvas.width/2+zetaEMS(sj, 100, 40).re*(.8*canvas.width)/8;
    y0 = canvas.height/2-zetaEMS(sj, 100, 40).im*(.8*canvas.height)/8;
    ctx.moveTo(x0, y0);
    sj = math.complex(x_value,(i+1)/30);
    x1 =canvas.width/2+zetaEMS(sj, 100, 40).re*(.8*canvas.width)/8;;
    y1 = canvas.height/2-zetaEMS(sj, 100, 40).im*(.8*canvas.height)/8;
ctx.lineTo(x1, y1);
ctx.stroke();
canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.globalAlpha = 1;
ctx.arc(x1, y1, 5, 0, 2 * Math.PI, true);
ctx.fill();
var d = Math.pow(zetaEMS(sj, 50, 40).re,2)+Math.pow(zetaEMS(sj, 50, 40).im,2);
if (d <.001){
 last =1;
ctx.globalAlpha = .1;
//ctx.arc(x1, y1, 200, 0, 2 * Math.PI, true);
//ctx.fill();
t_last = i/30;
}
str1="s="+x_value.toFixed(2)+" +"+(i/30).toFixed(2)+" i";
ctx.fillText(str1,10,50);
if (last == 1){
str1="t for last zero approx "  + t_last.toFixed(2);
ctx.fillText(str1,10,90);
}
requestAnimationFrame(step);
}
}

function Complex(re, im) {
    this.re = re;
    this.im = im || 0.0;
}

function start(){
x_value = parseFloat(document.getElementById("valor_x").value);
start_stop = document.getElementById("start_stop");
if(start_stop.value == "Stop"){   
      start_stop.value = "Start";
}
else if (start_stop.value == "Start"){
      start_stop.value = "Stop";
      step();}
}
function reset(){
    ctx.strokeStyle = "#FFD700";
last = 0;
x_value = parseFloat(document.getElementById("valor_x").value);
i = parseInt(document.getElementById("tmin").value)*30;
ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(canvas.width/10, canvas.height/2);
ctx.lineTo(9*canvas.width/10, canvas.height/2);
ctx.stroke();
ctx.moveTo(canvas.width/2, canvas.height/10);
ctx.lineTo(canvas.width/2, 9*canvas.height/10);
ctx.stroke();
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.font = "20px Georgia";
ctx.fillText("Im(Zeta)",canvas.width/2,canvas.height/10-20);
ctx.textAlign = "left";
ctx.fillText("Re(Zeta)",9*canvas.width/10+20,canvas.height/2);
var Yaxis = new Array;
Yaxis = [3,2,1,0,-1,-2,-3];
for (var j = 0; j < Yaxis.length; j++) {
    var delta_y_pos = canvas.height*.8/6;
    var y_pos = canvas.height*.1 + delta_y_pos*j;
    var x_pos = canvas.width/2;
        ctx.textBaseline = "middle";
        if (Yaxis[j]!==0){
        ctx.fillText(Yaxis[j].toString(), x_pos, y_pos);}
    }
    var Xaxis = new Array;
Xaxis = [-4,-3,-2,-1,0,1,2,3,4];
for (var j = 0; j < Xaxis.length; j++) {
    var delta_x_pos = canvas.width*.8/8;
    var x_pos = canvas.width*.1 + delta_x_pos*j;
    var y_pos = canvas.height/2;
        ctx.textBaseline = "top";
        ctx.fillText(Xaxis[j].toString(), x_pos, y_pos);
    }
    canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}
step();
