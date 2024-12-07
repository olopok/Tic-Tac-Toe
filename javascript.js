const DOMLogic = (() => {
    return {
        squareMarker: document.querySelectorAll('.square').forEach((el) => {
            el.addEventListener('click', (e) => {
                let id = e.target.id;
                console.log(id);
                GameController.getMarker(id);
                // return id;
            });
        })
    }

})();

const Gameboard = (() => {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = "";
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
    let winner = false

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
            return mark !== "";
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
                    winner = true;
                    // stopGame();
                } else {
                    console.log("X win");
                    winner = true;
                    // stopGame();
                };
            } else if (combination.every(checkMarkerO)) {
                if (playerTurn == Gameboard.Player1) {
                    console.log("O win");
                    winner = true;
                    // stopGame();
                } else {
                    console.log("X win");
                    winner = true;
                    // stopGame();
                };
            } else if (Gameboard.board.every(checkTie)) {
                console.log("Game tie");
                winner = "Tie";
                // stopGame();
            }
        });
    };

    const stopGame = () => {
        if (winner !== false) {
            alert("Game ended")
        }
    }

    const validity = (index) => {
        if (Gameboard.board[index] !== "") {
            alert("invalid position");
            // getMarker();
        } else {
            setMarker(index);
            changePlayer();
            console.log(Gameboard.board);
            checkWinner();
            // getMarker();
        };
    };

    const getMarker = (mark) => {
        if (winner !== false) {
            stopGame();
        }

        let index = mark;
        // function getindex() {DOMLogic.squareMarker.forEach((el) => {
        //     el.addEventListener('click', (e) => {
        //         let id = e.target.id;
        //         console.log(id);
        //         // return id;
        //     });
        // })};
            // console.log(index)

        validity(index);
    };

    return {
        getMarker
    };
})();

// GameController.getMarker()



