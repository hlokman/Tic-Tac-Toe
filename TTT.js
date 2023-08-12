//const array = ['X'];
//gameBoard.array[6] = 'O';
const board = document.querySelector('#gameboard');
//const array = [];

//-------------------GAME FLOW--------------------------------
const gameFlow = (() => {
    board.addEventListener('click', (e) => {
    console.log(e.target.dataset.indexNumber);
    //console.log(gameBoard.array[e.target.dataset.indexNumber]);
    if (gameBoard.array[e.target.dataset.indexNumber] == undefined) {
        gameBoard.array[e.target.dataset.indexNumber] = 'X';
        console.log(gameBoard.array)
        e.target.textContent = 'X'
    }
    });

    return {
        
    };
})();

//-------------------GAME BOARD--------------------------------
const gameBoard = (() => {
    const array = [];
    //const array = ['X','O','O','X','X','O','X','O','X'];
    return {
        array
    };
})();

//----------------DISPLAY CONTROLLER---------------------------
const displayController = (() => {
    const display = function(array) {
        return test.textContent = array;
    };
    
    return {
        //array,
        display
    };
})();

//--------------------CREATE PLAYERS----------------------------
const player = (name, marker) => {
    return {name, marker};
};
const playerOne = player('One', 'X');
const playerTwo = player('Two', 'O');


//gameboard as an array inside of a Gameboard object
//if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

//const test = document.querySelector('.test');
//displayController.display(array)
/*function display(array) {
    return test.textContent = array;
}; 
display(array)*/




