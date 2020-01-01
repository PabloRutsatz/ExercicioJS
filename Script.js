// JavaScript source code

var ul = document.querySelector('#app ul');
var inputAdicionar = document.querySelector('#app input');
var buttonAdicionar = document.querySelector('#app button');

function RenderizaGits(listaGit) {

    ul.innerHTML = '';

    for (git of listaGit) {
        var ElementUl = document.createElement('li');
        var ElementText = document.createTextNode(git['name']);

        ElementUl.appendChild(ElementText);
        ul.appendChild(ElementUl);
    }
}

function AdicionaInfoGit() {
    var nomeGit = inputAdicionar.value;

    var conexao = new XMLHttpRequest();
    //conexao.open('GET', ' https://api.github.com/users/pablorutsatz/repos');
    conexao.open('GET', ' https://api.github.com/users/' + nomeGit + '/repos');
    conexao.send(null);

    conexao.onreadystatechange = function () {
        if (conexao.readyState === 4) {
            if (conexao.status == 200) {
                var listaItens = JSON.parse(conexao.responseText);
                console.log(listaItens);
                RenderizaGits(listaItens);
            }
            else {
                console.warn('Erro');
            }
        }
    }
}

buttonAdicionar.onclick = AdicionaInfoGit;