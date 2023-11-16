class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    // Função para inserir um novo elemento no final da lista
    insert(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  
    // Função para remover um elemento da lista
    remove(data) {
      if (!this.head) {
        return;
      }
      if (this.head.data === data) {
        this.head = this.head.next;
        return;
      }
      let current = this.head;
      let previous = null;
      while (current && current.data !== data) {
        previous = current;
        current = current.next;
      }
      if (current) {
        previous.next = current.next;
      }
    }
  
    // Função para exibir todos os elementos da lista
    displayAll() {
      let current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next;
      }
    }
  }
  
  // Seleciona todos os botões com a classe "botaoRespostas"
  const falas = ["ai que nao sei oq nao sei oq la",
   "*** ******* ******* ",
    "uiuiuiuiu ", "Texto 4", 
    ""];
  let indiceFalaAtual = 0;
  
  // Seleciona a div com a classe "falas"
  const divFalas = document.querySelector(".falas");
  
  // Seleciona todos os elementos h1 dentro da div
  const elementosDeTexto = divFalas.querySelectorAll("h1");
  
  // Crie uma lista encadeada para armazenar os nomes dos botões clicados
  const listaNomesClicados = new LinkedList();
  
  // Atualiza o texto da fala atual
  function atualizarFala() {
      elementosDeTexto[0].textContent = falas[indiceFalaAtual];
  }
  
  // Adiciona um ouvinte de evento de clique para cada botão
  const botoes = document.querySelectorAll(".botaoRespostas");
  botoes.forEach(function(botao) {
      botao.addEventListener("click", function() {
          // Obtém o valor do atributo "data-nome" do botão clicado
          const dataNome = botao.getAttribute("data-nome");
          listaNomesClicados.insert(dataNome); // Adiciona o nome do botão à lista encadeada
          console.log("Nomes dos botões clicados:");
          listaNomesClicados.displayAll(); // Exibe todos os nomes dos botões clicados na lista
          indiceFalaAtual++;
          if (indiceFalaAtual >= falas.length) {
              indiceFalaAtual = 0;
          }
          atualizarFala();
      });
  });
  
  // Atualiza o texto da fala inicial
  atualizarFala();
