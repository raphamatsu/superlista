function gerarCarrinho() {
    window.location.href = 'carrinho.html'
}

function Carrinho() {
    var listaCarrinho = JSON.parse(localStorage.getItem("ListaFinal"))

    //ordenar os produtos por nome
    listaCarrinho.sort(dynamicSort("Produto"))

    console.log('listaCarrinho', listaCarrinho)

    table = document.getElementById('tabelaCarrinho')

    let dataCarrinho = ["Produto", "Marca", "Peso/Volume", "Estabelecimento", "Valor (R$)", "Quantidade", "Subtotal (R$)"]

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of dataCarrinho) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }

    function generateTableCarrinho(table, arrayObjetosSelecionados) {
        for (let compra of arrayObjetosSelecionados) {
            let row = table.insertRow();

            let cellProduto = row.insertCell();
            let textProduto = document.createTextNode(compra.Produto)
            cellProduto.appendChild(textProduto)

            let cellMarca = row.insertCell();
            let textMarca = document.createTextNode(compra.Marca)
            cellMarca.appendChild(textMarca)

            let cellPesoVolume = row.insertCell();
            let textPesoVolume = document.createTextNode(compra.PesoVolume)
            cellPesoVolume.appendChild(textPesoVolume)

            let cellEstabelecimento = row.insertCell();
            let textEstabelecimento = document.createTextNode(compra.Estabelecimento)
            cellEstabelecimento.appendChild(textEstabelecimento)

            let cellValor = row.insertCell();
            let textValor = document.createTextNode(compra.Valor)
            cellValor.appendChild(textValor)

            //cria coluna Qtde
            var qtde = document.createElement('input')

            //var idCheck
            qtde.setAttribute('type', "number")
            qtde.setAttribute('name', "nomeQtde")
            qtde.setAttribute('class', "inputQtdeTab")
            qtde.setAttribute('id', arrayObjetosSelecionados.indexOf(compra))
            qtde.setAttribute('value', 1)

            //insere o input dentro da tabela
            let cellQtde = row.insertCell();
            // let textQtde = document.createTextNode(qtde.value)
            cellQtde.appendChild(qtde)

            //inserção e cálculo subtotal
            let cellSubtotal = row.insertCell();
            // let textSubtotal = document.createTextNode(compra.Valor)
            let textSubtotal = document.createElement('div')
            textSubtotal.setAttribute('id', `ST${arrayObjetosSelecionados.indexOf(compra)}`)
            cellSubtotal.appendChild(textSubtotal)
            cellSubtotal.setAttribute('name', "nomeCellSubtotal")
            textSubtotal.innerText = compra.Valor

            idRow = arrayObjetosSelecionados.indexOf(compra)
        }
    }

    generateTableCarrinho(table, listaCarrinho)
    console.log('listaCarrinho', listaCarrinho)
}

//funcao que ordena a lista
//Ref:<https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript>
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function(a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}

let totalListaLS

function calcular() {

    var listaCarrinho = JSON.parse(localStorage.getItem("ListaFinal"))
    listaCarrinho.sort(dynamicSort("Produto"))
    let total = 0

    for (i = 0; i < listaCarrinho.length; i++) {
        var qtde = document.getElementById(i).value
            //console.log('qtdes', qtde)
        var subTotal = listaCarrinho[i].Valor * qtde

        var sub = document.getElementById(`ST${i}`)
        sub.innerText = parseFloat(subTotal.toFixed(2))
        total += subTotal
    }

    if (totalListaLS != total) {

        document.getElementById('tabelaTotal').innerHTML = ""
        table = document.getElementById('tabelaTotal')
        let dataCarrinho = ["", "", "", "", "", "TOTAL", parseFloat(total.toFixed(2))]

        thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of dataCarrinho) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }

    }
    totalListaLS = total
}


function salvarListaLS() {

    calcular()
    //limpar html de confirmacao de cpf
    document.getElementById("confirmaCPF").innerHTML = " "

    //solicitar confirmacao de cpf
    var cpfValidar = document.getElementById("confirmaCPF")

    //cria texto no html
    var htmlConfirmaCpf = document.createElement('b');
    cpfValidar.appendChild(htmlConfirmaCpf)
    htmlConfirmaCpf.innerHTML = "Confirme seu CPF: "

    //cria input para inserir cpf
    var confirmaCpf = document.createElement("input");
    confirmaCpf.setAttribute('type', 'number');
    confirmaCpf.setAttribute('id', 'idConfirmaCpf');
    cpfValidar.appendChild(confirmaCpf)

    //cria botao confirmar
    var botaoConfirmaCpf = document.createElement("button");
    botaoConfirmaCpf.setAttribute('id', 'botConfirmaCpf')

    cpfValidar.appendChild(botaoConfirmaCpf)
    botaoConfirmaCpf.innerHTML = "Confirmar"
    botaoConfirmaCpf.addEventListener('click', confirmeCpf)

    //array para salvar listas no LS
    var listasLocalStorage = []

    function confirmeCpf() {
        //div para validacao
        let divConfirmacaoCpf = document.createElement('div')
        divConfirmacaoCpf.setAttribute('id', 'confirmarCpf')
        divConfirmacaoCpf.setAttribute('class', 'alert')
        confirmaCPF.appendChild(divConfirmacaoCpf)

        //pegar div de confirmacao
        var divConfirmacao = document.getElementById("confirmarCpf")

        //pegar o valor
        var confirmaCpf = document.getElementById("idConfirmaCpf")

        //pegar dados do local storage
        var listaCpf = JSON.parse(localStorage.getItem('usuários'))

        var confirmar

        for (var i = 0; i < listaCpf.length; i++) {
            if (confirmaCpf.value == listaCpf[i].cpf) {
                confirmar = true
            }
        }

        var relatoriosSalvos = []
        var relatorioUsuario = {}

        if (confirmar) {

            window.swal(
                {
                    title: 'LISTA SALVA!',
                    text: 'Lista salva com sucesso!',
                    icon: 'success',
                    button: 'OK'
                })

            //funcao para salvar a tabela a ser enviada para o LS
            var tableRelatorio = document.getElementById("tabelaCarrinho");

            for (i = 1; i < tableRelatorio.rows.length; i++) {
                var qtidade = document.getElementById(i - 1)
                var subtotal = document.getElementById(`ST${i - 1}`)

                var tempListaLS = {}

                tempListaLS.Produto = tableRelatorio.rows[i].cells[0].innerText
                tempListaLS.Marca = tableRelatorio.rows[i].cells[1].innerText
                tempListaLS.PesoVolume = tableRelatorio.rows[i].cells[2].innerText
                tempListaLS.Estabelecimento = tableRelatorio.rows[i].cells[3].innerText
                tempListaLS.Valor = tableRelatorio.rows[i].cells[4].innerText
                tempListaLS.Quantidade = qtidade.value
                tempListaLS.SubTotal = subtotal.innerHTML

                relatoriosSalvos.push(tempListaLS)
                console.log("relatoriosSalvos: ", relatoriosSalvos);
                localStorage.setItem("RELATORIO-LISTA-FINAL", JSON.stringify(relatoriosSalvos))
            }

            var now = new Date
            var diaAtual = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`

            relatorioUsuario.cpfUsuario = confirmaCpf.value
            relatorioUsuario.dataLista = diaAtual
            relatorioUsuario.TotalLista = parseFloat(totalListaLS.toFixed(2))

            relatoriosSalvos.push(relatorioUsuario)
           
            localStorage.setItem(confirmaCpf.value, JSON.stringify(relatoriosSalvos))

            document.getElementById("idConfirmaCpf").value = ""

        } else {
            document.getElementById("idConfirmaCpf").value = ""
            divConfirmacao.innerHTML = 'Cpf incorreto ou não cadastrado no banco de dados!'
        }
    }
}