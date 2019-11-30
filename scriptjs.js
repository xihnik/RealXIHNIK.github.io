function print(number1, number2) {
    all_number = (number1 + number2);
    return all_number;
};

function waitForLoad(id, callback) {
    var timer = setInterval(function () {
        if (document.getElementById(id)) {
            clearInterval(timer);
            callback();
        }
    }, 100);
}

waitForLoad("div1", function () {
    console.log("load successful, you can proceed!!");
    document.getElementById("div1").onclick = function () {
        console.log(print(5, 5));
    }
});

var myVar = setInterval(animation_background, 1);

var array_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var array_time_spawn = [150, 350, 550, 750, 950, 1150, 1350, 1550, 1750, 1950, 2150, 2350, 2550, 1450];
var array_isBottomBorder = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var start_spawn = 0;
function animation_background() {
    start_spawn++;
    for (let i = 1; i < 13; i++) {
        var circle_name = "circle_";
        circle_name += i;
        speed = 1;
        if (start_spawn > (array_time_spawn[i])) {
            var answer = animation_circle(circle_name, array_count[i], speed, array_isBottomBorder[i]);
            array_count[i] = answer[0];
            array_isBottomBorder[i] = answer[1];
        }
    }
}

function animation_circle(circle_name, count, speed, isBottomBorder) {
    var circle = document.getElementById(circle_name);
    var transY = circle.style.transform;
    transY = transY.replace('translateY(', '');
    transY = transY.replace('px)', '');
    circleY = parseInt(transY) + circle.getBoundingClientRect().width + 60;
    var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    if (transY <= 0)
        isBottomBorder = false;

    if (circleY >= height)
        isBottomBorder = true;

    if (isBottomBorder == false)
        count += speed
    else
        count -= speed;

    circle.style.transform = "translateY(" + count + "px)";

    return [count, isBottomBorder];
}