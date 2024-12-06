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

        function checkMarkerX(mark) {
            return mark == 'X';
        };

        function checkMarkerO(mark) {
            return mark == "O";
        };

        function checkTie(mark) {
            return mark !== "#";
        }

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


        combinations.forEach((combination) => {
            if (combination.every(checkMarkerX)) {
                if (playerTurn == Gameboard.Player1) {
                    console.log("O win");
                } else console.log("X win");
            } else if (combination.every(checkMarkerO)) {
                if (playerTurn == Gameboard.Player1) {
                    console.log("O win");
                } else console.log("X win");
            } else if (Gameboard.board.every(checkTie)){
                
                console.log("Game tie");
            };
        });

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



