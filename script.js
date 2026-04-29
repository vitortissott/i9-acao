function iniciarTradutor() {
  new google.translate.TranslateElement(
    { pageLanguage: 'pt' },
    'google_tradutior'
  );
}

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

function googleTranslateElementInit() {
  iniciarTradutor();
}

const perguntas = [
  {
    pergunta: "1. Qual dessas abelhas não possui ferrão funcional?",
    respostas: ["A) Europeia", "B) Jataí", "C) Vespa", "D) Mosca"],
    correta: 1
  },
  {
    pergunta: "2. Como o mel das abelhas sem ferrão costuma ser?",
    respostas: ["A) Muito amargo", "B) Muito azedo", "C) Sem sabor", "D) Mais líquido e levemente ácido"],
    correta: 3
  },
  {
    pergunta: "3. Por que as abelhas são importantes para o meio ambiente?",
    respostas: ["A) Produzem oxigênio", "B) Polinizam plantas", "C) Caçam insetos", "D) Produzem gás carbônico"],
    correta: 1
  },
  {
    pergunta: "4. Quais são os três tipos de indivíduos em uma colmeia?",
    respostas: ["A) Rainha, operária e zangão", "B) Rei, rainha e guarda", "C) Rainha, vespa e zangão", "D) Nenhuma das alternativas acima"],
    correta: 0
  },
  {
    pergunta: "5. O que é um meliponário?",
    respostas: ["A) Lugar onde se planta mel", "B) Casa de formigas", "C) Criação de abelhas sem ferrão", "D) Lugar da extração da cera"],
    correta: 2
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respostasUsuario = new Array(5).fill(null);

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