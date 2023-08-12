//const array = ['X'];
//gameBoard.array[6] = 'O';

const gameBoard = (() => {
    const array = [];
    return {
        array
    };
})();


const displayController = (() => {

    return {

    };
})();


const player = (name, marker) => {

    return {name, marker};
};

//gameboard as an array inside of a Gameboard object
//if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.