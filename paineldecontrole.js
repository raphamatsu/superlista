function generateHeadUsuarios(table) {
    var nomeColunas = ['Nome', 'Nascimento', 'CPF', 'E-mail', 'Bairro', 'Editar/Excluir']
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTableUsuarios(table, arrayObjetosSelecionados) {
    for (let compra of arrayObjetosSelecionados) {
        let row = table.insertRow();

        let cellNome = row.insertCell();
        let textNome = document.createTextNode(compra.nome)
        cellNome.appendChild(textNome)

        let cellNascimento = row.insertCell();
        let textNascimento = document.createTextNode(compra.nascimento.split('-').reverse().join('/'))
        cellNascimento.appendChild(textNascimento)

        let cellCPF = row.insertCell();
        let textCPF = document.createTextNode(compra.cpf)
        cellCPF.appendChild(textCPF)

        let cellEmail = row.insertCell();
        let textEmail = document.createTextNode(compra.email)
        cellEmail.appendChild(textEmail)

        let cellBairro = row.insertCell();
        let textBairro = document.createTextNode(compra.bairro)
        cellBairro.appendChild(textBairro)

        //cria o checkbox
        var checkSign = document.createElement('input')

        //var idCheck
        checkSign.setAttribute('type', "checkbox")
        checkSign.setAttribute('name', "nomeCheckbox")
        checkSign.setAttribute('id', `${arrayObjetosSelecionados.indexOf(compra)}`)

        //insere o checkbox dentro da tabela
        let cellCheckBox = row.insertCell();
        cellCheckBox.appendChild(checkSign)
    }
}

function gerarListaUsuarios() {
    document.getElementById("botoesEditarExcluir").innerHTML = ''
    document.getElementById("cabecalho").innerHTML = ''
    document.getElementById("camposEdicao").innerHTML = ''

    //cria botao deletar
    let section = document.getElementById('botoesEditarExcluir')
    section.innerHTML = ''
    var btn = document.createElement("button")
    btn.innerText = 'Deletar'
    btn.setAttribute('class', 'botDinPainelCtrl')
    btn.addEventListener('click', usuariosDeletar)
    section.appendChild(btn)

    //cria botao editar
    var btn2 = document.createElement("button")
    btn2.innerText = 'Editar'
    btn2.addEventListener('click', usuariosEditar)
    btn2.setAttribute('class', 'botDinPainelCtrl')
    section.appendChild(btn2)

    //limpa o html para não sobrescrever resultados
    document.getElementById("listaCadastrados").innerHTML = ""

    //pega todos os usuarios salvos no local storage
    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))

    //ordenar os usuarios pelo ID
    listaUsuarios.sort(dynamicSort("nome"))

    if (listaUsuarios) {
        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(listaUsuarios[0]);

        generateHeadUsuarios(table, data);
        generateTableUsuarios(table, listaUsuarios);
    } else {
        swal(
            {
                title: 'ATENÇÃO!',
                text: 'Nenhum usuario cadastrado!',
                icon: 'error',
                button: 'OK'
            })
    }
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

// ----------------------LISTA ESTABELECIMENTOS------------------------------

function generateHeadEstabelecimentos(table) {
    var nomeColunas = ['Estabelecimento', 'CEP', 'Contato', 'Bairro', 'Editar/Excluir']
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTableEstabelecimentos(table, arrayObjetosSelecionados) {
    for (let compra of arrayObjetosSelecionados) {
        let row = table.insertRow();

        let cellEstab = row.insertCell();
        let textEstab = document.createTextNode(compra.estabelecimento)
        cellEstab.appendChild(textEstab)

        let cellCEP = row.insertCell();
        let textCEP = document.createTextNode(compra.cep)
        cellCEP.appendChild(textCEP)

        let cellContato = row.insertCell();
        let textContato = document.createTextNode(compra.contato)
        cellContato.appendChild(textContato)

        let cellBairro = row.insertCell();
        let textBairro = document.createTextNode(compra.bairroMercado)
        cellBairro.appendChild(textBairro)

        //cria o checkbox
        var checkSign = document.createElement('input')

        //var idCheck
        checkSign.setAttribute('type', "checkbox")
        checkSign.setAttribute('name', "nomeCheckbox")
        checkSign.setAttribute('id', `${arrayObjetosSelecionados.indexOf(compra)}`)

        //insere o checkbox dentro da tabela
        let cellCheckBox = row.insertCell();
        cellCheckBox.appendChild(checkSign)
    }
}

function gerarListaEstabelecimentos() {
    document.getElementById("botoesEditarExcluir").innerHTML = ''
    document.getElementById("cabecalho").innerHTML = ''
    document.getElementById("camposEdicao").innerHTML = ''

    //cria botao deletar
    let section = document.getElementById('botoesEditarExcluir')
    section.innerHTML = ''
    var btn1 = document.createElement("button")
    btn1.innerText = 'Deletar'
    btn1.setAttribute('class', 'botDinPainelCtrl')
    btn1.addEventListener('click', estabelecimentosDeletar)
    section.appendChild(btn1)

    //cria botao editar
    var btn2 = document.createElement("button")
    btn2.innerText = 'Editar'
    btn2.setAttribute('class', 'botDinPainelCtrl')
    btn2.addEventListener('click', estabelecimentosEditar)
    section.appendChild(btn2)

    //limpa o html para não sobrescrever resultados
    document.getElementById("listaCadastrados").innerHTML = ""

    //pega todos os usuarios salvos no local storage
    let lista = JSON.parse(localStorage.getItem("estabelecimentos"))

    //ordenar os usuarios pelo ID
    lista.sort(dynamicSort("estabelecimento"))

    if (lista) {
        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(lista[0]);

        generateHeadEstabelecimentos(table, data);
        generateTableEstabelecimentos(table, lista);
    } else {
        swal(
            {
                title: 'ATENÇÃO!',
                text: 'Nenhum estabelecimento cadastrado!',
                icon: 'error',
                button: 'OK'
            })
    }
}

// ----------------------LISTA PRODUTOS------------------------------
var excluirProduto = document.getElementById("excluirProduto")

function gerarListaProdutos() {
    document.getElementById("botoesEditarExcluir").innerHTML = ''
    document.getElementById("cabecalho").innerHTML = ''
    document.getElementById("camposEdicao").innerHTML = ''

    //cria botao deletar
    let section = document.getElementById('botoesEditarExcluir')
    section.innerHTML = ''
    var btn1 = document.createElement("button")
    btn1.innerText = 'Deletar'
    btn1.setAttribute('class', 'botDinPainelCtrl')
    btn1.addEventListener('click', produtosDeletar)
    section.appendChild(btn1)

    //cria botao editar
    //let section = document.getElementById('botoesEditarExcluir')
    var btn2 = document.createElement("button")
    btn2.innerText = 'Editar'
    btn2.setAttribute('class', 'botDinPainelCtrl')
    btn2.addEventListener('click', produtosEditar)
    section.appendChild(btn2)

    //limpa o html para não sobrescrever resultados
    document.getElementById("listaCadastrados").innerHTML = ""

    //pega todos os produtos salvos no local storage
    var arrayObjetosLista = JSON.parse(localStorage.getItem("cadastros"))

    //ordenar os produtos por preco
    arrayObjetosLista.sort(dynamicSort("produto"))

    if (arrayObjetosLista) {
        //filtro para pegar apenas os objetos da lista criada pelo usuario

        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(arrayObjetosLista[0]);

        generateTableHead(table, data);
        generateTable(table, arrayObjetosLista);
    } else {
        swal(
            {
                title: 'ATENÇÃO!',
                text: 'Nenhum produto cadastrado!',
                icon: 'error',
                button: 'OK'
            })
    }
}

//   TABELA que COMPARA os PRECOS  Referencia: https://www.valentinog.com/blog/html-table/
function generateTableHead(table) {
    var nomeColunas = ["Data Compra", "Produto", "Marca", "Peso/Volume", "Estabelecimento", "Valor (R$)", "Editar/Excluir"]
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, arrayObjetosSelecionados) {
    for (let compra of arrayObjetosSelecionados) {
        let row = table.insertRow();

        let cellDataCompra = row.insertCell();
        let textDataCompra = document.createTextNode(compra.dataCompraProduto.split('-').reverse().join('/'))
        cellDataCompra.appendChild(textDataCompra)

        let cellProduto = row.insertCell();
        let textProduto = document.createTextNode(compra.produto)
        cellProduto.appendChild(textProduto)

        let cellMarca = row.insertCell();
        let textMarca = document.createTextNode(compra.marcaProduto)
        cellMarca.appendChild(textMarca)

        let cellPesoVolume = row.insertCell();
        let textPesoVolume = document.createTextNode(compra.volumePesoProduto)
        cellPesoVolume.appendChild(textPesoVolume)

        let cellEstabelecimento = row.insertCell();
        let textEstabelecimento = document.createTextNode(compra.estabelecimentoProduto)
        cellEstabelecimento.appendChild(textEstabelecimento)

        let cellValor = row.insertCell();
        let textValor = document.createTextNode(compra.valorProduto)
        cellValor.appendChild(textValor)

        //cria o checkbox
        var checkSign = document.createElement('input')

        //var idCheck
        checkSign.setAttribute('type', "checkbox")
        checkSign.setAttribute('name', "nomeCheckbox")
        checkSign.setAttribute('id', `${arrayObjetosSelecionados.indexOf(compra)}`)

        //insere o checkbox dentro da tabela
        let cellCheckBox = row.insertCell();
        cellCheckBox.appendChild(checkSign)
    }
}

//--------------------FUNÇÕES DE DELEÇÃO---------------------------------------

function produtosDeletar() {

    var arrayObjetosLista = JSON.parse(localStorage.getItem("cadastros"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            console.log('indice checkBox', checkBoxes[i])
            console.log('Cadastros', arrayObjetosLista[i])
            arrayObjetosLista.splice(i, 1)
        }
    }
    localStorage.setItem('cadastros', JSON.stringify(arrayObjetosLista))
    swal(
        {
            title: 'EXCLUIDO!',
            text: 'Produto excluído com sucesso!',
            icon: 'success',
            button: 'OK'
        })
    gerarListaProdutos()
}

function usuariosDeletar() {

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            console.log('indice checkBox', checkBoxes[i])
            console.log('Cadastros', listaUsuarios[i])
            listaUsuarios.splice(i, 1)
        }
    }
    localStorage.setItem('usuários', JSON.stringify(listaUsuarios))
    swal(
        {
            title: 'EXCLUIDO!',
            text: 'Usuário excluído com sucesso!',
            icon: 'success',
            button: 'OK'
        })
    gerarListaUsuarios()
}

function estabelecimentosDeletar() {

    var lista = JSON.parse(localStorage.getItem("estabelecimentos"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            console.log('indice checkBox', checkBoxes[i])
            console.log('Cadastros', lista[i])
            lista.splice(i, 1)
        }
    }
    localStorage.setItem('estabelecimentos', JSON.stringify(lista))
    swal(
        {
            title: 'EXCLUIDO!',
            text: 'Estabelecimento excluído com sucesso!',
            icon: 'success',
            button: 'OK'
        })
    gerarListaEstabelecimentos()
}

//--------------------FUNÇÕES DE EDIÇÃO---------------------------------------
function produtosEditar() {

    document.getElementById("cabecalho").innerHTML = ''
    document.getElementById("camposEdicao").innerHTML = ''

    //criar inputs para alterar dados
    var inputDataCompra = document.createElement("input");
    inputDataCompra.setAttribute('type', 'date');
    inputDataCompra.setAttribute('id', 'idinputDataCompra');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputDataCompra);

    var inputProduto = document.createElement("input");
    inputProduto.setAttribute('type', 'text');
    inputProduto.setAttribute('id', 'idinputProduto');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputProduto);

    var inputMarca = document.createElement("input");
    inputMarca.setAttribute('type', 'text');
    inputMarca.setAttribute('id', 'idinputMarca');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputMarca);

    var inputPesoVolume = document.createElement("input");
    inputPesoVolume.setAttribute('type', 'text');
    inputPesoVolume.setAttribute('id', 'idinputPesoVolume');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputPesoVolume);

    var inputEstabelecimento = document.createElement("input");
    inputEstabelecimento.setAttribute('type', 'text');
    inputEstabelecimento.setAttribute('id', 'idinputEstabelecimento');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputEstabelecimento);

    var inputValor = document.createElement("input");
    inputValor.setAttribute('type', 'text');
    inputValor.setAttribute('id', 'idinputValor');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputValor);

    //cria botao Salvar Atualizacoes
    let section = document.getElementById('camposEdicao')
    var btnSalvar = document.createElement("button")
    btnSalvar.innerText = 'Alterar'
    btnSalvar.addEventListener('click', alterarDados)
    section.appendChild(btnSalvar)

    //loop para colocar os valores do item selecionado e mostrar dentro dos inputs
    var arrayObjetosLista = JSON.parse(localStorage.getItem("cadastros"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked e colocar os valores originais 
    var checkBoxes = getTable.getElementsByTagName("input")
    for (i = 0; i < checkBoxes.length; i++) {

        if (checkBoxes[i].checked) {
            document.getElementById("idinputDataCompra").value = arrayObjetosLista[i].dataCompraProduto
            document.getElementById("idinputProduto").value = arrayObjetosLista[i].produto
            document.getElementById("idinputMarca").value = arrayObjetosLista[i].marcaProduto
            document.getElementById("idinputPesoVolume").value = arrayObjetosLista[i].volumePesoProduto
            document.getElementById("idinputEstabelecimento").value = arrayObjetosLista[i].estabelecimentoProduto
            document.getElementById("idinputValor").value = arrayObjetosLista[i].valorProduto
            var indice = i
        }
    }

    function alterarDados() {
        arrayObjetosLista[indice].dataCompraProduto = document.getElementById("idinputDataCompra").value
        arrayObjetosLista[indice].produto = document.getElementById("idinputProduto").value
        arrayObjetosLista[indice].marcaProduto = document.getElementById("idinputMarca").value
        arrayObjetosLista[indice].volumePesoProduto = document.getElementById("idinputPesoVolume").value
        arrayObjetosLista[indice].estabelecimentoProduto = document.getElementById("idinputEstabelecimento").value
        arrayObjetosLista[indice].valorProduto = document.getElementById("idinputValor").value

        arrayObjetosLista.sort(dynamicSort("produto"))
        localStorage.setItem('cadastros', JSON.stringify(arrayObjetosLista))
        swal(
            {
                title: 'ALTERADO!',
                text: 'Dados alterados com sucesso!',
                icon: 'success',
                button: 'OK'
            })
        gerarListaProdutos()
        let listaTodosProdutos = JSON.parse(localStorage.getItem("listaTodosProdutos"))
        listaTodosProdutos.push(arrayObjetosLista[indice].produto)
        localStorage.setItem("listaTodosProdutos", listaTodosProdutos)

        document.getElementById("cabecalho").innerHTML = ''
        document.getElementById("camposEdicao").innerHTML = ''
    }
}

////////// EDITAR USUARIOS
function usuariosEditar() {

    document.getElementById("cabecalho").innerHTML = ''
    document.getElementById("camposEdicao").innerHTML = ''

    //criar inputs para alterar dados
    var inputNome = document.createElement("input");
    inputNome.setAttribute('type', 'text');
    inputNome.setAttribute('id', 'idinputNome');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputNome);

    var inputNascimento = document.createElement("input");
    inputNascimento.setAttribute('type', 'text');
    inputNascimento.setAttribute('id', 'idinputNascimento');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputNascimento);

    var inputCpf = document.createElement("input");
    inputCpf.setAttribute('type', 'text');
    inputCpf.setAttribute('id', 'idinputCpf');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputCpf);

    var inputEmail = document.createElement("input");
    inputEmail.setAttribute('type', 'text');
    inputEmail.setAttribute('id', 'idinputEmail');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputEmail);

    var inputBairro = document.createElement("input");
    inputBairro.setAttribute('type', 'text');
    inputBairro.setAttribute('id', 'idinputBairro');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputBairro);

    //cria botao Salvar Atualizacoes
    let section = document.getElementById('camposEdicao')
    var btnSalvar = document.createElement("button")
    btnSalvar.innerText = 'Alterar'
    btnSalvar.addEventListener('click', alterarDados)
    section.appendChild(btnSalvar)

    //loop para colocar os valores do item selecionado e mostrar dentro dos inputs
    var listaUsuarios = JSON.parse(localStorage.getItem("usuários"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked e colocar os valores originais 
    var checkBoxes = getTable.getElementsByTagName("input")
    for (i = 0; i < checkBoxes.length; i++) {

        if (checkBoxes[i].checked) {
            document.getElementById("idinputNome").value = listaUsuarios[i].nome
            document.getElementById("idinputNascimento").value = listaUsuarios[i].nascimento
            document.getElementById("idinputCpf").value = listaUsuarios[i].cpf
            document.getElementById("idinputEmail").value = listaUsuarios[i].email
            document.getElementById("idinputBairro").value = listaUsuarios[i].bairro
            var indice = i
        }
    }

    function alterarDados() {
        listaUsuarios[indice].nome = document.getElementById("idinputNome").value
        listaUsuarios[indice].nascimento = document.getElementById("idinputNascimento").value
        listaUsuarios[indice].cpf = document.getElementById("idinputCpf").value
        listaUsuarios[indice].email = document.getElementById("idinputEmail").value
        listaUsuarios[indice].bairro = document.getElementById("idinputBairro").value

        listaUsuarios.sort(dynamicSort("nome"))
        localStorage.setItem('usuários', JSON.stringify(listaUsuarios))
        swal(
            {
                title: 'ALTERADO!',
                text: 'Dados alterados com sucesso!',
                icon: 'success',
                button: 'OK'
            })
        gerarListaUsuarios()

        document.getElementById("cabecalho").innerHTML = ''
        document.getElementById("camposEdicao").innerHTML = ''
    }
}

////////// EDITAR ESTABELECIMENTOS
function estabelecimentosEditar() {

    document.getElementById("cabecalho").innerHTML = ''
    document.getElementById("camposEdicao").innerHTML = ''

    //criar inputs para alterar dados
    var inputEstabelecimento = document.createElement("input");
    inputEstabelecimento.setAttribute('type', 'text');
    inputEstabelecimento.setAttribute('id', 'idinputEstabelecimento');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputEstabelecimento);

    var inputCep = document.createElement("input");
    inputCep.setAttribute('type', 'text');
    inputCep.setAttribute('id', 'idinputCep');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputCep);

    var inputContato = document.createElement("input");
    inputContato.setAttribute('type', 'text');
    inputContato.setAttribute('id', 'idinputContato');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputContato);

    var inputBairro = document.createElement("input");
    inputBairro.setAttribute('type', 'text');
    inputBairro.setAttribute('id', 'idinputBairro');
    var parent1 = document.getElementById("camposEdicao");
    parent1.appendChild(inputBairro);

    //cria botao Salvar Atualizacoes
    let section = document.getElementById('camposEdicao')
    var btnSalvar = document.createElement("button")
    btnSalvar.innerText = 'Alterar'
    btnSalvar.addEventListener('click', alterarDados)
    section.appendChild(btnSalvar)

    //loop para colocar os valores do item selecionado e mostrar dentro dos inputs
    var listaEstabelecimentos = JSON.parse(localStorage.getItem("estabelecimentos"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked e colocar os valores originais 
    var checkBoxes = getTable.getElementsByTagName("input")
    for (i = 0; i < checkBoxes.length; i++) {

        if (checkBoxes[i].checked) {
            document.getElementById("idinputEstabelecimento").value = listaEstabelecimentos[i].estabelecimento
            document.getElementById("idinputCep").value = listaEstabelecimentos[i].cep
            document.getElementById("idinputContato").value = listaEstabelecimentos[i].contato
            document.getElementById("idinputBairro").value = listaEstabelecimentos[i].bairroMercado
            var indice = i
        }
    }

    function alterarDados() {
        listaEstabelecimentos[indice].estabelecimento = document.getElementById("idinputEstabelecimento").value
        listaEstabelecimentos[indice].cep = document.getElementById("idinputCep").value
        listaEstabelecimentos[indice].contato = document.getElementById("idinputContato").value
        listaEstabelecimentos[indice].bairroMercado = document.getElementById("idinputBairro").value

        listaEstabelecimentos.sort(dynamicSort("estabelecimento"))
        localStorage.setItem('estabelecimentos', JSON.stringify(listaEstabelecimentos))
        swal(
            {
                title: 'ALTERADO!',
                text: 'Dados alterados com sucesso!',
                icon: 'success',
                button: 'OK'
            })
        gerarListaEstabelecimentos()

        document.getElementById("cabecalho").innerHTML = ''
        document.getElementById("camposEdicao").innerHTML = ''
    }
}

function gerarRelatorio() {

    window.open('relatorio.html', '_blank');
}