class Materia {
    constructor(nome, isObrigatoria) {
        this.Nome = nome;
        this.IsObrigatoria = isObrigatoria;
        this.NotasPrimeiroTrimestre = new Array();
        this.NotasSegundoTrimestre = new Array();
        this.NotasTerceiroTrimestre = new Array();
        this.GetNotasLength = function () { return Math.max(this.NotasPrimeiroTrimestre.length, this.NotasSegundoTrimestre.length, this.NotasTerceiroTrimestre.length) };
    }
    CalcularMediaPrimeiroTrimestre() {
        if (this.NotasPrimeiroTrimestre.length > 0)
            return this.NotasPrimeiroTrimestre.reduce((n1, n2) => n1 + n2) / this.NotasPrimeiroTrimestre.length;
        return 0;
    }
    CalcularMediaSegundoTrimestre() {
        if (this.NotasSegundoTrimestre.length > 0)
            return this.NotasSegundoTrimestre.reduce((n1, n2) => n1 + n2) / this.NotasSegundoTrimestre.length;
        return 0;
    }
    CalcularMediaTerceiroTrimestre() {
        if (this.NotasTerceiroTrimestre.length > 0)
            return this.NotasTerceiroTrimestre.reduce((n1, n2) => n1 + n2) / this.NotasTerceiroTrimestre.length;
        return 0;
    }
}
class Aluno {
    constructor(nome, data, serie) {
        this.Nome = nome;
        this.Data = data;
        this.Serie = serie;
        this.Materias = new Array();
    }

    CalcularIdade() {
        return parseInt((Math.abs(new Date() - this.Data) / (1000 * 3600 * 24)) / 365);
    }
}


const escola = {
    Alunos: new Array(),
    AlunoCadastrandoNotas: null,
    AlunoEditandoInformacoes: null,
    CalcularMediaGeralPrimeiroTrimestre: (materia, serie) => {
        const alunos = escola.Alunos
            .filter(aluno => aluno.Serie == serie && aluno.Materias.some(materiaAluno => materiaAluno.Nome == materia));
        if (alunos.length > 0) {
            const notas =
                alunos.map(aluno => aluno.Materias.filter(materiaAluno => materiaAluno.Nome == materia)[0].CalcularMediaPrimeiroTrimestre());
            let somatoriaNotas = notas.reduce((nota1, nota2) => nota1 + nota2);
            return somatoriaNotas / notas.length;
        }
        return 0;
    },
    CalcularMediaGeralSegundoTrimestre: (materia, serie) => {
        const alunos = escola.Alunos
            .filter(aluno => aluno.Serie == serie && aluno.Materias.some(materiaAluno => materiaAluno.Nome == materia));
        if (alunos.length > 0) {
            const notas =
                alunos.map(aluno => aluno.Materias.filter(materiaAluno => materiaAluno.Nome == materia)[0].CalcularMediaSegundoTrimestre());
            let somatoriaNotas = notas.reduce((nota1, nota2) => nota1 + nota2);
            return somatoriaNotas / notas.length;
        }
        return 0;
    },
    CalcularMediaGeralTerceiroTrimestre: (materia, serie) => {
        const alunos = escola.Alunos
            .filter(aluno => aluno.Serie == serie && aluno.Materias.some(materiaAluno => materiaAluno.Nome == materia));
        if (alunos.length > 0) {
            const notas =
                alunos.map(aluno => aluno.Materias.filter(materiaAluno => materiaAluno.Nome == materia)[0].CalcularMediaTerceiroTrimestre());
            let somatoriaNotas = notas.reduce((nota1, nota2) => nota1 + nota2);
            return somatoriaNotas / notas.length;
        }
        return 0;
    }
};


const canvas = document.getElementById("canvasNotas");
canvas.width = (this.outerWidth / 100) * 57.29166666666667;
canvas.height = (this.outerHeight / 100) * 60, 18518518518519;
let timeout;
this.addEventListener("resize", () => {
    clearTimeout(timeout);
    canvas.width = (this.outerWidth / 100) * 57.29166666666667;
    canvas.height = (this.outerHeight / 100) * 60, 18518518518519;
    ConstruirLinhasIniciaisGraficoComparacaoNotas();
    timeout = setTimeout(() => { GerarGraficosComparaçõesNotas() }, 300);
});
const tituloPrincipal = document.getElementById("tituloPrincipal");
const tituloAlunoEdicao = document.getElementById("tituloAlunoEdicao");
const divBtnPararEdicao = document.getElementById("divBtnPararEdicao");
const imagemAlunoEdicaoDefault = document.getElementById("imagemFecharEdicaoPadrao");
const imagemAlunoEdicaoHover = document.getElementById("imagemFecharEdicaoHover");


divBtnPararEdicao.addEventListener("mouseover", () => {
    imagemAlunoEdicaoHover.style.opacity = "1";
});
divBtnPararEdicao.addEventListener("mouseout", () => {
    imagemAlunoEdicaoHover.style.opacity = "0";
});

function FinalizarEdicaoAluno() {
    divBtnPararEdicao.style.visibility = "hidden";
    imagemAlunoEdicaoDefault.src = "./imagens/imagem-fechar.svg";
    tituloAlunoEdicao.style.display = "none";
    botaoFinalizarCadastroAlunos.value = "Adicionar Aluno";
    caixaTextoNome.value = "";
    caixaData.value = "";
    caixaTextoSerie.value = "";
    botaoFinalizarCadastroAlunos.style.backgroundColor = "#D16458";
}

divBtnPararEdicao.addEventListener("click", () => {
    const resposta = confirm("Você realmente deseja cancelar a edição deste aluno?");
    if (resposta)
        FinalizarEdicaoAluno();
});

const tabelaAlunos = document.getElementById("tabelaAlunos");
const botaoFinalizarCadastroAlunos = document.getElementById("inputFinalizarCadastro");

const caixaTextoNome = document.getElementById("inputNomeAluno");
const caixaData = document.getElementById("inputIdadeAluno");
const caixaTextoSerie = document.getElementById("inputSerieAluno");

const areaCadastroAlunos = document.getElementById("areaCadastro");
const areaCadastroNotas = document.getElementById("areaCadastroNotas");

const caixaEscolhaTrimestre = document.getElementById("selectTrimestreNota");
const caixaNota = document.getElementById("inputNota");
const botaoFinalizarCadastroNotas = document.getElementById("inputFinalizarCadastroNotas");
const tituloAlunoCadastroNota = document.getElementById("tituloAlunoAtualCadastroNota");
const tabelaNotas = document.getElementById("tabelaNotas");
const caixaEscolhaMateria = document.getElementById("selectMateriaNota");

function AlterarCorAoPassarMouseSobreElemento(elemento) {
    elemento.style.opacity = "0.7";
}
function AlterarCorQuandoMouseSairDoElemento(elemento) {
    elemento.style.opacity = "1";
}
function IniciarCadastroAlunos() {
    areaCadastroAlunos.style.display = "block";
    areaCadastroNotas.style.display = "none";
    escola.AlunoCadastrandoNotas = null;
}
function AtualizarTabelaAlunos() {
    ResetarListaAlunos();
    for (let c in escola.Alunos) {
        const aluno = escola.Alunos[c];
        const linhaAluno = tabelaAlunos.insertRow();
        linhaAluno.style.cursor = "pointer";
        linhaAluno.className = "animatedOpacityHover tableLine";

        const cellNome = linhaAluno.insertCell();
        const cellIdade = linhaAluno.insertCell();
        const cellSerie = linhaAluno.insertCell();
        const adicionarNotaBtn = linhaAluno.insertCell();
        const adicionarNotaBtnDiv = document.createElement("div");
        const adicionarNotaBtnImg1 = document.createElement("img");
        const adicionarNotaBtnImg2 = document.createElement("img");
        const editarAlunoBtn = linhaAluno.insertCell();
        const editarAlunoBtnDiv = document.createElement("div");
        const editarAlunoBtnImg1 = document.createElement("img");
        const editarAlunoBtnImg2 = document.createElement("img");
        const removeBtn = linhaAluno.insertCell();
        const removeBtnDiv = document.createElement("div");
        const removeBtnImg1 = document.createElement("img");
        const removeBtnImg2 = document.createElement("img");

        adicionarNotaBtnDiv.className = "tableFloatItem";
        adicionarNotaBtnImg1.src = "./imagens/imagem-adicionar-notas.svg";
        adicionarNotaBtnImg2.src = "./imagens/imagem-adicionar-notas-vermelho.svg";
        adicionarNotaBtnImg2.className = "backgroundImgTableButton";
        adicionarNotaBtnDiv.appendChild(adicionarNotaBtnImg2);
        adicionarNotaBtnDiv.appendChild(adicionarNotaBtnImg1);

        adicionarNotaBtn.appendChild(adicionarNotaBtnDiv);
        removeBtnDiv.className = "tableFloatItem";
        removeBtnImg1.src = "./imagens/imagem-lixeira.svg";
        removeBtnImg2.src = "./imagens/imagem-lixeira-vermelha.svg";
        removeBtnImg2.className = "backgroundImgTableButton";
        removeBtnDiv.appendChild(removeBtnImg2);
        removeBtnDiv.appendChild(removeBtnImg1);
        removeBtn.appendChild(removeBtnDiv);
        editarAlunoBtnDiv.className = "tableFloatItem";
        editarAlunoBtnImg1.src = "./imagens/imagem-editar.svg";
        editarAlunoBtnImg2.src = "./imagens/imagem-editar-vermelha.svg";
        editarAlunoBtnImg2.className = "backgroundImgTableButton";
        editarAlunoBtnDiv.appendChild(editarAlunoBtnImg2);
        editarAlunoBtnDiv.appendChild(editarAlunoBtnImg1);
        editarAlunoBtn.appendChild(editarAlunoBtnDiv);
        adicionarNotaBtn.style.visibility = "hidden";
        editarAlunoBtn.style.visibility = "hidden";
        removeBtn.style.visibility = "hidden";
        removeBtn.addEventListener("mouseenter", () => {
            removeBtnImg2.style.opacity = "1";
        });
        removeBtn.addEventListener("mouseleave", () => {
            removeBtnImg2.style.opacity = "0";
        });
        adicionarNotaBtn.addEventListener("mouseenter", () => {
            adicionarNotaBtnImg2.style.opacity = "1";
        });
        adicionarNotaBtn.addEventListener("mouseleave", () => {
            adicionarNotaBtnImg2.style.opacity = "0";
        });
        editarAlunoBtn.addEventListener("mouseenter", () => {
            editarAlunoBtnImg2.style.opacity = "1";
        });
        editarAlunoBtn.addEventListener("mouseleave", () => {
            editarAlunoBtnImg2.style.opacity = "0";
        });
        removeBtn.addEventListener("click", () => {
            const resultado = confirm(`Você realmente deseja remover o aluno: ${escola.Alunos[c].Nome}`);
            if (resultado) {
                escola.Alunos.splice(c, 1);
                AtualizarTabelaAlunos();
            }

        });
        adicionarNotaBtn.addEventListener("click", () => {
            areaCadastroNotas.style.display = "block";
            areaCadastroAlunos.style.display = "none";
            tituloAlunoCadastroNota.innerText = aluno.Nome;
            escola.AlunoCadastrandoNotas = escola.Alunos[c];
            AtualizarTabelaNotasAlunoAtual();
            GerarGraficosComparaçõesNotas();
            canvas.scrollIntoView();
        });
        editarAlunoBtn.addEventListener("click", () => {
            areaCadastroNotas.style.display = "none";
            areaCadastroAlunos.style.display = "block";
            tituloAlunoEdicao.innerText = aluno.Nome;
            tituloAlunoEdicao.style.display = "block";
            divBtnPararEdicao.style.visibility = "visible";
            escola.AlunoEditandoInformacoes = escola.Alunos[c];
            botaoFinalizarCadastroAlunos.value = "Concluir Edição";
            botaoFinalizarCadastroAlunos.style.backgroundColor = "rgba(93,242,5,1)";
            caixaTextoNome.value = escola.AlunoEditandoInformacoes.Nome;
            const ano = escola.AlunoEditandoInformacoes.Data.getUTCFullYear();
            const mes = escola.AlunoEditandoInformacoes.Data.getUTCMonth() + 1;
            const dia = escola.AlunoEditandoInformacoes.Data.getUTCDate();
            caixaData.value = `${ano}-${mes.toString().length == 1 ? '0' + mes : mes}-${dia.toString().length == 1 ? '0' + dia : dia}`;
            caixaTextoSerie.value = escola.AlunoEditandoInformacoes.Serie;
        });
        linhaAluno.addEventListener("mouseenter", () => {
            AlterarCorAoPassarMouseSobreElemento(linhaAluno);
            removeBtn.style.visibility = "visible";
            adicionarNotaBtn.style.visibility = "visible";
            editarAlunoBtn.style.visibility = "visible";
            adicionarNotaBtn.style.animation = "tableFloatButtonsAppear 0.2s";
            editarAlunoBtn.style.animation = "tableFloatButtonsAppear 0.23s";
            removeBtn.style.animation = "tableFloatButtonsAppear 0.25s";
        });
        linhaAluno.addEventListener("mouseleave", () => {
            AlterarCorQuandoMouseSairDoElemento(linhaAluno);
            removeBtn.style.visibility = "hidden";
            adicionarNotaBtn.style.visibility = "hidden";
            editarAlunoBtn.style.visibility = "hidden";
            adicionarNotaBtn.style.animation = "";
            editarAlunoBtn.style.animation = "";
            removeBtn.style.animation = "";
        });
        cellNome.innerHTML = '<div class="itemTabela itemTabelaSemBordaDireita itemTabelaSemBordaCima">' + aluno.Nome + "</div>";
        cellIdade.innerHTML = '<div class="itemTabela itemTabelaSemBordaDireita itemTabelaSemBordaCima">' + aluno.CalcularIdade().toString() + "</div>";
        cellSerie.innerHTML = '<div class="itemTabela itemTabelaSemBordaCima">' + aluno.Serie.toString() + "°</div>";
    }
}


function AtualizarTabelaNotas(materia) {
    ResetarListaNotas();
    const maiorNumeroNotas = materia.GetNotasLength();
    for (let c = 0; c < maiorNumeroNotas; c++) {
        const linhaNota = tabelaNotas.insertRow();
        const cellNotaPrimeiroTrimestre = linhaNota.insertCell();
        const cellNotaSegundoTrimestre = linhaNota.insertCell();
        const cellNotaTerceiroTrimestre = linhaNota.insertCell();

        const valorPrimeiroTrimestre = materia.NotasPrimeiroTrimestre.length - 1 >= c ? materia.NotasPrimeiroTrimestre[c] : " ";
        const valorSegundoTrimestre = materia.NotasSegundoTrimestre.length - 1 >= c ? materia.NotasSegundoTrimestre[c] : " ";
        const valorTerceiroTrimestre = materia.NotasTerceiroTrimestre.length - 1 >= c ? materia.NotasTerceiroTrimestre[c] : " ";

        cellNotaPrimeiroTrimestre.innerHTML = '<div class="itemTabela itemTabelaSemBordaDireita itemTabelaSemBordaCima">' + valorPrimeiroTrimestre + "</div>";
        cellNotaSegundoTrimestre.innerHTML = '<div class="itemTabela itemTabelaSemBordaDireita itemTabelaSemBordaCima">' + valorSegundoTrimestre + "</div>";
        cellNotaTerceiroTrimestre.innerHTML = '<div class="itemTabela itemTabelaSemBordaCima">' + valorTerceiroTrimestre + "</div>";
    }
    if (maiorNumeroNotas > 0) {
        const linhaMedia = tabelaNotas.insertRow();
        const cellMediaPrimeiroTrimestre = linhaMedia.insertCell();
        const cellMediaSegundoTrimestre = linhaMedia.insertCell();
        const cellMediaTerceiroTrimestre = linhaMedia.insertCell();

        const mediaPrimeiroTrimestre = materia.CalcularMediaPrimeiroTrimestre();
        const mediaSegundoTrimestre = materia.CalcularMediaSegundoTrimestre();
        const mediaTerceiroTrimestre = materia.CalcularMediaTerceiroTrimestre();

        cellMediaPrimeiroTrimestre.innerHTML = '<div class="itemTabela itemTabelaSemBordaDireita itemTabelaSemBordaCima tableAvarageItem">' + mediaPrimeiroTrimestre.toFixed(2) + "</div>";
        cellMediaSegundoTrimestre.innerHTML = '<div class="itemTabela itemTabelaSemBordaDireita itemTabelaSemBordaCima tableAvarageItem">' + mediaSegundoTrimestre.toFixed(2) + "</div>";
        cellMediaTerceiroTrimestre.innerHTML = '<div class="itemTabela itemTabelaSemBordaCima tableAvarageItem">' + mediaTerceiroTrimestre.toFixed(2) + "</div>";

    }

}

window.addEventListener("beforeunload", () => { localStorage.setItem("alunos", JSON.stringify(escola.Alunos)) });
const alunosJSON = localStorage.getItem("alunos");
if (alunosJSON != null) {
    const objeto = JSON.parse(alunosJSON);
    objeto.forEach((elemento) => {
        const data = new Date(elemento.Data);
        elemento.Data = data;
        const aluno = new Aluno(elemento.Nome, elemento.Data, elemento.Serie);
        elemento.Materias.forEach((elementoMateria => {
            const materia = new Materia(elementoMateria.Nome, elementoMateria.IsObrigatoria);
            materia.NotasPrimeiroTrimestre = elementoMateria.NotasPrimeiroTrimestre;
            materia.NotasSegundoTrimestre = elementoMateria.NotasSegundoTrimestre;
            materia.NotasTerceiroTrimestre = elementoMateria.NotasTerceiroTrimestre;
            aluno.Materias.push(materia);
        }));

        escola.Alunos.push(aluno);
    });
}
function VerificarPosicaoCentralTabela() {
    if (escola.Alunos.length > 0)
        tabelaAlunos.style.transform = "translate(60px)";
}
VerificarPosicaoCentralTabela();

AtualizarTabelaAlunos();

function AnalisarDadosCadastroAlunos() {
    if (caixaTextoNome.value != "" && caixaData.value != "" && caixaTextoSerie.value != "") {
        botaoFinalizarCadastroAlunos.style.backgroundColor = "rgba(93,242,5,1)";
        return true;
    }
    else {
        botaoFinalizarCadastroAlunos.style.backgroundColor = "rgba(209,100,88,1)";
        return false;
    }
}

function AnalisarDadosCadastroNotas() {
    if (caixaEscolhaTrimestre.value != "" && caixaNota.value != "" && caixaNota.value <= 10 && caixaNota.value >= 0) {
        botaoFinalizarCadastroNotas.style.backgroundColor = "rgba(93,242,5,1)";
        return true;
    }
    else {
        botaoFinalizarCadastroNotas.style.backgroundColor = "rgba(209,100,88,1)";
        return false;
    }
}

function AdicionarAluno() {
    if (AnalisarDadosCadastroAlunos()) {
        if (escola.AlunoEditandoInformacoes == null) {
            escola.Alunos.push(new Aluno(caixaTextoNome.value, new Date(caixaData.value), caixaTextoSerie.value));
            alert("Aluno adicionado ao banco de dados!");
            caixaTextoNome.value = "";
            caixaData.value = "";
            caixaTextoSerie.value = "";
            botaoFinalizarCadastroAlunos.style.backgroundColor = "#D16458";
            AtualizarTabelaAlunos();
        }
        else {

            escola.AlunoEditandoInformacoes.Nome = caixaTextoNome.value;
            escola.AlunoEditandoInformacoes.Data = new Date(caixaData.value);
            escola.AlunoEditandoInformacoes.Serie = caixaTextoSerie.value;
            alert("Edição concluida com sucesso!");
            botaoFinalizarCadastroAlunos.value = "Adicionar Aluno";
            FinalizarEdicaoAluno();
            AtualizarTabelaAlunos();
        }
    }
    else
        alert("Os campos não estão devidamente prenchidos");
}




function AdicionarNota() {
    if (escola.AlunoCadastrandoNotas != null && AnalisarDadosCadastroNotas()) {
        const nomeMateria = caixaEscolhaMateria.value;
        const trimestre = caixaEscolhaTrimestre.value;
        const nota = parseFloat(caixaNota.value);
        let materia = escola.AlunoCadastrandoNotas.Materias.filter(materia => materia.Nome == nomeMateria)[0];
        if (materia == undefined) {
            materia = new Materia(nomeMateria, false);
            escola.AlunoCadastrandoNotas.Materias.push(materia);
        }
        materia[trimestre].push(nota);
        caixaNota.value = "";
        AtualizarTabelaNotas(materia);
        ConstruirLinhasIniciaisGraficoComparacaoNotas();
        const funcao = function () {
            var position = canvas.getBoundingClientRect();

            // checking whether fully visible
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                GerarGraficosComparaçõesNotas();
                window.removeEventListener("scroll", funcao);
            }

        };
        window.addEventListener('scroll', funcao);
        VerificarPosicaoCentralTabela();

    }
    else
        alert("Os campos não estão devidamente prenchidos");
}



function ResetarListaAlunos() {
    while (tabelaAlunos.rows.length > 1) {
        tabelaAlunos.deleteRow(1);
    }
}

function ResetarListaNotas() {
    while (tabelaNotas.rows.length > 1) {
        tabelaNotas.deleteRow(1);
    }
}



function GerarGraficosComparaçõesNotas() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const materia = escola.AlunoCadastrandoNotas.Materias.filter((materia) => materia.Nome == caixaEscolhaMateria.value)[0];

    const multiplicadorValor = ((canvas.height / 100) * 75.38461538461538) / 10;

    const valor2 = escola.CalcularMediaGeralPrimeiroTrimestre(caixaEscolhaMateria.value, escola.AlunoCadastrandoNotas.Serie) * multiplicadorValor;
    const valor4 = escola.CalcularMediaGeralSegundoTrimestre(caixaEscolhaMateria.value, escola.AlunoCadastrandoNotas.Serie) * multiplicadorValor;
    const valor6 = escola.CalcularMediaGeralTerceiroTrimestre(caixaEscolhaMateria.value, escola.AlunoCadastrandoNotas.Serie) * multiplicadorValor;



    let valor1;
    let valor3;
    let valor5;
    if (materia !== undefined) {
        valor1 = materia.CalcularMediaPrimeiroTrimestre() * multiplicadorValor;
        valor3 = materia.CalcularMediaSegundoTrimestre() * multiplicadorValor;
        valor5 = materia.CalcularMediaTerceiroTrimestre() * multiplicadorValor;
    }
    else {
        valor1 = 0;
        valor3 = 0;
        valor5 = 0;
    }
    let valor1Atual = 0;
    let valor2Atual = 0;
    let valor3Atual = 0;
    let valor4Atual = 0;
    let valor5Atual = 0;
    let valor6Atual = 0;

    const aumentoProporcionalValor1 = valor1 / 30;
    const aumentoProporcionalValor2 = valor2 / 30;
    const aumentoProporcionalValor3 = valor3 / 30;
    const aumentoProporcionalValor4 = valor4 / 30;
    const aumentoProporcionalValor5 = valor5 / 30;
    const aumentoProporcionalValor6 = valor6 / 30;

    let contador = 0;
    const largura = (canvas.width / 100) * 8.18;

    const interval = setInterval(() => {

        ConstruirLinhasIniciaisGraficoComparacaoNotas();
        ctx.beginPath();
        ctx.rect((canvas.width / 100) * 10.91, canvas.height - (valor1Atual), largura, valor1Atual);
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "black";
        ctx.lineWidth = "8";
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(((canvas.width / 100) * 20.91) + 10, canvas.height - (valor2Atual), largura, valor2Atual);
        ctx.fillStyle = "red";
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(((canvas.width / 100) * 40) + 5, canvas.height - (valor3Atual), largura, valor3Atual);
        ctx.fillStyle = "blue";
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(((canvas.width / 100) * 50) + 15, canvas.height - (valor4Atual), largura, valor4Atual);
        ctx.fillStyle = "red";
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(((canvas.width / 100) * 69.1) + 15, canvas.height - (valor5Atual), largura, valor5Atual);
        ctx.fillStyle = "blue";
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.rect(((canvas.width / 100) * 79.1) + 25, canvas.height - (valor6Atual), largura, valor6Atual);
        ctx.fillStyle = "red";
        ctx.stroke();
        ctx.fill();



        valor1Atual += aumentoProporcionalValor1;
        valor2Atual += aumentoProporcionalValor2;
        valor3Atual += aumentoProporcionalValor3;
        valor4Atual += aumentoProporcionalValor4;
        valor5Atual += aumentoProporcionalValor5;
        valor6Atual += aumentoProporcionalValor6;
        contador++;
        if (contador > 30) {
            clearInterval(interval);
        }
    }, 16.5);
}

function ConstruirLinhasIniciaisGraficoComparacaoNotas() {
    const ctx = canvas.getContext("2d");
    const alturaRelativa = (canvas.height / 100 * 75.84);
    const alturaRelativa2Dividido10 = (canvas.height / 100 * 76.923) / 10;
    const alturaRelativaDividido10 = alturaRelativa / 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.moveTo(20, canvas.height - 2.3);
    ctx.lineTo(20, canvas.height - alturaRelativa);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 1);
    ctx.lineTo(canvas.width, canvas.height - 2);
    ctx.lineWidth = "2";
    ctx.stroke();

    ctx.beginPath();
    ctx.font = "18px spotify-circular";
    ctx.fillStyle = "black";
    ctx.fillText(" 0", 0, canvas.height - 2.8);

    for (let c = 1; c <= 10; c++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - (alturaRelativaDividido10 * c));
        ctx.lineTo(canvas.width, canvas.height - (alturaRelativaDividido10 * c));
        ctx.stroke();
        ctx.beginPath();
        ctx.font = "18px spotify-circular";
        ctx.fillStyle = "black";
        if (c != 10)
            ctx.fillText(" " + c, 0, canvas.height - (alturaRelativa2Dividido10 * c));
        else
            ctx.fillText(c, 0, canvas.height - (alturaRelativa2Dividido10 * c));


    }
    let valorAlturaQuadradoTexto = 0;
    if (outerHeight <= 540)
        valorAlturaQuadradoTexto = 25;

    ctx.beginPath();
    ctx.rect((canvas.width / 2) - 25, 30 - valorAlturaQuadradoTexto, 30, 30);
    ctx.fillStyle = "blue";
    ctx.lineWidth = "3";
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    ctx.rect((canvas.width / 2) + 25, 30 - valorAlturaQuadradoTexto, 30, 30);
    ctx.fillStyle = "red";
    ctx.lineWidth = "3";
    ctx.fill();
    ctx.stroke();

    let posXQuadrado1 = (canvas.width / 2) - 170;
    let posXQuadrado2 = (canvas.width / 2) + 75;
    let posYQuadrado = 50;
    let fontSize = "18px";

    if (outerWidth <= 776) {
        fontSize = "16px";
        posXQuadrado1 += 65;
        posXQuadrado2 -= 55;
        posYQuadrado += 40;
    }

    ctx.beginPath();
    ctx.font = `${fontSize} spotify-circular`;
    ctx.fillStyle = "black";
    ctx.fillText("Média do Aluno", posXQuadrado1, posYQuadrado - valorAlturaQuadradoTexto);

    ctx.beginPath();
    ctx.font = `${fontSize} spotify-circular`;
    ctx.fillStyle = "black";
    ctx.fillText("Média da Classe", posXQuadrado2, posYQuadrado - valorAlturaQuadradoTexto);
}

function AtualizarTabelaNotasAlunoAtual() {
    ResetarListaNotas();
    ConstruirLinhasIniciaisGraficoComparacaoNotas();
    const funcao = function () {
        var position = canvas.getBoundingClientRect();
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            GerarGraficosComparaçõesNotas();
            window.removeEventListener("scroll", funcao);
        }

    };
    window.addEventListener('scroll', funcao);
    const materiaSelecionada = escola.AlunoCadastrandoNotas.Materias.filter(materia => materia.Nome == caixaEscolhaMateria.value)[0];
    if (materiaSelecionada != undefined) {
        AtualizarTabelaNotas(materiaSelecionada);
    }
}
