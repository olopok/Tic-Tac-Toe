const DOMLogic = (() => {
    return {
        squareMarker: function () {
            document.querySelectorAll('.square').forEach((el) => {
                const controller = new AbortController();
                el.addEventListener('click', (e) => {
                    let id = e.target.id;
                    GameController.getMarker(id);
                    controller.abort();
                }, { signal: controller.signal });
            })
        },

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
        },

        init: function () {
            const dialog = document.querySelector('dialog');
            addEventListener('load', () => {
                dialog.showModal();
            })
        },

        score: function () {
            const score1 = document.getElementById('mark-x');
            score1.textContent = ` Player ${Gameboard.Player1.name}: ${Gameboard.Player1.score}`;
            const score2 = document.getElementById('mark-O');
            score2.textContent = ` Player ${Gameboard.Player2.name}: ${Gameboard.Player2.score}`;
        },

        setPlayersName: function () {
            const name1 = document.getElementById('Player1').value;
            const name2 = document.getElementById('Player2').value;
            Gameboard.Player1.name = name1;
            Gameboard.Player2.name = name2;
        }

    }
})();

const Gameboard = (() => {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = "";
    };

    const Player1 = {
        name: "",
        marker: "X",
        score: 0
    };

    const Player2 = {
        name: "",
        marker: "O",
        score: 0
    };

    return {
        board,
        Player1,
        Player2
    };
})();

const GameController = (() => {
    let playerTurn = Gameboard.Player1;
    let winner;
    const startBtn = document.querySelector('#start');
    const reset = document.querySelector('.reset');
    const reload = document.querySelector('.reload');

    const startGame = () => {
        const dialog = document.querySelector('dialog');
        DOMLogic.setPlayersName();
        dialog.close();
        DOMLogic.squareMarker();
        DOMLogic.score();
    };

    startBtn.addEventListener('click', startGame);

    reset.addEventListener('click', () => {
        DOMLogic.cleanBoard();
        DOMLogic.squareMarker();
        winner = false
    });

    reload.addEventListener('click', () => {
        location.reload();
    })

    const setMarker = (index) => {
        Gameboard.board[index] = playerTurn.marker;
        const square = document.getElementById(`${index}`);
        square.textContent = playerTurn.marker;
        DOMLogic.makeInattive(index);
    };

    const changePlayer = () => { if (playerTurn !== Gameboard.Player1 ? playerTurn = Gameboard.Player1 : playerTurn = Gameboard.Player2); };

    const checkWinner = (() => {
        function checkMarkerX(mark) {
            return mark == playerTurn.marker;
        };

        function checkTie(val) {
            return val !== "";
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
                console.log(playerTurn.name);
                winner = true;
                alert(`Game Over ${playerTurn.name} win`);
                playerTurn.name === Gameboard.Player1.name ? Gameboard.Player1.score++ : Gameboard.Player2.score++;
                console.log(Gameboard.Player1.score, Gameboard.Player2.score)
                DOMLogic.score();
                stopGame()
            }
        }
        );

        const newComb = combinations.flat();
        if (!newComb.includes("") && !winner) {
            if (newComb.every(checkTie)) {
                console.log('Tie');
                alert('Game over round is tie');
                stopGame();
            }
        }
    });

    const stopGame = () => {
        const container = document.querySelector('.grid-container');
        container.replaceWith(container.cloneNode(true));
        console.log(winner)
    };

    const validity = (index) => {
        if (Gameboard.board[index] !== "") {
            alert("invalid position");
        } else {
            setMarker(index);
            console.log(Gameboard.board);
            checkWinner();
            changePlayer();
        };
    };

    const getMarker = (mark) => {
        validity(mark);
    };

    return {
        getMarker
    };
})();

DOMLogic.init();