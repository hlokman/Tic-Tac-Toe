//const array = ['X'];
//gameBoard.array[6] = 'O';
const board = document.querySelector('#gameboard');
const subBoard = document.querySelectorAll('#cell');
const resultsBox = document.querySelector('.results');
//const array = [];

//--------------------CREATE PLAYERS----------------------------
const player = (name, marker) => {
    return {name, marker};
};
const playerOne = player('Player one', 'X');
const playerTwo = player('Player two', 'O');
const players = [playerOne, playerTwo];

//players[0].name = prompt("Player one's name", 'Player one');
//players[1].name = prompt("Player two's name", 'Player two');



//-------------------GAME BOARD--------------------------------
const gameBoard = (() => {
    const array = [];
    const getArray = () => array;
    //const array = ['X','O','O','X','X','O','X','O','X'];
    return {
        getArray
    };
})();


//-------------------GAME FLOW--------------------------------
const gameFlow = (() => {
    //console.log(players[0]);
    let activePlayer = players[0];

    /*board.addEventListener('click', (e) => {
        activePlayer = activePlayer == players[0] ? players[1] : players[0];
        console.log(activePlayer);
    }); // !!!!!!*/

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
            console.log('WIN');
            controller.abort();
            gameFlow.round(); //trick to get the correct player to render afterward
            resultsBox.textContent = '';
            resultsBox.textContent = `${gameFlow.getActivePlayer().name} is the winner !!!`
        } else if (gameBoard.getArray().length === 9 && gameBoard.getArray().includes(undefined) === false) {
            console.log('TIE');
            controller.abort();
            resultsBox.textContent = '';
            resultsBox.textContent = `It's a tie !!!!`
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
                //console.log(subBoard[i].attributes[1].value)
                if (subBoard[i].attributes[1].value == index) {
                    subBoard[i].innerText = item;
                }
            }
        })
    };
    screenUpdate(); 

    resultsBox.textContent = `${gameFlow.getActivePlayer().name}'s turn`

    //Useful in order to use controller.abort() within displayController module. This variable allow us to use *
    const controller = gameFlow.getController()
    //const board = gameBoard;
    //console.log(board.getArray())
    board.addEventListener('click', (e) => {
        console.log(e.target.dataset.indexNumber);
        //console.log(gameBoard.array[e.target.dataset.indexNumber]);
        //Change gameBoard.getArray() to board.getArray() 
        // ==> module was used to create gameBoard, so ne need to simplify gameBoard to board?
        if (gameBoard.getArray()[e.target.dataset.indexNumber] === undefined && e.target.id == 'cell') {
            gameBoard.getArray()[e.target.dataset.indexNumber] = gameFlow.getActivePlayer().marker;
            console.log(gameBoard.getArray());
            //e.target.innerText = gameFlow.getActivePlayer().marker;
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











//gameboard as an array inside of a Gameboard object
//if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
//module called ScreenController. This module will leverage an updateScreen pattern



//const test = document.querySelector('.test');
//displayController.display(array)
/*function display(array) {
    return test.textContent = array;
}; 
display(array)*/




