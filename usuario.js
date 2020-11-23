//array para armazenar todos os usuarios cadastrados
//var usuarios = []

//pega os dados do html
var nome = document.getElementById("nomeUsuario")
var nascimento = document.getElementById("nascimentoUsuario")
var cpf = document.getElementById("cpfUsuario")
var email = document.getElementById("emailUsuario")
var senha = document.getElementById("senhaUsuario")
var senhaConfirmacao = document.getElementById("confirmaSenhaUsuario")
var bairro = document.getElementById("bairroUsuario")

//cria um novo usuario
function criaUsuario(nome, nascimento, cpf, email, senha, bairro) {
    this.nome = nome
    this.nascimento = nascimento
    this.cpf = cpf
    this.email = email
    this.senha = senha
    this.bairro = bairro
}

//adiciona o novo usuario ao array 'usuarios[]'
function cadastrarUsuario() {

    //limpar avisos de erro do html
    document.getElementById("nomeValidar").innerHTML = ""
    document.getElementById("nascimentoValidar").innerHTML = ""
    document.getElementById("cpfValidar").innerHTML = ""
    document.getElementById("emailValidar").innerHTML = ""
    document.getElementById("senhaValidar").innerHTML = ""
    document.getElementById("bairroValidar").innerHTML = ""

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))

    if (!listaUsuarios) {
        listaUsuarios = [] // primeira vez que usa, se não for válido, seta para array vazio
    }

    //validar cadastro
    //validar nome (Se está em branco ou já foi cadastrado)
    if (nome.value == "") {
        document.getElementById("nomeValidar").innerHTML = `O campo nome está em branco!`
    }

    //validar nascimento (Se está em branco)
    if (nascimento.value == "") {
        document.getElementById("nascimentoValidar").innerHTML = `O campo data de nascimento está em branco!`
    }

    //verifica se é maior de idade
    if (verificarIdade() == false) {
        document.getElementById("nascimentoValidar").innerHTML = `Pessoas menores de 18 não podem se cadastrar.`
    }

    //validar se o campo cpf esta vazio e se esta correto
    if (cpf.value == "" || cpf == null) {
        document.getElementById("cpfValidar").innerHTML = `O campo CPF está em branco!`
    }

    if ((cpf.value !== "") && (verificarCpf() !== true) && (cpf.value.length == 11)) {
        document.getElementById("cpfValidar").innerHTML = `Digite um CPF válido!`
    }

    if ((cpf.value !== "") && (verificarCpf() !== true) && (cpf.value.length !== 11)) {
        document.getElementById("cpfValidar").innerHTML = `O campo CPF deve conter 11 dígitos!`
    }

    if ((cpf.value !== "") && (verificarCpf() == true) && (compararCpfs() == true)) {
        document.getElementById("cpfValidar").innerHTML = `Esse CPF já foi cadastrado!`
    }


    function verificarCpf() {

        //pegando o cpf do usuario do html
        let cpfUsuario = cpf.value

        //separando o cpf em digitos
        let cpfUsuarioDigitos = cpfUsuario.toString().split('')
        let digitos = cpfUsuarioDigitos.map(Number)

        //atribuindo variaveis aos 2 ultimos digitos do cpf
        let digitoVerificador1 = digitos[9]
        let digitoVerificador2 = digitos[10]

        //criando a variavel multiplicadora
        let multiplicadorDig1 = 10
        let multiplicadorDig2 = 11

        //criando variaveis soma dos dois digitos verificadores
        let somaVerificador1 = 0
        let somaVerificador2 = 0

        //verificacao do primeiro digito
        //loop para somar a multiplicacao dos 9 primeiros digit com 10, 9, 8... ate 2
        for (i = 0; i < 9; i++) {
            somaVerificador1 += (digitos[i] * (multiplicadorDig1))
            multiplicadorDig1--
        }

        //calculo padrao com a soma encontrada para verificar o primeiro digito
        let restoDigito1 = ((somaVerificador1 * 10) % 11)
        if (restoDigito1 == 10 || restoDigito1 == 11) {
            restoDigito1 = 0
        } else {
            restoDigito1
        }

        //verificacao do segundo digito
        //loop para somar a multiplicacao dos 10 primeiros digit com 11, 10, 9, 8... ate 2
        for (i = 0; i < 10; i++) {
            somaVerificador2 += (digitos[i] * multiplicadorDig2)
            multiplicadorDig2--
        }

        //calculo padrao com a soma encontrada para verificar o segundo digito
        let restoDigito2 = ((somaVerificador2 * 10) % 11)
        if (restoDigito2 == 10 || restoDigito2 == 11) {
            restoDigito2 = 0
        } else {
            restoDigito2
        }

        //resultado usuario
        if (restoDigito1 === digitoVerificador1 && restoDigito2 === digitoVerificador2) {
            return true;

        } else {
            return false;
        }
    }

    //validar se o cpf já foi cadastrado
    function compararCpfs() {
        console.log(listaUsuarios)
        for (i = 0; i < listaUsuarios.length; i++) {
            let numeroCpf = cpf.value
            var validarCpf = listaUsuarios.filter(c => c.cpf.includes(numeroCpf))
            console.log(validarCpf)
            if (validarCpf.length == 1) {
                document.getElementById("cpfValidar").innerHTML = `Esse CPF já foi cadastrado!`
                return false
            }
        }
    }

    //validar se o e-mail está em branco
    if (email.value == "") {
        document.getElementById("emailValidar").innerHTML = `O campo e-mail está em branco!`
            //validar se o e-mail esta escrito corretamente
    } else if (((email !== '') && (validarEmail(email) == false))) {
        document.getElementById("emailValidar").innerHTML = `E-mail invalido!`

    } else {
        validarEmail(email)
    }

    //validacao da senha
    if (senha.value !== senhaConfirmacao.value) {
        document.getElementById("senhaValidar").innerHTML = `Senhas incompatíveis!`
    }

    //função validar expressão do e-mail
    function validarEmail(email) {
        var emailCheck = email.value;
        var filtro = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (filtro.test(emailCheck)) {
            return true;
        } else {
            return false;
        }
    }

    //validar bairro (Se está em branco)
    if ((bairro.value == "") || (dataBairros.includes(bairro.value) !== true)) {
        document.getElementById("bairroValidar").innerHTML = `O campo bairro não foi selecionado!`
    }
    if (bairro.value == null) {
        document.getElementById("bairroValidar").innerHTML = `O campo bairro não foi selecionado!`
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((nome.value !== "") && (nascimento.value !== "") && (verificarIdade() == true) && (compararCpfs() !== false) && (verificarCpf() == true) && ((email.value !== "") && (validarEmail(email) == true)) && (senha.value == senhaConfirmacao.value) && (bairro.value !== "") && (dataBairros.includes(bairro.value) == true) && (bairro.value !== null)) {

        let novoUsuario = new criaUsuario(nome.value, nascimento.value, cpf.value, email.value, senha.value, bairro.value)

        //listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
        listaUsuarios.push(novoUsuario)
        listaUsuarios.sort(dynamicSort("nome"))
        swal({
            title: 'CADASTRADO!',
            text: 'Usuário cadastrado com sucesso!',
            icon: 'success',
            button: 'OK'
        }).then(function() {
            window.location.href = "loginUsuario.html";
        });
        localStorage.setItem("usuários", JSON.stringify(listaUsuarios))
    }
    //limpar campos
    document.forms[0].reset();
}

//Função para logar
function login() {

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
    let loginCpf = document.getElementById("loginCpf").value
    let loginSenha = document.getElementById("loginSenha").value
        //For para validação de login corret ou incorreto
    for (i = 0; i < listaUsuarios.length; i++) {
        console.log(listaUsuarios[i].cpf)
        console.log(listaUsuarios[i].senha)
            //Construir validação
            //CPFs adms: 
        if ((listaUsuarios[i].cpf == loginCpf) && (listaUsuarios[i].senha == loginSenha)) {
            if (loginCpf === "64787041061" || loginCpf === "69865221004" || loginCpf === "53008271006") {
                swal({
                    title: 'LOGADO!',
                    text: 'SEJA BEM-VINDO! Você está logado como administrador.',
                    icon: 'success',
                    button: 'OK'
                }).then(function() {
                    window.location = "paineldecontrole.html";
                });
            } else {
                swal({
                    title: 'LOGADO!',
                    text: 'Logado! SEJA BEM-VINDO!',
                    icon: 'success',
                    button: 'OK'
                }).then(function() {
                    window.location = "criarLista.html";
                });
            }
        }
    }

    if ((listaUsuarios[i].cpf !== loginCpf) || (listaUsuarios[i].senha !== loginSenha)) {
        document.getElementById("loginValidar").innerHTML = `CPF e/ou senha estão incorreto!`
    }
    document.getElementById("loginValidar").innerHTML = `CPF e/ou senha estão incorreto!`
}

//função alterar senha
function alterarSenha() {

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
    let cpfParaChecar = document.getElementById("alterarSenhaCpf").value
    let emailParaChecar = document.getElementById("alterarSenhaEmail").value

    for (i = 0; i < listaUsuarios.length; i++) {

        if ((cpfParaChecar == listaUsuarios[i].cpf) && (emailParaChecar == listaUsuarios[i].email)) {

            let usuarios

            listaUsuarios[i].senha = document.getElementById("alterarSenhaNova").value
            usuarios = listaUsuarios
            localStorage.setItem("usuários", JSON.stringify(usuarios))

            swal({
                title: 'SENHA ALTERADA!',
                text: 'Senha alterada com sucesso!',
                icon: 'success',
                button: 'OK'
            }).then(function() {
                window.location.href = "loginUsuario.html";
            });

        } else {
            document.getElementById("loginValidar").innerHTML = `CPF e/ou E-mail inválido!`
        }
    }
}

//Função para voltar para pagina anterior
function voltar() {
    window.history.back()
}

function verificarIdade() {
    var data = document.getElementById("nascimentoUsuario").value; // pega o valor do input
    console.log("data ", data);
    data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
    var data_array = data.split("-"); // quebra a data em array

    // para o IE onde será inserido no formato dd/MM/yyyy
    if (data_array[0].length != 4) {
        data = data_array[2] + "-" + data_array[1] + "-" + data_array[0]; // remonto a data no formato yyyy/MM/dd
    }
    console.log(data)

    // comparo as datas e calculo a idade
    var hoje = new Date();
    var nasc = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    console.log(idade)
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

    if (idade < 18) {
        return false;
    } else {
        return true
    }
}