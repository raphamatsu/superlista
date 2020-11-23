//Array para todos os estabelecimentos cadastrados
var listaEstabelecimentos = []
var listaDeEstabelecimentosObjeto = []

//pega os dados do html
var estabelecimento = document.getElementById("nomeEstabelecimento")
var cep = document.getElementById("cepEstabelecimento")
var contato = document.getElementById("contatoEstabelecimento")
var bairroMercado = document.getElementById("bairroEstabelecimento")

//cria um novo estabelecimento
function criaEstabelecimento(estabelecimento, cep, contato, bairroMercado) {
    this.estabelecimento = estabelecimento
    this.cep = cep
    this.contato = contato
    this.bairroMercado = bairroMercado
}
//adicionar novo estabelecimento no Array estabelecimentos []
function cadastrarEstabelecimento() {

    let listaDeEstabelecimentosObjeto = JSON.parse(localStorage.getItem("estabelecimentos"))

    if (!listaDeEstabelecimentosObjeto) {
        listaDeEstabelecimentosObjeto = [] // primeira vez que usa, se não for válido, seta para array vazio
    }

    //validar cadastro
    if (estabelecimento.value == '') {
        document.getElementById("estabelecimentoValidar").innerHTML = `O campo estabelecimento está em branco!`
    }

    if ((cep.value == "" && cep.value.length !== 8)) {
        document.getElementById("cepValidar").innerHTML = `O campo CEP está em branco!`
    } else if (cep.value.length !== 8) {
        document.getElementById("cepValidar").innerHTML = `O campo CEP deve conter 8 números!`
    }

    if (contato.value == "") {
        document.getElementById("contatoValidar").innerHTML = `O campo contato está em branco!`
    }

    if ((bairroMercado.value == "") || (dataBairros.includes(bairroMercado.value) !== true)) {
        document.getElementById("bairroEstabelecimentoValidar").innerHTML = `O campo bairro não foi selecionado!`
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((estabelecimento.value !== "") && (cep.value !== "") && (cep.value.length == 8) && (contato.value !== "") && (bairroMercado.value !== "") && (dataBairros.includes(bairroMercado.value) == true) && (bairroMercado.value !== null)) {

        let novoEstabelecimento = new criaEstabelecimento(estabelecimento.value, cep.value, contato.value, bairroMercado.value)

        var entradaEstabelecimento = document.getElementById("nomeEstabelecimento").value

        if (!listaEstabelecimentos.includes(entradaEstabelecimento)) {
            listaEstabelecimentos.push(entradaEstabelecimento)
            localStorage.setItem("listaTodosEstabelecimentos", JSON.stringify(listaEstabelecimentos))
        }
        listaDeEstabelecimentosObjeto.push(novoEstabelecimento)
        listaDeEstabelecimentosObjeto.sort(dynamicSort("estabelecimento"))

        swal(
            {
                title: 'CADASTRADO!',
                text: 'Estabelecimento cadastrado com sucesso!',
                icon: 'success',
                button: 'OK'
            })
        localStorage.setItem("estabelecimentos", JSON.stringify(listaDeEstabelecimentosObjeto))
    }
    document.forms[0].reset();
}

function gerarListaEstabelecimentos() {

    let listaDeEstabelecimentos = JSON.parse(localStorage.getItem("listaTodosEstabelecimentos"))
    listaDeEstabelecimentos.sort()

    if (listaDeEstabelecimentos) {
        for (i = 0; i < listaDeEstabelecimentos.length; i++) {
            var opcao = document.createElement('option')
            opcao.setAttribute('value', `${listaDeEstabelecimentos[i]}`)
            document.getElementById('listaEstabelecimentos').appendChild(opcao)
        }
    }
}