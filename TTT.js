const board = document.querySelector('#gameboard');
const subBoard = document.querySelectorAll('#cell');
const resultsBox = document.querySelector('.results');
const restart = document.querySelector('.restart');
const names = document.querySelector('.names');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

//--------------------CREATE PLAYERS----------------------------
const player = (name, marker) => {
    return {name, marker};
};
const playerOne = player('Player 1', 'X');
const playerTwo = player('Player 2', 'O');
const players = [playerOne, playerTwo];


//-------------------GAME BOARD--------------------------------
const gameBoard = (() => {
    const array = [];
    const getArray = () => array;
    return {
        getArray
    };
})();

//-------------------GAME FLOW--------------------------------
const gameFlow = (() => {
    let activePlayer = players[0];

    const round = () => {
        activePlayer = activePlayer == players[0] ? players[1] : players[0];
    };

    let getActivePlayer = () => activePlayer;

    //Useful in order to use controller.abort() within displayController module
    const controller = new AbortController();
    const result = () => {
        if (gameBoard.getArray()[0] === gameBoard.getArray()[4] && gameBoard.getArray()[0] === gameBoard.getArray()[8] && gameBoard.getArray()[0] != undefined ||
            gameBoard.getArray()[0] === gameBoard.getArray()[1] && gameBoard.getArray()[0] === gameBoard.getArray()[2] && gameBoard.getArray()[0] != undefined ||
            gameBoard.getArray()[0] === gameBoard.getArray()[3] && gameBoard.getArray()[0] === gameBoard.getArray()[6] && gameBoard.getArray()[0] != undefined ||
            gameBoard.getArray()[3] === gameBoard.getArray()[4] && gameBoard.getArray()[3] === gameBoard.getArray()[5] && gameBoard.getArray()[3] != undefined ||
            gameBoard.getArray()[6] === gameBoard.getArray()[7] && gameBoard.getArray()[6] === gameBoard.getArray()[8] && gameBoard.getArray()[6] != undefined ||
            gameBoard.getArray()[6] === gameBoard.getArray()[4] && gameBoard.getArray()[6] === gameBoard.getArray()[2] && gameBoard.getArray()[6] != undefined ||
            gameBoard.getArray()[1] === gameBoard.getArray()[4] && gameBoard.getArray()[1] === gameBoard.getArray()[7] && gameBoard.getArray()[1] != undefined ||
            gameBoard.getArray()[2] === gameBoard.getArray()[5] && gameBoard.getArray()[2] === gameBoard.getArray()[8] && gameBoard.getArray()[2] != undefined) {
            controller.abort();
            gameFlow.round(); //trick to get the correct player to render afterward
            resultsBox.textContent = '';
            resultsBox.innerHTML = `CONGRATULATIONS!<br>${gameFlow.getActivePlayer().name} wins`
        } else if (gameBoard.getArray().length === 9 && gameBoard.getArray().includes(undefined) === false) {
            controller.abort();
            resultsBox.textContent = '';
            resultsBox.textContent = `It's a tie !`
        }
    };
    const getController = () => controller;

    return {
        getActivePlayer,
        round,
        result,
        getController
    };
})();


//----------------DISPLAY CONTROLLER---------------------------
const displayController = (() => {
    const screenUpdate = () => {
        gameBoard.getArray().forEach((item, index) => {
            for (let i = 0; i <= 8; i++) {
                if (subBoard[i].attributes[1].value == index) {
                    if (item == 'X') {
                        subBoard[i].innerHTML = '<img src="./images/icons8-x.svg" class="mark">';
                    } else if (item == 'O') {
                        subBoard[i].innerHTML = '<img src="./images/circle-xxs-svgrepo-com.svg" class="mark" id="circle"></img>';
                    }
                    
                }
            }
        })
    };
    screenUpdate(); 

    //to render the names on screen
    player1.textContent = `${players[0].name}`;
    player2.textContent = `${players[1].name}`;
    //to restart the game
    restart.addEventListener('click', () => {
        document.location.reload();
    });
    //to change the names
    names.addEventListener('click', () => {
        if (gameBoard.getArray().length === 0) {
            players[0].name = prompt("Player 1's name", 'Player 1');
            while (players[0].name.length > 30) {
                alert('please choose a name under 30 characters')
                players[0].name = prompt("Player 1's name", 'Player 1');
            }
            players[1].name = prompt("Player 2's name", 'Player 2');
            while (players[1].name.length > 30) {
                alert('please choose a name under 30 characters')
                players[1].name = prompt("Player 1's name", 'Player 1');
            }
            player1.textContent = `${players[0].name}`;
            player2.textContent = `${players[1].name}`;
            resultsBox.textContent = '';
            resultsBox.textContent = `${players[0].name}'s turn`
        } else {
            alert('You can not change the names mid-game')
        }
    })
    //
    resultsBox.textContent = `${gameFlow.getActivePlayer().name}'s turn`

    //Useful in order to use controller.abort() within displayController module. This variable allow us to use *
    const controller = gameFlow.getController()
    board.addEventListener('click', (e) => {
        if (gameBoard.getArray()[e.target.dataset.indexNumber] === undefined && e.target.id == 'cell') {
            gameBoard.getArray()[e.target.dataset.indexNumber] = gameFlow.getActivePlayer().marker;
            console.log(gameBoard.getArray());
            gameFlow.round();
            resultsBox.textContent = '';
            resultsBox.textContent = `${gameFlow.getActivePlayer().name}'s turn`
            screenUpdate();
            gameFlow.result();
            

        }
        }, { signal: controller.signal }); //*that part here


    return {};
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
})();




