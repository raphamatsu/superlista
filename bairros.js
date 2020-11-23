var dataBairros = ["Agronômica", "Armação do Pântano do Sul", "Balneário", "Barra da Lagoa", "Bom Abrigo", "Cachoeira do Bom Jesus", "Cacupé", "Campeche", "Canasvieiras", "Capoeiras", "Carianos", "Carvoeira", "Centro", "Coqueiros", "Córrego Grande", "Costeira do Pirajubaé", "Daniela", "Estreito", "Ingleses", "Itacorubi", "Itaguaçu", "Jardim Atlântico", "João Paulo", "José Mendes", "Jurerê Internacional", "Jurerê Tradicional", "Lagoa da Conceição", "Monte Verde", "Pantanal", "Pântano do Sul", "Ponta das Canas", "Praia Brava", "Ribeirão da Ilha", "Rio Tavares", "Rio Vermelho", "Saco dos Limões", "Saco Grande", "Sambaqui", "Santa Mônica", "Santo Antônio de Lisboa", "Tapera", "Trindade"]

function gerarBairros() {
    var opcao;
    for(i=0; i < dataBairros.length; i++) {
        
        opcao = document.createElement('option')
        opcao.setAttribute('value', `${dataBairros[i]}`)
        
        document.getElementById('bairros').appendChild(opcao)
 
    }
}