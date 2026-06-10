// Aqui é o código responsavel por iniciar a tradução do site conectando ao google tradutor
function iniciarTradutor() {
  new google.translate.TranslateElement(
    { pageLanguage: 'pt' },
    'google_tradutior'
  );
}
// Aqui é o código responsavel por alterar o didioma do site
function alternarIdioma() {
  const dropdown = document.getElementById("idiomaDropdown");
  dropdown.classList.toggle("mostrar");
}

window.onclick = function(evento) {
  if (!evento.target.matches('.idioma_botao')) {
    const dropdown = document.getElementById("idiomaDropdown");
    if (dropdown.classList.contains('mostrar')) {
      dropdown.classList.remove('mostrar');
    }
  }
};

//Aqui executa a tradução total do site mudando para qualquer idioma do google tradutor
function googleTranslateElementInit() {
  iniciarTradutor();
}

//Essa é a função responsavel por aumentar e diminuir as fontes no site
let tamanhoFonte = 100;

function alterarFonte(valor){

    tamanhoFonte += valor * 10;

    if(tamanhoFonte < 80) tamanhoFonte = 80;
    if(tamanhoFonte > 180) tamanhoFonte = 180;

    document.body.style.fontSize = tamanhoFonte + "%";

    document.querySelectorAll(
        '.tela, .tela_2, .tela_3, .tela_4, .celular_tela, .tela_tv, .tela_deitado, .tela_deitado_2, .conteudo'
    ).forEach(elemento => {
        elemento.style.fontSize = tamanhoFonte + '%';
    });
}

function alternarTema(){
    document.body.classList.toggle("modo-escuro");
}

//Aqui é a constante das perguntas do quiz no final do site
const perguntas = [
  {
    pergunta: "1. O que é um meliponário?",
    respostas: ["A) Um local para armazenar mel produzido industrialmente", "B) Um espaço destinado à criação de abelhas sem ferrão", "C) Um viveiro de plantas medicinais", "D) Um local para criação de formigas"],
    correta: 1
  },
  {
    pergunta: "2. Qual dessas abelhas não faz parte da Tribo Meliponini",
    respostas: ["A) Jataí", "B) Mandaçaia", "C) Mirim Guaçu", "D) Europeia"],
    correta: 3
  },
  {
    pergunta: "3. Qual é a principal contribuição das abelhas para a agricultura?",
    respostas: ["A) Produzir fertilizantes naturais", "B) Realizar a polinização, aumentando a produção de frutos e sementes", "C) Controlar a temperatura das plantações", "D) Combater todas as pragas das lavouras"],
    correta: 1
  },
  {
    pergunta: "4. Como a preservação das abelhas contribui para um futuro sustentável?",
    respostas: ["A) Fortalecendo a produção de alimentos e ajudando na preservação da biodiversidade", "B) Aumentando apenas a produção de mel", "C) Reduzindo a necessidade de água nas lavouras", "D) Eliminando todas as espécies invasoras"],
    correta: 0
  },
  {
    pergunta: "5. Qual das culturas abaixo pode ser beneficiada pela polinização realizada pelas abelhas?",
    respostas: ["A) Musgo, samambaia e pinheiro", "B) Capim, trigo e bambu apenas", "C) Maracujá, morango, café e erva-mate", "D) Rochas calcárias e algas"],
    correta: 2
  }
];

//As variáveis usadas no quiz
let perguntaAtual = 0;
let pontuacao = 0;
let respostasUsuario = new Array(5).fill(null);

//Aqui é a criação das perguntas no código HTML e CSS
function carregarPergunta() {
  const p = perguntas[perguntaAtual];

  const perguntaEl = document.getElementById("pergunta");
  const respostasEl = document.getElementById("respostas");

  perguntaEl.innerText = p.pergunta;
  respostasEl.innerHTML = "";

  p.respostas.forEach((resposta, i) => {
    const btn = document.createElement("div");
    btn.innerText = resposta;
    btn.classList.add("resposta");

    if (respostasUsuario[perguntaAtual] === i) {
      btn.style.background = "#ffcf01"; 
    }

    btn.onclick = () => {
      respostasUsuario[perguntaAtual] = i;
      carregarPergunta(); 
    };

    respostasEl.appendChild(btn);
  });

  atualizarBotoes();
}

//Está é a função responsavel por ir para a proxima pergunta
function proximaPergunta() {
  if (respostasUsuario[perguntaAtual] === null) {
    alert("Selecione uma resposta!");
    return;
  }

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    carregarPergunta();
  } else {
    mostrarResultado();
  }
}

function perguntaAnterior() {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    carregarPergunta();
  }
}

//Ao finallizar o quiz, esta função mostra o numero de acertos que o usuiário teve no quiz
function mostrarResultado() {
  pontuacao = 0;

  perguntas.forEach((p, i) => {
    if (respostasUsuario[i] === p.correta) {
      pontuacao++;
    }
  });

  document.getElementById("pergunta").innerText = "Quiz finalizado!";
  document.getElementById("respostas").innerHTML = "";
  document.getElementById("resultado").innerText =
    "Você acertou " + pontuacao + " de " + perguntas.length;
}

//Caso o usuário queira reiniciar o quiz foi eaborado esta função
function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  respostasUsuario = new Array(perguntas.length).fill(null);

  document.getElementById("resultado").innerText = "";
  carregarPergunta();
}

function atualizarBotoes() {
  document.getElementById("btnAnterior").disabled = perguntaAtual === 0;
}

window.onload = carregarPergunta;