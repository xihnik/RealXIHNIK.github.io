import {Engine} from "./src/Scripts/Engine.js";
import {Map} from "./src/Scripts/Map.js";
import {Asteroid} from "./src/Scripts/Asteroid.js";
import {Player} from "./src/Scripts/Player.js";
import {Shoot} from "./src/Scripts/Shoot.js";
import {GameStatistic} from "./src/Scripts/GameStatistic.js";

var engine = new Engine('display','2d');
var map = new Map('src/Images/Background/background.jpg');
var asteroid = new Asteroid('src/Images/Asteroid/stone.png',0,0);
var asteroidCollection = [];
var shoot = new Shoot('src/Images/Person/shoot.png');
var shootCollection = [];
var gameStatistic = new GameStatistic(3);



var interval = setInterval(createMeteorit,500);


var player = new Player('src/Images/Person/person.png',400,450);

asteroidCollection[asteroidCollection.length] = new Asteroid('src/Images/Asteroid/stone.png',0,0);

document.getElementById('display').addEventListener('mousemove',function (event) {

    player.x = event.offsetX;
    player.y = event.offsetY;

});

// document.getElementById('display').addEventListener('mousedown',function (event) {
//     // console.log(event.x)
//
//     player.x = event.offsetX;
//     console.log('X:'+event.offsetX);
//     console.log(event.offsetY);
//     player.y = event.offsetY;
// });


document.getElementById('display').style.cursor = 'none';

function createMeteorit() {
    shootCollection[shootCollection.length] = new Shoot('src/Images/Person/shoot.png',player.x,player.y-30);
    asteroidCollection[asteroidCollection.length] = new Asteroid('src/Images/Asteroid/stone.png',randomInteger(10,800),10);
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}



function draw() {

    // requestAnimationFrame(draw);
}

function update() {
    for(let i=0;i<asteroidCollection.length;i++) {
        asteroidCollection[i].y += asteroidCollection[i].speed;

        for(let j=0; j< shootCollection.length;j++)
        {

            if (Math.abs(asteroidCollection[i].x + 25 - shootCollection[j].x - 15) < 50 && Math.abs(asteroidCollection[i].y - shootCollection[j].y) < 25) {
                // console.log('become');
                shootCollection[j].del =1;
                asteroidCollection[i].del = 1;
                gameStatistic.score++;
               // document.getElementById('statusPanes').innerHTML = String( gameStatistic.score);
                console.log(gameStatistic.score);
                break;

            }


        }

        if(asteroidCollection[i].del===1){
            asteroidCollection = asteroidCollection.slice(0,i).concat(asteroidCollection.slice(i+1,asteroidCollection.length));
        }


        // else{
        //     if(asteroidCollection[i].y<1){
        //         asteroid.speed = -asteroid.speed;
        //     }
        // }
    }




    for(let i = 0;i<shootCollection.length;i++){
        shootCollection[i].y += shoot.speed;
        if(shootCollection[i].y<1||shootCollection[i].del===1){
           shootCollection.splice(i,1);
        }
    }

    for(let i=0;i<asteroidCollection.length;i++){
        if (asteroidCollection[i].y > 470) {
            asteroidCollection = asteroidCollection.slice(0,i).concat(asteroidCollection.slice(i+1,asteroidCollection.length));
        }
    }

   // for(let i=0;i<asteroidCollection.length;i++)




}



function game() {
    update();
    render();
    requestAnimationFrame(game);
}


function render(){

    engine.ctx.drawImage(map.image,0,0,800,600);

    for(let i in asteroidCollection) {
        engine.ctx.drawImage(asteroid.image, asteroidCollection[i].x, asteroidCollection[i].y, 100, 100);
    }

    for(let i in shootCollection){
        engine.ctx.drawImage(shoot.image,shootCollection[i].x,shootCollection[i].y,100,100);
    }

    document.getElementById('statusPanel').innerHTML = gameStatistic.score;
    engine.ctx.drawImage(player.image,player.x,player.y,100,100);
}

map.image.onload = function () {
    game();
};
