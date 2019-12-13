import { Engine } from "./src/Scripts/Engine.js"
import { Map } from "./src/Scripts/Map.js"
import { Asteroid } from "./src/Scripts/Asteroid.js"
import { Player } from "./src/Scripts/Player.js"
import { Shoot } from "./src/Scripts/Shoot.js"
import { GameStatistic } from "./src/Scripts/GameStatistic.js"
import { Bonuses } from "./src/Scripts/Bonuses.js"

var engine = new Engine('display', '2d')
var map = new Map('src/Images/Background/background.jpg')
var asteroid = new Asteroid('src/Images/Asteroid/stone.png', 0, 0)
var asteroidCollection = []
var shoot = new Shoot('src/Images/Person/shoot.png')
var shootCollection = []
var gameStatistic = new GameStatistic(3)
// var bonuses = new Bonuses();
var bonusesList = []


var interval = setInterval(createMeteorit, 300)
var bonusesInterval = setInterval(createBonuses, 1500)
var time = setInterval(countTime, 1000)
var shootInterval = setInterval(shooting, 1000)

var player = new Player('src/Images/Person/person.png', 400, 450);

asteroidCollection[asteroidCollection.length] = new Asteroid('src/Images/Asteroid/stone.png', 0, 0);


document.getElementById('display').addEventListener('mousemove', function (event) {
  player.x = event.offsetX;
  player.y = event.offsetY;
})

// let event = null;
//
// document.getElementById('display').addEventListener("touchstart", function (e) {
//     event = e;
// });
// document.getElementById('display').addEventListener("touchmove", function (e) {
//     if (event) {
//         // console.log("Move delta: " + (e.touches[0].pageY - event.touches[0].pageY))
//         let magrinLeft = document.getElementById('display').offsetLeft;
//         let marginTop = document.getElementById('display').offsetTop;
//         player.y = Math.abs(e.touches[0].pageY - event.touches[0].pageY)+200;
//         player.x =  Math.abs(e.touches[0].pageX - event.touches[0].pageY);
//
//         console.log('X:'+ player.x);
//         console.log('Y:'+ player.y);
//
//     }
// });
// document.addEventListener("touched", function (e) {
//     // event = null;
// });






document.getElementById('display').style.cursor = 'none';

function createMeteorit() {
  asteroidCollection[asteroidCollection.length] = new Asteroid('src/Images/Asteroid/stone.png', randomInteger(10, 700), 10)
}

function shooting() {
    shootCollection[shootCollection.length] = new Shoot('src/Images/Person/shoot.png', player.x, player.y - 30);
}

function createBonuses() {
    console.log(bonusesList);
    bonusesList[bonusesList.length] = new Bonuses('src/Images/Bonuses/coin.png', randomInteger(10, 700), 10);
}

function countTime() {
    gameStatistic.time++;

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
    //Проверка выстрела
    for (let i = 0; i < asteroidCollection.length; i++) {
        asteroidCollection[i].y += asteroidCollection[i].speed;

        for (let j = 0; j < shootCollection.length; j++) {

            if (Math.abs(asteroidCollection[i].x + 25 - shootCollection[j].x - 15) < 50 && Math.abs(asteroidCollection[i].y - shootCollection[j].y) < 25) {
                // console.log('become');
                shootCollection[j].del = 1;
                asteroidCollection[i].del = 1;
                //gameStatistic.score++;
                // document.getElementById('statusPanes').innerHTML = String( gameStatistic.score);
                console.log(gameStatistic.score);
                break;

            }


        }

        if (asteroidCollection[i].del === 1) {
            asteroidCollection = asteroidCollection.slice(0, i).concat(asteroidCollection.slice(i + 1, asteroidCollection.length));
        }


        // else{
        //     if(asteroidCollection[i].y<1){
        //         asteroid.speed = -asteroid.speed;
        //     }
        // }
    }




    for (let i = 0; i < shootCollection.length; i++) {
        shootCollection[i].y += shoot.speed;
        if (shootCollection[i].y < 1 || shootCollection[i].del === 1) {
            shootCollection.splice(i, 1);
        }
    }

    for (let i = 0; i < asteroidCollection.length; i++) {
        if (asteroidCollection[i].y > 470) {
            asteroidCollection = asteroidCollection.slice(0, i).concat(asteroidCollection.slice(i + 1, asteroidCollection.length));
        }
    }

    for (let i = 0; i < bonusesList.length; i++) {
        bonusesList[i].y += bonusesList[i].speed;
        if (bonusesList[i].y > 470) {
            bonusesList = bonusesList.slice(0, i).concat(bonusesList.slice(i + 1, bonusesList.length));
        }
    }

    // for(let i=0;i<asteroidCollection.length;i++)
    //Проверка на столкновение метеорита и корабля
    for (let i = 0; i < asteroidCollection.length; i++) {


        if (Math.abs(asteroidCollection[i].x + 25 - player.x - 15) < 50 && Math.abs(asteroidCollection[i].y - player.y) < 25) {
            console.log('buuum');
            gameStatistic.changeHpStatus(-1);
            asteroidCollection = asteroidCollection.slice(0, i).concat(asteroidCollection.slice(i + 1, asteroidCollection.length));
            break;

        }

    }

    //Сбор монеток
    for (let i = 0; i < bonusesList.length; i++) {
        if (Math.abs(bonusesList[i].x + 25 - player.x - 15) < 50 && Math.abs(bonusesList[i].y - player.y) < 30) {
            bonusesList = bonusesList.slice(0, i).concat(bonusesList.slice(i + 1, bonusesList.length));
            gameStatistic.score++;
            break;
        }
    }

    if (gameStatistic.hp < 1) {
        window.location = 'Records.html';
        clearInterval(time);
        let nickname = prompt('Input your name');
        localStorage.setItem('time', gameStatistic.score);
        localStorage.setItem('nickname', nickname);
    }

}


function game() {
    update();
    render();
    requestAnimationFrame(game);
}


function render() {

    engine.ctx.drawImage(map.image, 0, 0, 800, 600);

    for (let i in asteroidCollection) {
        engine.ctx.drawImage(asteroid.image, asteroidCollection[i].x, asteroidCollection[i].y, 100, 100);
    }

    for (let i in shootCollection) {
        engine.ctx.drawImage(shoot.image, shootCollection[i].x, shootCollection[i].y, 100, 100);
    }

    for (let i in bonusesList) {
        engine.ctx.drawImage(bonusesList[i].image, bonusesList[i].x, bonusesList[i].y, 50, 50);
    }

    // document.getElementById('statusPanel').innerHTML = '' + gameStatistic.score + ';' + gameStatistic.hp;
    engine.ctx.drawImage(player.image, player.x, player.y, 100, 100);

    document.getElementById('Score').innerHTML = gameStatistic.score;
    document.getElementById('HealthStatus').innerHTML = gameStatistic.hp;
    document.getElementById('Time').innerText = 'Время ' + gameStatistic.time;
}

map.image.onload = function () {
    game();
};
