//const array = ['X'];
//gameBoard.array[6] = 'O';
const board = document.querySelector('#gameboard');
//const array = [];

//--------------------CREATE PLAYERS----------------------------
const player = (name, marker) => {
    return {name, marker};
};
const playerOne = player('One', 'X');
const playerTwo = player('Two', 'O');



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


    return {

    };
})();


//----------------DISPLAY CONTROLLER---------------------------
const displayController = (() => {
    //const board = gameBoard;
    //console.log(board.getArray())

    board.addEventListener('click', (e) => {
        console.log(e.target.dataset.indexNumber);
        //console.log(gameBoard.array[e.target.dataset.indexNumber]);
        //Change gameBoard.getArray() to board.getArray() 
        // ==> module was used to create gameBoard, so ne need to simplify gameBoard to board?
        if (gameBoard.getArray()[e.target.dataset.indexNumber] == undefined) {
            gameBoard.getArray()[e.target.dataset.indexNumber] = 'X';
            console.log(gameBoard.getArray())
            e.target.textContent = 'X'
        }
        });
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




