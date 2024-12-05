const Gameboard = (() => {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = "#";
    };

    const Player1 = {
        namePlayer1: "Player 1",
        marker: "X"
    };

    const Player2 = {
        namePlayer2: "PLayer 2",
        marker: "O"
    };

    return {
        board,
        Player1,
        Player2
    };
})();

const GameController = (() => {

    let playerTurn = Gameboard.Player1;

    Gameboard.board[1] = "O";

    const setMarker = (index) => {
        Gameboard.board[index] = playerTurn.marker;
    };

    const changePlayer = () => { if (playerTurn !== Gameboard.Player1 ? playerTurn = Gameboard.Player1 : playerTurn = Gameboard.Player2); };

    const checkWinner = () => {

        function checkMarker(mark) {
          return mark == 'X';
        };

        const combinations = [
            [Gameboard.board[0], Gameboard.board[1], Gameboard.board[2]],
            [Gameboard.board[3], Gameboard.board[4], Gameboard.board[5]],
            [Gameboard.board[6], Gameboard.board[7], Gameboard.board[8]],
            [Gameboard.board[0], Gameboard.board[3], Gameboard.board[6]],
            [Gameboard.board[1], Gameboard.board[4], Gameboard.board[7]],
            [Gameboard.board[2], Gameboard.board[5], Gameboard.board[8]],
            [Gameboard.board[0], Gameboard.board[4], Gameboard.board[8]],
            [Gameboard.board[2], Gameboard.board[4], Gameboard.board[6]]
        ];

        for (i = 0; i <= combinations.length; i++) {
            for (j=0; j<= combinations[1].length; j++) {
                if (combinations[j].every(checkMarker)){
                    if (playerTurn == Gameboard.Player1) {
                        console.log("O win");
                    } else console.log("X Win");
                };
            };
        };
    };

    const validity = (index) => {
        if (Gameboard.board[index] !== "#") {
            alert("invalid position");
            getMarker();
        } else {
            setMarker(index);
            changePlayer();
            console.log(Gameboard.board);
            checkWinner();
            getMarker();
        }

    };

    const getMarker = () => {
        const index = prompt("Choose position");
        validity(index);
    };

    return {
        getMarker
    };

})();

GameController.getMarker();

console.log(Gameboard.board)



