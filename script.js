let itens_supermercado = [
    {
      "codigo_barras": 7890123456789,
      "nome": "Arroz Integral Tio João",
      "valor": 5.99,
      "quantidade_estoque": 50,
      "imagem": "assets/prod-1.png"
    },
    {
      "codigo_barras": 1234567890123,
      "nome": "Feijão Preto Camil",
      "valor": 3.49,
      "quantidade_estoque": 40,
      "imagem": "assets/prod-2.png"
    },
    {
      "codigo_barras": 5678901234567,
      "nome": "Macarrão Integral Vitao",
      "valor": 2.79,
      "quantidade_estoque": 30,
      "imagem": "assets/prod-3.png"
    },
    {
      "codigo_barras": 9876543210987,
      "nome": "Óleo de Soja Liza",
      "valor": 4.89,
      "quantidade_estoque": 25,
      "imagem": "assets/prod-4.png"
    },
    {
      "codigo_barras": 2345678901234,
      "nome": "Leite Semidesnatado Ninho",
      "valor": 3.99,
      "quantidade_estoque": 35,
      "imagem": "assets/prod-5.png"
    },
    {
      "codigo_barras": 8765432109876,
      "nome": "Açúcar Refinado União",
      "valor": 2.29,
      "quantidade_estoque": 45,
      "imagem": "assets/prod-6.png"
    },
    {
      "codigo_barras": 3456789012345,
      "nome": "Café Solúvel 3 Corações",
      "valor": 7.99,
      "quantidade_estoque": 20,
      "imagem": "assets/prod-7.png"
    },
    {
      "codigo_barras": 6543210987654,
      "nome": "Sabonete Líquido Dove",
      "valor": 6.49,
      "quantidade_estoque": 15,
      "imagem": "assets/prod-8.png"
    },
    {
      "codigo_barras": 2109876543210,
      "nome": "Detergente Líquido Ypê",
      "valor": 2.99,
      "quantidade_estoque": 30,
      "imagem": "assets/prod-9.png"
    },
    {
      "codigo_barras": 5432109876543,
      "nome": "Escova de Dentes Colgate",
      "valor": 3.79,
      "quantidade_estoque": 40,
      "imagem": "assets/prod-10.png"
    }
  ]

let form = document.getElementById('formPesquisa');
let inputPesquisa = document.getElementById('pesquisa');
let listaProdutosBox = document.querySelector(".listaProdutos");

function limpaPesquisa(event) {
    event.preventDefault();

    inputPesquisa.value = '';
    listaProdutosBox.innerHTML = '';
    renderizaProdutos(itens_supermercado);
}

form.addEventListener('submit' , function(e) {
    e.preventDefault();
    let arrayPesquisado = [];

    listaProdutosBox.innerHTML = '';
    if (inputPesquisa.value.trim() !== '') {

        for (let i= 0; i<itens_supermercado.length; i++) {
            let nomeProduto = itens_supermercado[i].nome.toLowerCase();

            if (inputPesquisa.value.length === 13 && itens_supermercado[i].codigo_barras === parseInt(inputPesquisa.value) ) {
                //pesquisa por código de barras
                arrayPesquisado = [...arrayPesquisado, itens_supermercado[i]];
                console.log(inputPesquisa.value, arrayPesquisado)
                renderizaProdutos(arrayPesquisado);
                return;
            }else if (nomeProduto.includes(inputPesquisa.value.toLowerCase())) {
                //pesquisa por nome
                arrayPesquisado = [...arrayPesquisado, itens_supermercado[i]];
                renderizaProdutos(arrayPesquisado);
                return;
            }
        }
    }

    if (arrayPesquisado.length === 0) {
        alert('Não encontramos o produto!')
        renderizaProdutos(itens_supermercado);
    }

    inputPesquisa.value = '';
})

function verificaPesquisa(valor) {
    return valor 
}

renderizaProdutos(itens_supermercado);

function renderizaProdutos(pesquisa) {
    pesquisa.map(item => {
        let valorProduto = String(item.valor);
        let valorReal = 'R$ ' + valorProduto.replace('.', ',');

        let produto = ` <div class="cardProduto">
                            <div class="produtoInfo">
                                <img src="${item.imagem}" alt="">
                                <div class="produtoDescricao">
                                    <div>
                                        <h3 class="nomeProduto">${item.nome}</h3>
                                        <p class="codigoBarra">${item.codigo_barras}</p>
                                    </div>
                                    <p class="estoque">Estoque: ${item.quantidade_estoque}</p>
                                </div>
                            </div>
                            <div class="produtoValorBtn">
                                <p class="valorProduto">${valorReal}</p>
                                <button class="btnAddCarrinho">ADICIONAR AO CARRINHO</button>
                            </div>
                        </div> `
        listaProdutosBox.insertAdjacentHTML('beforeend' , produto);
    })
}
