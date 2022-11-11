const spanTituloPrincipal = document.getElementById("span-titulo-principal");
const botaoComecar = document.getElementById("botao-comecar");
const mapaCerrado = document.getElementById("mapa-cerrado");
const avisoPrincipal = document.getElementById("aviso-principal");
const mapaDiv = document.getElementById("div-mapa");
const tituloPergunta = document.getElementById("titulo-pergunta");
const containerRespostas = document.getElementById("container-respostas");
const imagemPergunta = document.getElementById("imagem-pergunta");
const containerAreaResposta = document.getElementById("container-area-resposta");
const termometro = document.getElementById("termometro");
const neve = document.getElementById("neve");
const sol = document.getElementById("sol");
const tituloTermometro = document.getElementById("titulo-termometro");
const tituloNeve = document.getElementById("titulo-neve");
const tituloSol = document.getElementById("titulo-sol");
const barraMenor = document.getElementById("barra_menor");
const divPerguntaTemperatura = document.getElementById("div-pergunta-temperatura");
const divResultado = document.getElementById("div-resultado");
const tituloResultado = document.getElementById("titulo-resultado");
const botaoResultado = document.getElementById("botao-resultado");

class Pergunta {
    constructor(titulo, respostas) {
        this.titulo = titulo;
        this.respostas = respostas;
    }
}

class Resposta {
    constructor(titulo, isCorreta = false, isImagem = false) {
        this.titulo = titulo;
        this.isCorreta = isCorreta;
        this.isImagem = isImagem;
    }
}




let pontuacaoAtual = 0;
let indexAtualPergunta = 0;

const perguntas = [
    new Pergunta("Quais Estados abaixo têm boa parte do território composta pelo bioma Cerrado", [
        new Resposta("Rio Grande do Sul, Minas Gerais, São Paulo e Amazonas"),
        new Resposta("Piauí, São Paulo, Rio Grande do Sul e Amazonas"),
        new Resposta("Goiás, Tocantins, Rio Grande do Norte, Roraima"),
        new Resposta("Goiás, Tocantins, Maranhão, Piauí, Bahia, Mato Grosso, Mato Grosso do Sul, Minas Gerais e Distrito Federal", true)
    ]),
    new Pergunta("Defina a vegetação típica do Cerrado com base na imagem apresentada", [
        new Resposta("Vegetação densa, formada por árvores de grande porte. Tem como uma de suas árvores típicas o açaí"),
        new Resposta("Plantas xerófitas, árvores baixas. Vegetação pouco densa e com pouca biodiversidade"),
        new Resposta("Árvores com troncos tortuosos, arbustos e gramíneas. É conhecido como a savana com maior biodiversidade do mundo", true),
        new Resposta("Biodiversidade rica, grandes árvores. Uma das árvores típicas é a Jabuticabeira")
    ]),
    new Pergunta("Defina a fauna típica do Cerrado com base na imagem apresentada", [
        new Resposta("Fauna extremamente diversa e composta em grande parte de mamíferos e aves. O animal típico é o Lobo Guará", true),
        new Resposta("Fauna com grande variedade de animais, onde os mais lembrados são a Capivara, a Onça-Pintada e os Macacos"),
        new Resposta("Fauna com pouca diversidade, composta em grande parte por mamíferos e tem como animal típico o Lobo Guará"),
        new Resposta("Animais são pouco comuns no bioma pois as longas secas impedem sua proliferação")
    ]),
    new Pergunta("Com base nas informações dadas anteriormente, indique o clima predominante no Cerrado", [
        new Resposta("Clima Mediterrâneo"),
        new Resposta("Clima Tropical Semiúmido", true),
        new Resposta("Clima Temperado"),
        new Resposta("Clima Tropical de Monção")
    ]),
    new Pergunta("Selecione a atividade econômica mais importante do Cerrado", [
        new Resposta("./agricultura-min.png", true, true),
        new Resposta("./hidreletrica-min.jpg", false, true),
        new Resposta("./industria-min.png", false, true),
        new Resposta("./turismo-min.png", false, true)
    ]),
    new Pergunta("Qual a situação atual de preservação ambiental do bioma Cerrado", [
        new Resposta("Extremamente preservado com mais de 90% das áreas sobre proteção"),
        new Resposta("Mais ou menos preservado com menos de 48,7%"),
        new Resposta("Pouquíssimo preservado com 2,37% de preservação"),
        new Resposta("Situação preocupante, com 8,21% das terras legalmente protegidas por unidades de conservação", true)
    ]),
    new Pergunta("O solo do Cerrado possui uma cor avermelhada característica, indique os motivos de sua aparência", [
        new Resposta("Grande concentração de minerais como a obsidiana que dão um aspecto arroxeado/avermelhado"),
        new Resposta("Clima úmido do local, que favorece a proliferação de Microrganismos"),
        new Resposta("Ausência de nutrientes e grande acidez, além da própria seca do local", true),
        new Resposta("Proliferação de um fungo de cor avermelhada")
    ]),
    new Pergunta("O Cerrado é conhecido mundialmente por um nome distinto que relaciona suas características com outro bioma, indique seu nome", [
        new Resposta("Savana Brasileira", true),
        new Resposta("Planalto Central"),
        new Resposta("Floresta Rasteira"),
        new Resposta("Bosque do Guará")
    ]),
    new Pergunta("O Cerrado é um dos biomas mais antigos do Brasil", [
        new Resposta("Verdadeiro", true),
        new Resposta("Falso")
    ]),
    new Pergunta("O Cerrado é considerado o \"Berço das águas\" ao abrigar as nascentes de importantes bacias hidrográficas, são elas:", [
        new Resposta("Bacia Amazônica, Rio Tocantins-Araguaia, Atlântico Nordeste Oriental, do Parnaíba, do São Francisco, Atlântico Leste, do Paraná e do Paraguai", true),
        new Resposta("Bacia do Uruguai, Atlântico Sul, Atlântico Sudeste e da Amazônia"),
        new Resposta("Bacia Amazônica, do Uruguai, Atlântico Nordeste Oriental e Atlântico Sul"),
        new Resposta("Apenas Bacia Amazônica e do Parnaíba")
    ])

];

function exibirPergunta() {
    const pergunta = perguntas[indexAtualPergunta];

    tituloPergunta.innerHTML = pergunta.titulo.replace("Cerrado", `<strong style="font-family:'Poor Story', cursive;font-size: 4.16vw;">Cerrado</strong>`);
    containerRespostas.innerHTML = "";
    let botaoCorretoIndex = pergunta.respostas.indexOf(pergunta.respostas.filter(resposta => resposta.isCorreta)[0]);
    for (let resposta of pergunta.respostas) {
        let button;
        if (resposta.isImagem) {
            button = document.createElement("img");
            button.classList.add("imagem-resposta");
            button.src = resposta.titulo;

        }
        else {
            button = document.createElement("button");
            button.classList.add("resposta-button");
            button.innerHTML = resposta.titulo;
        }
        button.addEventListener("click", () => {
            if (resposta.isCorreta) {
                button.classList.add(resposta.isImagem ? "imagem-resposta-correta" : "resposta-correta-button");
                pontuacaoAtual++;
            }
            else {
                button.classList.add(resposta.isImagem ? "imagem-resposta-errada" : "resposta-errada-button");
                setTimeout(() => {
                    containerRespostas.children[botaoCorretoIndex].classList.add(resposta.isImagem ? "imagem-resposta-correta" : "resposta-correta-button");
                }, 1100);
            }
            for (let actualButton of containerRespostas.children) {
                actualButton.style.pointerEvents = "none";
            }
            indexAtualPergunta++;
            const tempoPadraoProximaQuestao = 7000;
            if (indexAtualPergunta == 1) {
                setTimeout(() => {
                    exibirPaisagemSegundaPergunta();
                }, tempoPadraoProximaQuestao);
            }
            else if (indexAtualPergunta == 3) {
                setTimeout(() => {
                    divPerguntaTemperatura.style.display = "block";
                    tituloPergunta.style.opacity = "0";
                    containerRespostas.style.opacity = "0";
                    setTimeout(() => {
                        termometro.style.opacity = "1";
                        tituloTermometro.style.opacity = "1";
                        setTimeout(() => {
                            animacaoTermometro(180, 0.8, 60, () => {
                                neve.style.opacity = "1";
                                tituloNeve.style.opacity = "1";
                                setTimeout(() => {
                                    animacaoNeve(0, 30, 0.8, 60, () => {
                                        sol.style.opacity = "1";
                                        tituloSol.style.opacity = "1";
                                        setTimeout(() => {
                                            animacaoSol(0, 30, 0.8, 60, () => {
                                                setTimeout(() => {
                                                    divPerguntaTemperatura.style.opacity = "0";
                                                    setTimeout(() => {
                                                        divPerguntaTemperatura.style.display = "none";
                                                        exibirPergunta();
                                                    }, 1700);
                                                }, 2400);
                                            });
                                        }, 1100);
                                    });
                                }, 1100);
                            });
                        }, 1100);
                    }, 600);
                }, tempoPadraoProximaQuestao);

            }
            else if (indexAtualPergunta < perguntas.length) {
                setTimeout(() => {
                    tituloPergunta.style.opacity = "0";
                    containerRespostas.style.opacity = "0";
                    setTimeout(() => {
                        exibirPergunta();
                    }, 1100);
                }, tempoPadraoProximaQuestao);
            }
            else {
                divResultado.style.display = "flex";
                tituloResultado.innerHTML = `Você acertou ${pontuacaoAtual} de ${perguntas.length} (${pontuacaoAtual * 100 / perguntas.length}%)`;
                setTimeout(() => {
                    tituloPergunta.style.opacity = "0";
                    containerRespostas.style.opacity = "0";
                    containerAreaResposta
                    setTimeout(() => {
                        containerAreaResposta.style.display = "none";
                        document.body.style.transitionProperty = "background-color";
                        document.body.style.transitionDuration = "1.3s";
                        document.body.style.backgroundColor = "";
                        setTimeout(() => {
                            tituloResultado.style.opacity = "1";
                            tituloResultado.addEventListener("transitionend", () => {
                                botaoResultado.style.opacity = "1";
                            });
                        }, 1350);

                    }, 1000);
                }, tempoPadraoProximaQuestao);
            }
        });
        containerRespostas.appendChild(button);
    }
    tituloPergunta.style.visibility = "visible";
    setTimeout(() => {
        tituloPergunta.style.opacity = "1";
    }, 100);
    setTimeout(() => {
        containerRespostas.style.visibility = "visible";
        containerRespostas.style.opacity = "1";
    }, 2500);

}

function pularParaFinal() {
    indexAtualPergunta = perguntas.length - 1;
    exibirPergunta();
}

function animacaoTermometro(yInicial, duracao, frameRate, callback = () => { }) {
    const frames = frameRate * duracao;
    let yAtual = yInicial;
    const aumentoDoY = (70 - yInicial) / frames;

    const frameTime = 1000 / frameRate;

    let currentFrame = 0;

    const intervalFunction = setInterval(() => {
        yAtual += aumentoDoY;
        barraMenor.setAttribute("y", yAtual);
        currentFrame++;
        if (currentFrame >= frames) {
            clearInterval(intervalFunction);
            if (typeof callback == "function")
                callback();
        }
    }, frameTime);
}

function animacaoNeve(inicial, final, duracao, frameRate, callback = () => { }) {
    const frames = frameRate * duracao;
    let atual = inicial;
    const aumento = (final - inicial) / frames;

    const frameTime = 1000 / frameRate;

    let currentFrame = 0;

    const intervalFunction = setInterval(() => {
        atual += aumento;
        neve.setAttribute("transform", `rotate(${atual})`);
        currentFrame++;
        if (currentFrame >= frames) {
            clearInterval(intervalFunction);
            if (typeof callback == "function")
                callback();
        }
    }, frameTime);
}

function animacaoSol(inicial, final, duracao, frameRate, callback = () => { }) {
    const frames = frameRate * duracao;
    let atual = inicial;
    const aumento = (final - inicial) / frames;

    const frameTime = 1000 / frameRate;

    let currentFrame = 0;

    const intervalFunction = setInterval(() => {
        atual += aumento;
        sol.setAttribute("transform", `rotate(${atual})`);
        currentFrame++;
        if (currentFrame >= frames) {
            clearInterval(intervalFunction);
            if (typeof callback == "function")
                callback();
        }
    }, frameTime);
}

function exibirPaisagemSegundaPergunta() {

    imagemPergunta.style.display = "block";
    imagemPergunta.style.scale = "3.2";
    setTimeout(() => {
        imagemPergunta.style.opacity = 1;
        imagemPergunta.style.width = "100vw";
        imagemPergunta.style.top = "-3.888vh"
        setTimeout(() => {
            containerAreaResposta.style.display = "none";
            imagemPergunta.style.left = "-15.62vw";
            imagemPergunta.style.scale = "2.4";
            setTimeout(() => {
                imagemPergunta.style.left = "37.45vw";
                imagemPergunta.style.scale = "2.1";
                setTimeout(() => {
                    imagemPergunta.style.top = "18.5vh";
                    imagemPergunta.style.left = "15.625vw";
                    setTimeout(() => {
                        imagemPergunta.style.scale = "1.5";
                        setTimeout(() => {
                            imagemPergunta.style.left = "0px";
                            imagemPergunta.style.right = "0px";
                            imagemPergunta.style.bottom = "0px";
                            imagemPergunta.style.top = "10vh";
                            imagemPergunta.style.scale = "1";
                            setTimeout(() => {
                                tituloPergunta.style.opacity = "0";
                                containerRespostas.style.opacity = "0";
                                imagemPergunta.style.opacity = "0";
                                setTimeout(() => {
                                    imagemPergunta.style.display = "none";
                                    containerAreaResposta.style.display = "block";
                                    tituloPergunta.style.visibility = "hidden";
                                    containerRespostas.style.visibility = "hidden";
                                    exibirPergunta();
                                }, 2500);
                            }, 3000);
                        }, 1000);
                    }, 500);
                }, 1800);
            }, 2200);
        }, 400);
    }, 800);
}

let mapaDuringAnimation = false;

const spanTituloPrincipalAnimationEnd = () => {
    botaoComecar.style.opacity = 1;
};

spanTituloPrincipal.addEventListener("animationend", spanTituloPrincipalAnimationEnd);

function mostrarMapa() {
    spanTituloPrincipal.style.left = "110vw";
    setTimeout(() => {
        spanTituloPrincipal.style.visibility = "hidden";
        mapaCerrado.style.visibility = "visible";
        mapaCerrado.style.opacity = 1;
        setTimeout(() => {
            avisoPrincipal.innerHTML = `Selecione a localização em que o <strong style="font-family:'Poor Story', cursive;font-size: 60px;">Cerrado</strong> se encontra`;
            avisoPrincipal.style.opacity = "1";
            mapaCerrado.style.top = "25vh";
            mapaCerrado.style.width = "75vw";
            mapaCerrado.style.height = "75vh";
        }, 750);
    }, 1500);
}

function mostrarItem(item) {
    if (!mapaDuringAnimation)
        item.style.scale = "1.06";
}
function retornarItem(item) {
    if (!mapaDuringAnimation)
        item.style.scale = "1";
}

function mapaItemErrado(item) {
    if (!mapaDuringAnimation) {
        const parent = item.parentNode;
        mapaDuringAnimation = true;
        animarItemErro(parent, 0.4, () => {
            item.style.scale = "1";
            mapaDuringAnimation = false;
        });
    }
}

function mapaItemCerto(item) {
    if (!mapaDuringAnimation) {
        mapaDuringAnimation = true;
        avisoPrincipal.style.opacity = "0";
        mapaCerrado.style.animationName = "zoomMapa";
        mapaCerrado.style.animationDuration = "2.5s";
        mapaCerrado.style.animationFillMode = "forwards"

        animateSvgTranslate(item.parentNode, 1.8, -1480, 500);

        setTimeout(() => {
            document.body.style.backgroundColor = "#C66C3B";
            mapaCerrado.style.display = "none";
            mapaDiv.style.display = "none";
            containerAreaResposta.style.display = "block";
            setTimeout(() => {
                exibirPergunta(0);
            }, 100);

        }, 1800);
    }
}

function animarItemErro(item, duracao, callback) {
    const duracaoIndividual = duracao / 5;
    animateSvgTranslate(item, duracaoIndividual, 500, 150, 60, 0, 0, () => {
        animateSvgTranslate(item, duracaoIndividual, -500, -150, 60, 500, 150, () => {
            animateSvgTranslate(item, duracaoIndividual, 650, 225, 60, -500, -150, () => {
                animateSvgTranslate(item, duracaoIndividual, -350, -125, 60, 650, 225, () => {
                    animateSvgTranslate(item, duracaoIndividual, 0, 0, 60, -350, -125, callback);
                });
            });
        });
    });
}

function animateSvgTranslate(svg, duracao, x, y, frameRate = 60, xInicial = 0, yInicial = 0, callback = null) {
    const frames = frameRate * duracao;
    let xAtual = xInicial;
    let yAtual = yInicial;

    const aumentoDoX = (x - xInicial) / frames;
    const aumentoDoY = (y - yInicial) / frames;

    const frameTime = 1000 / frameRate;

    let currentFrame = 0;

    const intervalFunction = setInterval(() => {
        xAtual += aumentoDoX
        yAtual += aumentoDoY;
        svg.setAttribute("transform", `translate(${xAtual.toFixed(1)},${yAtual.toFixed(1)})`);
        currentFrame++;
        if (currentFrame >= frames) {
            clearInterval(intervalFunction);
            if (typeof callback == "function")
                callback();
        }
        console.log(xAtual);
    }, frameTime);
}

function recomecarJogo() {
    location.reload();
}

document.body.onresize = () => {
    resize();
};

function resize() {
    const razaoX = window.innerWidth / 1920;
    const razaoY = window.innerHeight / 1080;

    const width1 = 533 * razaoX;
    const height1 = 530 * razaoY;
    termometro.setAttribute("width", width1);
    termometro.setAttribute("height", height1);
    //termometro.setAttribute("viewBox", `0 0 ${width1} ${height1}`);

    const width2 = 310.589 * razaoX;

    neve.setAttribute("width", width2);
    neve.setAttribute("height", width2);

    sol.setAttribute("width", width2);
    sol.setAttribute("height", width2);
};

resize();