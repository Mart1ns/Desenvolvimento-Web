let palavras_secretas_Categoria;
let palavras_secretas_Sorteada;
let listaDinamica = [];
let tentativas = 6;
let palavras = []
let jogarnovamente = true;
let jogoautomatico = true;

carregaListaAutomatica() // carregar lista automatica

criarPalavraSecreta(); // criar palavra secreta

function criarPalavraSecreta() {
  const indexPalavra = parseInt(Math.random() * palavras.length);

  palavras_secretas_Sorteada = palavras[indexPalavra].nome.toUpperCase();
  palavras_secretas_Categoria = palavras[indexPalavra].categoria.toUpperCase();
}

document.addEventListener('DOMContentLoaded', function () {
  MontarPalavraNaTela();
});

function MontarPalavraNaTela() {
  const categoria = document.getElementById("categoria");
  categoria.innerHTML = palavras_secretas_Categoria;

  const palavraTela = document.getElementById("palavra_secreta");
  palavraTela.innerHTML = '';
  console.log(palavras_secretas_Sorteada);

  for (i = 0; i < palavras_secretas_Sorteada.length; i++) {
    if (listaDinamica[i] == undefined) {
      if(palavras_secretas_Sorteada[i] == ' '){
        listaDinamica[i] = ' ';
        palavraTela.innerHTML += '<div class="letrasEspaco">'  + listaDinamica[i] + '</div>';
      }else{
        listaDinamica[i] = '&nbsp;'; // espaço no HTML
        palavraTela.innerHTML += '<div class="letras">' + listaDinamica[i] + '</div>';
      }
     
    } else {
      if(palavras_secretas_Sorteada[i] == ' '){
            listaDinamica[i] = ' ';
            palavraTela.innerHTML += '<div class="letrasEspaco">'  + listaDinamica[i] + '</div>';
          }else{
            palavraTela.innerHTML += '<div class="letras">' + listaDinamica[i] + '</div>';
          }
    
    }
  }
}

function verificaLetraEscolhida(letra) {
  document.getElementById('tecla-' + letra).disabled = true;
  if (tentativas > 0) { // se perder, para!
    MudarStyleLetra("tecla-" + letra, false);
    comparalistas(letra);
    MontarPalavraNaTela();
  }
}

function MudarStyleLetra(tecla, condicao) {

   if (condicao == false) {
        document.getElementById(tecla).style.background = "#ff0088";
         document.getElementById(tecla).style.color = "whitesmoke";
   } else { 
        document.getElementById(tecla).style.background = "#00ff88";
        document.getElementById(tecla).style.color = "whitesmoke";
   }
}   

async function comparalistas(letra) {
  const posicao = palavras_secretas_Sorteada.indexOf(letra);
  if (posicao < 0) {
    tentativas--;
    CarregaImagemForca();
    if (tentativas == 0) {
      abrirModal('Ops!', 'Você perdeu! A palavra secreta era: ' + palavras_secretas_Sorteada + '.');
      piscarBotaoJogarNovamente(true);
    }
    
  } else {
    MudarStyleLetra("tecla-" + letra, true);
    for (i = 0; i < palavras_secretas_Sorteada.length; i++) {
      if (palavras_secretas_Sorteada[i] == letra) {
        listaDinamica[i] = letra;
      }
    }
  }

  let vitoria = true;
  for (i = 0; i < palavras_secretas_Sorteada.length; i++) {
    if (palavras_secretas_Sorteada[i] != listaDinamica[i]) {
      vitoria = false;
    }
  }

  if (vitoria == true) {
    abrirModal('Parabéns!', 'Você acertou! A palavra secreta era: ' + palavras_secretas_Sorteada + '.');
    tentativas = 0;
    piscarBotaoJogarNovamente(true);
  }
}

async function atraso(tempo){ // usar para não travar o navegador
    return new Promise(resolve => setTimeout(resolve, tempo));
}

function CarregaImagemForca() {
  switch (tentativas) {
    case 5:
      document.getElementById('imagem').style.background = 'url("./assets/images/forca01.png")';
      break;
    case 4:
      document.getElementById('imagem').style.background = 'url("./assets/images/forca02.png")';
      break;
    case 3:
      document.getElementById('imagem').style.background = 'url("./assets/images/forca03.png")';
      break;
    case 2:
      document.getElementById('imagem').style.background = 'url("./assets/images/forca04.png")';
      break;
    case 1:
      document.getElementById('imagem').style.background = 'url("./assets/images/forca05.png")';
      break;
    case 0:
      document.getElementById('imagem').style.background = 'url("./assets/images/forca06.png")';
      break;
    default:
      document.getElementById('imagem').style.background = 'url("./assets/images/forca.png")';
      break;
  }
}

function reiniciarJogo() { // reinicia o jogo
    jogarnovamente = false;
    location.reload();
  };
  

function abrirModal(titulo, mensagem) { // abre o modal
  let modalTitulo = document.getElementById('exampleModalLabel');
  modalTitulo.innerText = titulo;

  let modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = mensagem;

  let modal = new bootstrap.Modal(document.getElementById('myModal'));
  modal.show();
}

function listaAutomatica(){ // ativa o modo manual
    if(jogoautomatico == true){
        document.getElementById('jogarAutomatico').innerHTML = '<i class="bx bx-play"></i>'
        
        palavras = [];

        jogoautomatico = false;
        document.getElementById('abreModalAddPalavra').style.display = "block";
        document.getElementById('status').innerHTML = "Modo Manual";




    } else if(jogoautomatico == false){ // ativa o modo automatico
        document.getElementById('jogarAutomatico').innerHTML = '<i class="bx bx-pause"></i>'
        jogoautomatico = true;
        document.getElementById('abreModalAddPalavra').style.display = "none";
        document.getElementById('status').innerHTML = "Modo Automático";
    }
    
}

document.addEventListener("DOMContentLoaded", function() { // corrigir errode manipulação no DOM
    const modal = document.getElementById("modal-alerta");
  
    const btnAbreModal = document.getElementById("abreModalAddPalavra");
    btnAbreModal.onclick = function() {
      modal.style.display = "block";
    };
  
    const btnFechaModal = document.getElementById("fechaModal");
    btnFechaModal.onclick = function() {
      modal.style.display = "none";
      document.getElementById("addPalavra").value = "";
      document.getElementById("addCategoria").value = "";


    };

  
    window.onclick = function() {
        if (event.target == modal) {
          modal.style.display = "none";
          document.getElementById("addPalavra").value = "";
          document.getElementById("addCategoria").value = "";
        }
    }

  });
  
function carregaListaAutomatica(){ // carrega lista automatica   
palavras = [
    palavra001 = {
        nome: "IRLANDA",
        categoria:"LUGARES"
    },
    palavra002 = {
        nome: "EQUADOR",
        categoria:"LUGARES"
    },
    palavra003 = {
        nome: "CHILE",
        categoria:"LUGARES"
    },
    palavra004 = {
        nome: "INDONESIA",
        categoria:"LUGARES"
    },
    palavra005 = {
        nome: "MALDIVAS",
        categoria:"LUGARES"
    },
    palavra006 = {
        nome: "INGLATERRA",
        categoria:"LUGARES"
    },
    palavra007 = {
        nome: "GROELANDIA",
        categoria:"LUGARES"
    },
    palavra008 = {
        nome: "UZBEQUISTAO",
        categoria:"LUGARES"
    },
    palavra009 = {
        nome: "INDONESIA",
        categoria:"LUGARES"
    },
    palavra010 = {
        nome: "CREGUENHEM",
        categoria:"LUGARES"
    },
    palavra011 = {
        nome: "BICICLETA",
        categoria:"TRANSPORTE"
    },
    palavra012 = {
        nome: "LANCHA",
        categoria:"TRANSPORTE"
    },
    palavra013 = {
        nome: "NAVIO",
        categoria:"TRANSPORTE"
    },
    palavra014 = {
        nome: "TELEFERICO",
        categoria:"TRANSPORTE"
    },
    palavra015 = {
        nome: "MOTOCICLETA",
        categoria:"TRANSPORTE"
    },
    palavra016 = {
        nome: "BARCO",
        categoria:"TRANSPORTE"
    },
    palavra017 = {
        nome: "AERONAVE",
        categoria:"TRANSPORTE"
    },
    palavra018 = {
        nome: "TREM",
        categoria:"TRANSPORTE"
    },
    palavra019 = {
        nome: "CAIAQUE",
        categoria:"TRANSPORTE"
    },
    palavra020 = {
        nome: "FUNICULAR",
        categoria:"TRANSPORTE"
    },
    palavra021 = {
        nome: "XICARA",
        categoria:"OBJETOS"
    },
    palavra022 = {
        nome: "MOEDA",
        categoria:"OBJETOS"
    },
    palavra023 = {
        nome: "ESPARADRAPO",
        categoria:"OBJETOS"
    },
    palavra024 = {
        nome: "SINO",
        categoria:"OBJETOS"
    },
    palavra025 = {
        nome: "CHUVEIRO",
        categoria:"OBJETOS"
    },
    palavra026 = {
        nome: "TAMBORETE",
        categoria:"OBJETOS"
    },
    palavra027 = {
        nome: "LAMPADA",
        categoria:"OBJETOS"
    },
    palavra028 = {
        nome: "BOCAL",
        categoria:"OBJETOS"
    },
    palavra029 = {
        nome: "CORTINA",
        categoria:"OBJETOS"
    },
    palavra030 = {
        nome: "LAPIS",
        categoria:"OBJETOS"
    },
    palavra031 = {
        nome: "MELANCIA",
        categoria:"ALIMENTOS"
    },
    palavra032 = {
        nome: "AMENDOIM",
        categoria:"ALIMENTOS"
    },
    palavra033 = {
        nome: "ESFIRRA",
        categoria:"ALIMENTOS"
    },
    palavra034 = {
        nome: "GOROROBA",
        categoria:"ALIMENTOS"
    },
    palavra035 = {
        nome: "JANTAR",
        categoria:"ALIMENTOS"
    },
    palavra036 = {
        nome: "SABOROSO",
        categoria:"ALIMENTOS"
    },
    palavra037 = {
        nome: "DESJEJUM",
        categoria:"ALIMENTOS"
    },
    palavra038 = {
        nome: "MASTIGAR",
        categoria:"ALIMENTOS"
    },
    palavra039 = {
        nome: "ENGOLIR",
        categoria:"ALIMENTOS"
    },
    palavra040 = {
        nome: "DOCERIA",
        categoria:"ALIMENTOS"
    },
    palavra040 = {
        nome: "DRAGAO",
        categoria:"ANIMAIS"
    },
    palavra041 = {
        nome: "GALINHA",
        categoria:"ANIMAIS"
    },
    palavra042 = {
        nome: "PAVAO",
        categoria:"ANIMAIS"
    },
    palavra043 = {
        nome: "CAMELO",
        categoria:"ANIMAIS"
    },
    palavra044 = {
        nome: "PERU",
        categoria:"ANIMAIS"
    },
    palavra045 = {
        nome: "ZEBRA",
        categoria:"ANIMAIS"
    },
    palavra046 = {
        nome: "DROMEDARIO",
        categoria:"ANIMAIS"
    },
    palavra047 = {
        nome: "CALANGO",
        categoria:"ANIMAIS"
    },
    palavra048 = {
        nome: "SAGUI",
        categoria:"ANIMAIS"
    },
    palavra049 = {
        nome: "LAGARTIXA",
        categoria:"ANIMAIS"
    },
    palavra050 = {
        nome: "HIPOPOTAMO",
        categoria:"ANIMAIS"
    },
    palavra051 = {
        nome: "A ERA DO GELO",
        categoria:"TV E CINEMA"
    },
    palavra052 = {
        nome: "HOMEM ARANHA",
        categoria:"TV E CINEMA"
    },
    palavra053 = {
        nome: "CASA MONSTRO",
        categoria:"TV E CINEMA"
    },
    palavra054 = {
        nome: "TELA QUENTE",
        categoria:"TV E CINEMA"
    },
    palavra055 = {
        nome: "STRANGER THINGS",
        categoria:"TV E CINEMA"
    },
    palavra056 = {
        nome: "O REI DO GADO",
        categoria:"TV E CINEMA"
    },
    palavra057 = {
        nome: "MULHER MARAVILHA",
        categoria:"TV E CINEMA"
    },
    palavra058 = {
        nome: "O INCRIVEL HULK",
        categoria:"TV E CINEMA"
    },
    palavra059 = {
        nome: "BOB ESPONJA",
        categoria:"TV E CINEMA"
    },
    palavra060 = {
        nome: "PANICO NA TV",
        categoria:"TV E CINEMA"
    }
]

};


function  adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase(); //pega o valor do input e coloca em maiusculo
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (inNullOrWhiteSpace(addPalavra) || inNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria < 3) { //verifica se o input esta vazio ou com espacos em branco
        abrirModal("Atenção!", "Preencha todos os campos!");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
        }
        palavras.push(palavra); //adiciona a palavra no array de palavras   
        sortear();
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = "";
    }

function inNullOrWhiteSpace(input) {
    return !input || !input.trim(); // verifica se o input esta vazio ou com espacos em branco
}

function sortear(){
     if(jogoautomatico == true){
        location.reload(); //   recarrega a pagina
     } else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta(); // cria a palavra secreta
            MontarPalavraNaTela(); // monta a palavra na tela
            resetaTeclas(); // reseta as teclas
            tentativas=6 ;  // reseta as tentativas
            piscarBotaoJogarNovamente(); // pisca o botao jogar novamente
        }
     }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button");
    teclas.forEach(tecla => {
        tecla.style.backgroundColor = "#201b2c";
        tecla.style.color = "#00ff88";
        tecla.disabled = false;
    });
}

function piscarBotaoJogarNovamente(querJogar){
    let botaoJogarNovamente = document.getElementById("jogarNovamente");
    if(querJogar){ // não precisa adicioanr o true

        botaoJogarNovamente.style.display = "block";
      
    } else{
        let botaoJogarNovamente = document.getElementById("jogarNovamente");
        botaoJogarNovamente.style.display = "block";
    }
}


