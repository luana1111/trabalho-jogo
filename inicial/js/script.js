
var tutorialContent = document.getElementById("tutorial-content");
var tutorialButton = document.getElementById("tutorialButton");
var currentIndex = 0;

var tutoriais = [
    "Tutorial para responder as perguntas: Selecione o botão que mais combina com você.",
    "Tutorial para atirar: Pressione a barra de espaço para atirar.",
    "Tutorial para saltar: Pressione 'S' para saltar.",
];

let tutoriaisBotoes = [
    `
    <p>Tutorial para responder as perguntas: Selecione o botão que mais combina com você.</p>
    <div class="linha_botoes">
        <button class="botaoRespostas" >Texto 1</button>
        <button class="botaoRespostas" >Texto 2</button>
    </div>
    <div class="linha_botoes">
        <button class="botaoRespostas" >Texto 3</button>
        <button class="botaoRespostas" >Texto 4</button>
    </div>
    `,
];

tutorialContent.innerText = tutoriais[0];
tutorialContent.innerHTML = tutoriaisBotoes[0];

tutorialButton.addEventListener("click", function () {
    if (currentIndex < tutoriais.length - 1) {
        tutorialContent.innerText += tutoriais[++currentIndex];
        tutorialContent.innerHTML += tutoriaisBotoes[++currentIndex];
    } else {
        window.location.href = "jogo.html";
    }
});


console.log(tutoriais)
