let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let count_plays = 0


const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))

}

function boxClicked(e) {
    const id = e.target.id
    if(!playerHasWon())
    {
        if(spaces[id] == null){
            spaces[id] = currentPlayer
            e.target.innerText = currentPlayer

            if(playerHasWon() != false){        // WIN
                playerText.innerHTML = `${currentPlayer} has won!`
                let winningBlocks = playerHasWon()      // returns array
                winningBlocks.map( box => boxes[box].style.backgroundColor = winnerIndicator)   // highligtin the winner blocks
                return
            }
            count_plays++

            if(currentPlayer == X_TEXT){    // Turn O
                currentPlayer = O_TEXT
            }
            else{
                currentPlayer = X_TEXT      // Turn X
            }
        }
    }
    if(count_plays == 9) {      // All the moves have been made
        playerText.innerHTML = 'Draw'
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}


const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],  // Horizontal
    [0,3,6], [1,4,7], [2,5,8],  // Vertical
    [0,4,8], [2,4,6]            // Cross
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){    // Win Case
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)
function restart(){
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = ''
    })
    playerText.innerHTML = 'Tic Tac Toe'
    count_plays = 0
    currentPlayer = X_TEXT
}
startGame()