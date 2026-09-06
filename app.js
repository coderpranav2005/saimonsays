let gamesq = [];
let usersq = [];
let color = ["pink", "ylw", "blue", "grn"];

let gstart = false;
let level = 0;
let highscore = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function() {

    if (gstart == false) {
        console.log("game started");
        gstart = true;
        levelup();
    }
});

//random btn flash generate
function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 400);

}

//user select flashed btn
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300);

}

function levelup() {
    //when level up then user start to select the color from start
    usersq = [];

    // highscore++;
    level++;
    h2.innerText = ` its level ${level}`;
    let ridx = Math.floor(Math.random() * 3);
    let rcolor = color[ridx];
    let rbtn = document.querySelector(`.${rcolor}`);
    //generate the color then add in gamesq array
    gamesq.push(rcolor);
    // console.log(gamesq);
    //pass random btn as argument
    gameflash(rbtn);
}

function check(idx) {
    //console.log("curr level", level);
    //let idx = level - 1;
    if (gamesq[idx] === usersq[idx]) {
        if (usersq.length == gamesq.length) {
            setTimeout(levelup(), 1000);
        }
    } else {
        if (level > highscore) {
            highscore = level;
        }
        h2.innerHTML = `game over! your score was <b> ${level}</b> <br> press any key to restart the game `;
        h3.innerText = `Your high score : ${highscore}`
            //when user predict wrong body color are red and after 200ms color will be as it is white
        document.querySelector(".screen").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector(".screen").style.backgroundColor = "white";

        }, 200);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let userbtn = btn.getAttribute("id");
    usersq.push(userbtn);
    // console.log(usersq);
    check(usersq.length - 1);
}



//when user select which btn was flashed
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

//when user predition is incorrect then reset the game 
function reset() {
    gstart = false;
    gamesq = [];
    usersq = [];
    level = 0;
}