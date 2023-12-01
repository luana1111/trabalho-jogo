const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('#playButton'),
    win: document.querySelector('.game-interface'), // Alterado para corresponder ao elemento correto
    initialInterface: document.querySelector('.initial-interface'),
    gameInterface: document.querySelector('.game-interface'),
    winMessage: document.querySelector('.win-message'),
    playAgainButton: document.querySelector('#playAgainButton')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    timeLimit: 60
}

const showWinMessage = () => {
    selectors.boardContainer.classList.add('flipped');

    const winContainer = document.createElement('div');
    winContainer.setAttribute('class', 'win-container');

    const winText = document.createElement('div');
    winText.textContent = 'Você venceu!';

    const playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('id', 'playAgainButton');
    playAgainButton.textContent = 'Jogar Novamente';
    playAgainButton.addEventListener('click', () => {
        location.reload();
    });

    winContainer.appendChild(winText);
    winContainer.appendChild(playAgainButton);

    selectors.winMessage.appendChild(winContainer);
};

const checkWinCondition = () => {
    if (document.querySelectorAll('.card:not(.matched)').length === 0) {
        endGame(true);
        showWinMessage(); // Chama a função showWinMessage quando o jogo é vencido
    }
};


const showGameOverText = () => {
    selectors.boardContainer.classList.add('flipped'); // Adiciona a classe para "virar" o tabuleiro

    // Cria a caixa de texto com o score
    const gameOverContainer = document.createElement('div');
    gameOverContainer.setAttribute('class', 'game-over-container');

    const gameOverText = document.createElement('div');
    gameOverText.textContent = "O tempo acabou! Seu score foi de " + state.totalFlips + " moves em " + state.totalTime + " segundos.";

    const playAgainButton = document.createElement('button');
    playAgainButton.setAttribute('class', 'botao2');
    playAgainButton.textContent = "Jogar Novamente";
    playAgainButton.addEventListener('click', () => {
        location.reload();
    });
    gameOverContainer.appendChild(gameOverText);
    gameOverContainer.appendChild(playAgainButton);

    selectors.boardContainer.appendChild(gameOverContainer);
};

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
};

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const emojis = ['🐱', '🐈', '😹', '😻', '🙀', '😿', '😽', '😾', '😸', '🐾']
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2)
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true;

    state.loop = setInterval(() => {
        state.totalTime++;

        if (state.totalTime >= state.timeLimit) {
            endGame(false); // false indica que o jogador perdeu
        }

        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `time: ${state.totalTime} sec`;
    }, 1000);
    //endGame(true)
}

const endGame = (isWinner) => {
    clearInterval(state.loop);

    if (isWinner) {
        selectors.boardContainer.classList.add('flipped');
        selectors.win.style.display = 'block';
        selectors.win.querySelector('.win-text').innerHTML = `
                You won!<br/>with
                <span class="highlight">${state.totalFlips}</span> moves<br/>under 
                <span class="highlight">${state.totalTime}</span> seconds
            `;
    } else {
        showGameOverText();
        selectors.boardContainer.classList.add('flipped');
        selectors.win.innerHTML = `
                <span class="win-text">
                    You lost! Better luck next time.
                </span>
            `;
    }
};

selectors.start.addEventListener('click', () => {
    generateGame();
    selectors.start.style.display = 'none';
    selectors.gameInterface.style.display = 'block';

    setTimeout(() => {
        showGameOverText();
    }, state.timeLimit * 1000);
});

const playAgainButton = document.getElementById('playAgainButton');


const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        console.log("chamou 174")
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
    checkWinCondition();

    // If there are no more cards that we can flip, we won the game
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        endGame(true);
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent);
        } else if (eventTarget.nodeName === 'BUTTON' && eventTarget.id === 'playButton') {
            startGame();
        }
    });
};

attachEventListeners();
