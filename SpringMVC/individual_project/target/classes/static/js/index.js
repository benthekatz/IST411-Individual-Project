var mouseOn = false;
var prevX, prevY;
var canvas_context;

var drawData = [];

//initialize
function init() {
    canvas = document.getElementById("canvas");
    canvas_context = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.75

    $("#canvas").mousedown(function (e) {
        mouseOn = true;
        doPaint(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $("#canvas").mousemove(function (e) {
        if (mouseOn) {
            doPaint(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $("#canvas").mouseup(function (e) {
        mouseOn = false;
    });

    $("#canvas").mouseleave(function (e) {
        mouseOn = false;
    });
}

//painting
function doPaint(x, y, isPaint) {
    if (isPaint) {

        canvas_context.beginPath();
        canvas_context.strokeStyle = '#' + jscolor;
        canvas_context.lineWidth = $("#select-width").val();
//        canvas_context.strokeStyle = 'black';
//        canvas_context.lineWidth = '1';
        canvas_context.lineJoin = "round";
        canvas_context.moveTo(prevX, prevY);
        canvas_context.lineTo(x, y);
        canvas_context.closePath();
        canvas_context.stroke();
    }
    prevX = x;
    prevY = y;
}

function updateColor(jscolor) {
    canvas_context.strokeStyle = '#' + jscolor;
}

function resizeCanvas() {
    var canvas = document.querySelector('#canvas');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.75;

    var tmp_canvas = document.querySelector('#temp_canvas');
    tmp_canvas.width = window.innerWidth * 0.75;
    tmp_canvas.height = window.innerHeight * 0.75;
}