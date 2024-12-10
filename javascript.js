const DOMLogic = (() => {
    return {
        squareMarker: document.querySelectorAll('.square').forEach((el) => {
            const controller = new AbortController();
            el.addEventListener('click', (e) => {
                let id = e.target.id;
                GameController.getMarker(id);
                controller.abort();
            }, { signal: controller.signal });
        }),

        makeInattive: function (e) {
            document.getElementById(`${e}`).classList.add('inattive');

        },

        cleanBoard: function () {
            for (let x in Gameboard.board) {
                Gameboard.board[x] = "";
                const square = document.getElementById(x);
                square.textContent = Gameboard.board[x];
                square.classList.remove('inattive');

            }
            const container = document.querySelector('.grid-container');
            container.replaceWith(container.cloneNode(true));
        },
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
    let winner = false;

    const setMarker = (index) => {
        Gameboard.board[index] = playerTurn.marker;
        const square = document.getElementById(`${index}`);
        square.textContent = playerTurn.marker;
        DOMLogic.makeInattive(index);
        // stopGame();
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
                console.log(playerTurn.namePlayer1);
                winner = true;
            }
            else if (combination.every(checkMarkerO)) {
                console.log(playerTurn.namePlayer2);
                winner = true;
            }
            else if (Gameboard.board.every(checkTie)) {
                console.log("Game tie");
                winner = true;
            }
        }
        );
        changePlayer();
    };

    const stopGame = () => {

        DOMLogic.cleanBoard();
    };

    const validity = (index) => {
        if (Gameboard.board[index] !== "") {
            alert("invalid position");
        } else {
            console.log(Gameboard.board);
            setMarker(index);
            checkWinner();
        };
    };

    const getMarker = (mark) => {
        if (winner) {
        stopGame();
        } else
        validity(mark);
    };

    return {
        getMarker,
        changePlayer

    };
})();