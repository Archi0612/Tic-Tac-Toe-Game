let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer  = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
// let playername = document.querySelector("#playername");
let turnO= true; //playerO playerX
let count = 0;
let playerO = "PLAYER O";
let playerX = "PLAYER X";
 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],

    [1, 4, 7],
    [3, 4, 5],
    [5, 4, 3],

    [2, 5, 8],
    [2, 1, 0],
    [2, 4, 6],

    [6, 7, 8],
    [6, 3, 0],
    [6, 4, 2],

    [7, 4, 1],

    [8, 5, 2],
    [8, 7, 6],
    [8, 4, 0],
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnMessage(playerO);
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("Box was clicked");
        count++; //Increment counter for counting no. of clicks
        
        if(turnO){//playerO
            box.innerText = "O";
            turnO = false;
            box.style.color = "rgb(215, 29, 233)" ; //pink for playerO
            updateTurnMessage(playerX);
        }
        else{//playerX
            box.innerText = "X";
            turnO = true; 
            box.style.color =  "rgb(2, 67, 128)"; //blue for playerX
            updateTurnMessage(playerO);
        }
        box.disabled = true;
        checkWinner();
        draw();
        
    });
});


//Disable all boxes so no other can win
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

//Enable all boxes for new game
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const draw = () =>{
    if(count >= 9){
    msg.innerText = "It's DRAW";
    msgContainer.classList.remove("hide");
    disableBoxes();
    }
}

//show winners
const showWinner = (winner) =>{
    msg.innerText = `Congratulation winner is "${winner}" `;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//Check for winners
const checkWinner = () => {
    for(let patters of winPatterns){
        // console.log(patters[0], patters[1], patters[2]);
        let pos1Val = boxes[patters[0]].innerText;
        let pos2Val = boxes[patters[1]].innerText;
        let pos3Val = boxes[patters[2]].innerText; 

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
           
        }
    }
}

const updateTurnMessage = (playerName) => {
    const playerTurnElement = document.getElementById("player-name");
    playerTurnElement.innerText = `Turn : ${playerName}`;
}
updateTurnMessage(playerO); //Initialise 1st player
newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);