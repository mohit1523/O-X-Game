//O === 1
//X === 2

let pScore = 0;
let dScore = 0;
let cScore = 0;
let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let boxes = document.querySelectorAll('.box');
let grid = document.getElementById("main-grid");
let answerArr;
let map = new Map();
map.set("box1", [0, 0]);
map.set("box2", [0, 1]);
map.set("box3", [0, 2]);
map.set("box4", [1, 0]);
map.set("box5", [1, 1]);
map.set("box6", [1, 2]);
map.set("box7", [2, 0]);
map.set("box8", [2, 1]);
map.set("box9", [2, 2]);

let aniMap = new Map();
aniMap.set("00", "box1");
aniMap.set("01", "box2");
aniMap.set("02", "box3");
aniMap.set("10", "box4");
aniMap.set("11", "box5");
aniMap.set("12", "box6");
aniMap.set("20", "box7");
aniMap.set("21", "box8");
aniMap.set("22", "box9");

let b1;
let b2;
let b3;
//Player's Chance
boxes.forEach(element => {
    element.addEventListener('click', function () {
        if (map.has(this.id)) {
            let bool = updateValue(this.id, "X");
            if (bool) {
                anime("Player is Winner");
                animateBoxes();
                resetAll(".player");
            }
            else {
                //post updation work
                let arr = map.get(this.id);
                board[arr[0]][arr[1]] = 2;
                map.delete(this.id);
                if (map.size === 0) {
                    anime("Draw");
                    resetAll(".draw");
                }
                //Computer's Chance
                document.querySelector('.thinker').style.display = 'block';
                setTimeout(() => {
                    computerChance();
                    document.querySelector('.thinker').style.display = 'none';
                }, 1000);   
            }
        }
        else {
            window.alert("Select an unfilled box.");
        }

    })
});


//Computer Chance
const computerChance = function () {
    let a = Math.floor(Math.random() * 9);
    let temp = "box" + a;
    while (true) {
        if (map.size === 0) break;
        if (map.has(temp)) {
            let bool = updateValue(temp, "O");
            if (bool) {
                anime("Computer is Winner");
                animateBoxes();
                resetAll(".computer");
                break;
            }
            else {
                map.delete(temp);
                if (map.size === 0) {
                    anime("Draw");
                    resetAll(".draw");
                }
                break;
            }
        }
        else {
            a = Math.floor(Math.random() * 9);
            temp = "box" + a;
        }
    }
};


//Updating value and creating animation
const updateValue = function (bx, val) {
    let array = map.get(bx);
    let num1 = val === "X" ? 2 : 1;
    board[array[0]][array[1]] = num1;
    //Animation Work
    let currBox = document.getElementById(bx);
    currBox.innerHTML = val;
    currBox.style.animation = "letter 1s ease-in-out forwards";
    //return
    return checkWinner(num1);
};

const anime = function (str) {
    let ans = document.querySelector(".game > p");
    ans.innerText = str;
    ans.style.animation = "letter 1s ease-in-out forwards";

}


//Checking Winnner if Present
const checkWinner = function (num) {
    //diagonal check
    if (board[0][0] == num && board[1][1] == num && board[2][2] == num) {
        answerArr = [`${0}${0}`, `${1}${1}`, `${2}${2}`];
        return true;
    }
    if (board[0][2] == num && board[1][1] == num && board[2][0] == num) {
        answerArr = [`${0}${2}`, `${1}${1}`, `${2}${0}`];
        return true;
    }

    //row check
    if (board[0][0] === num && board[0][1] === num && board[0][2] === num) {
        answerArr = [`${0}${0}`, `${0}${1}`, `${0}${2}`];
        return true;
    }
    if (board[1][0] === num && board[1][1] === num && board[1][2] === num) {
        answerArr = [`${1}${0}`, `${1}${1}`, `${1}${2}`];
        return true;
    }
    if (board[2][0] === num && board[2][1] === num && board[2][2] === num) {
        answerArr = [`${2}${0}`, `${2}${1}`, `${2}${2}`];
        return true;
    }

    //column check
    if (board[0][0] === num && board[1][0] === num && board[2][0] === num) {
        answerArr = [`${0}${0}`, `${1}${0}`, `${2}${0}`];
        return true;
    }
    if (board[0][1] === num && board[1][1] === num && board[2][1] === num) {
        answerArr = [`${0}${1}`, `${1}${1}`, `${2}${1}`];
        return true;
    }
    if (board[0][2] === num && board[1][2] === num && board[2][2] === num) {
        answerArr = [`${0}${2}`, `${1}${2}`, `${2}${2}`];
        return true;
    }
    //If not true yet return false
    return false;
};

//Animating Winning Boxes
const animateBoxes = function () {
    b1 = aniMap.get(answerArr[0]);
    b2 = aniMap.get(answerArr[1]);
    b3 = aniMap.get(answerArr[2]);
    document.getElementById(b1).style.animation = "winnerAni 250ms ease-in-out infinite";
    document.getElementById(b2).style.animation = "winnerAni 250ms ease-in-out infinite";
    document.getElementById(b3).style.animation = "winnerAni 250ms ease-in-out infinite";
};


//Reseting
const resetAll = function (winHer) {
    if (winHer === ".player") {
        document.querySelector(winHer + " > p").innerText = ++pScore;
    }
    else if (winHer === ".draw") {
        document.querySelector(winHer + " > p").innerText = ++dScore;
    }
    else {
        document.querySelector(winHer + " > p").innerText = ++cScore;
    }


    setTimeout(() => {
        let ans = document.querySelector(".game > p");
        ans.innerHTML = "";
        ans.style.animation = "none";
        board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        map = new Map();
        map.set("box1", [0, 0]);
        map.set("box2", [0, 1]);
        map.set("box3", [0, 2]);
        map.set("box4", [1, 0]);
        map.set("box5", [1, 1]);
        map.set("box6", [1, 2]);
        map.set("box7", [2, 0]);
        map.set("box8", [2, 1]);
        map.set("box9", [2, 2]);
        //LOOP
        boxes.forEach(element => {
            element.innerHTML = "";
            element.style.animation = "none";
        });
        if (winHer != '.draw') {
            document.getElementById(b1).style.animation = "none";
            document.getElementById(b2).style.animation = "none";
            document.getElementById(b3).style.animation = "none";
        }
    }, 5000);
}
