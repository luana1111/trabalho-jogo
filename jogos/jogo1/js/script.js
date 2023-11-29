document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.container-game');
    const allMoleItems = document.querySelectorAll('.item');
    let startGame, startTime, countDown = 20, score = 0;

    const timeCount = document.getElementById('time-count');
    const scoreCount = document.getElementById('score-count');
    const playButton = document.getElementById('playButton');

    gameContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('mole-clicked')) {
            score++;
            scoreCount.innerHTML = score;

            const bushElem = e.target.parentElement.previousElementSibling;

            let textEl = document.createElement('span');
            textEl.setAttribute('class', 'whack-text');
            textEl.innerHTML = "whack!";
            bushElem.appendChild(textEl);

            setTimeout(() => {
                textEl.remove();
            }, 300);
        }
    });

    const startGameFunction = () => {
        playButton.style.display = 'none';
        countSection.style.display = 'block';

        startTime = setInterval(() => {
            timeCount.innerHTML = countDown;
            countDown--;
            if (countDown < 0) {
                clearInterval(startGame);
                clearInterval(startTime);
                timeCount.innerHTML = "0";
                showGameOverText();
            }
        }, 1000);

        startGame = setInterval(() => {
            showMole();
        }, 600);
    }

    const initializeGame = () => {
        countDown = 20;
        score = 0;
        scoreCount.innerHTML = score; // Zerar o placar
        startGameFunction();
    }

    playButton.addEventListener('click', startGameFunction);

    function showMole() {
        if (countDown <= 0) {
            clearInterval(startGame);
            clearInterval(startTime);
            timeCount.innerHTML = "0";
            showGameOverText();
        }
        let moleToAppear = allMoleItems[getRandomValue()].querySelector('.mole');
        moleToAppear.classList.add('mole-appear');
        hideMole(moleToAppear);
    }

    function getRandomValue() {
        let rand = Math.random() * allMoleItems.length;
        return Math.floor(rand);
    }

    function hideMole(moleItem) {
        setTimeout(() => {
            moleItem.classList.remove('mole-appear');
        }, 999);
    }

    function showGameOverText() {
        countSection.style.display = 'none';

        let gameOverContainer = document.createElement('div');
        gameOverContainer.setAttribute('class', 'game-over-container');

        let gameOverText = document.createElement('div');
        gameOverText.innerHTML = "O tempo acabou! Seu score foi de " + score;

        let playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('class', 'botao2');
        playAgainButton.innerHTML = "Jogar Novamente";
        playAgainButton.addEventListener('click', () => {
            resetGame();
        });

        gameOverContainer.appendChild(gameOverText);
        gameOverContainer.appendChild(playAgainButton);

        // Adiciona a caixa de texto como o último filho do contêiner do jogo
        gameContainer.appendChild(gameOverContainer);
    }

    function resetGame() {
        clearInterval(startGame);
        clearInterval(startTime);

        // Limpa o contêiner do jogo removendo os elementos
        gameContainer.innerHTML = '';

        // Reinicia o jogo
        initializeGame();
    }
});
