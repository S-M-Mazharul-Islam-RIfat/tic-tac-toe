const music = new Audio("./music/music.mp3");
const audioTurn = new Audio("./music/ting.mp3");
const gameover = new Audio("./music/gameover.mp3");
const reset = document.getElementById("reset");
let isGameOver = false;
let turn = "X";

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxText = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(e => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText === boxText[e[2]].innerText) && (boxText[e[0]].innerText !== "")) {
            document.querySelector(".info").innerText = boxText[e[0]].innerHTML + " Won";
            isGameOver = true;
            document.querySelector(".img-box").getElementsByTagName("img")[0].style.width = "200px";
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    })
}


// Game Logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {
    let boxText = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxText.innerText === "") {
            boxText.innerText = turn;
            audioTurn.play();
            turn = changeTurn();
            checkWin();
            if (!isGameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

// reset button
reset.addEventListener("click", () => {
    let boxText = document.querySelectorAll(".box-text");
    Array.from(boxText).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
    document.querySelector(".img-box").getElementsByTagName("img")[0].style.width = "0";
    document.querySelector(".line").style.width = "0";
})