// JavaScript source code

var ul = document.querySelector('#app ul');
var inputAdicionar = document.querySelector('#app input');
var buttonAdicionar = document.querySelector('#app button');

function RenderizaGits(listaGit) {

    for (git of listaGit) {
        var ElementUl = document.createElement('li');
        var ElementText = document.createTextNode(git['name']);

        ElementUl.appendChild(ElementText);
        ul.appendChild(ElementUl);
    }
}

function PesquisaGit() {

    var GitLocalizado = function () {
        return new Promise(function (resolve, reject) {

            var nomeGit = inputAdicionar.value;

            var conexao = new XMLHttpRequest();
            //conexao.open('GET', ' https://api.github.com/users/pablorutsatz/repos');
            conexao.open('GET', ' https://api.github.com/users/' + nomeGit + '/repos');
            conexao.send(null);

            var ElementUl = document.createElement('li');
            var ElementText = document.createTextNode('Carregando...');

            ElementUl.appendChild(ElementText);
            ul.appendChild(ElementUl);

            conexao.onreadystatechange = function () {

                ul.innerHTML = '';
                
                if (conexao.readyState === 4) {
                    if (conexao.status == 200) {
                        var listaItens = JSON.parse(conexao.responseText);
                        console.log(listaItens);
                        resolve(listaItens);
                    }
                    else {
                        reject('Git não encontrado.');
                    }
                }
            }
        });
    }

    GitLocalizado().then(function (response) {
        RenderizaGits(response);
    }).catch(function(reject){
        alert(reject);          
    });
}

buttonAdicionar.onclick = PesquisaGit;