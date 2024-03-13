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

let carrinhoStorage = localStorage.getItem("carrinho");
let carrinhoCliente = [];
let form = document.getElementById('formPesquisa');
let inputPesquisa = document.getElementById('pesquisa');
let listaProdutosBox = document.querySelector(".listaProdutos");
let listaCompraBox = document.querySelector(".listaCompra");
let imgCarrinhoVazio = document.getElementById('carrinhoVazio');
let totalCarrinho = document.getElementById('valorTotal');
let btnComprar = document.getElementById('btnComprar');
  
if (carrinhoStorage && carrinhoStorage.length > 0) {
  carrinhoCliente = JSON.parse(carrinhoStorage);
  validaCarrinho(carrinhoCliente);
}

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
            let nomeNormalizado = nomeProduto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            let pesquisaProduto = inputPesquisa.value.toLowerCase();
            let pesquisaNormalizada = pesquisaProduto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if (inputPesquisa.value.length === 13 && itens_supermercado[i].codigo_barras === parseInt(inputPesquisa.value) ) {
                //pesquisa por código de barras
                arrayPesquisado = [...arrayPesquisado, itens_supermercado[i]];
                renderizaProdutos(arrayPesquisado);
                return;
            }else if (nomeNormalizado.includes(pesquisaNormalizada)) {
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
                                <button onclick="addToCart(${item.codigo_barras})" class="btnAddCarrinho">ADICIONAR AO CARRINHO</button>
                            </div>
                        </div> `
        listaProdutosBox.insertAdjacentHTML('beforeend' , produto);
    })
}

function addToCart(codigo_barras) {
  itens_supermercado.find((element) => { 
    if (codigo_barras === element.codigo_barras) {
      carrinhoCliente = [...carrinhoCliente, element];
      renderizaCarrinho(carrinhoCliente);
      localStorage.setItem("carrinho", JSON.stringify(carrinhoCliente));
    }
  })
  calcularTotal(carrinhoCliente);
}

function removeItem(i) {
  listaCompraBox.innerHTML = '';
  
  carrinhoCliente.splice(i, 1);
  localStorage.removeItem("carrinho");
  localStorage.setItem("carrinho", JSON.stringify(carrinhoCliente));

  validaCarrinho(carrinhoCliente);

  calcularTotal(carrinhoCliente);
}

function renderizaCarrinho(carrinho) {
  listaCompraBox.innerHTML = '';
  calcularTotal(carrinho);
  
  carrinho.map((item, index) => {
    let valorProduto = String(item.valor);
    let valorReal = 'R$ ' + valorProduto.replace('.', ','); 
    let cardCarrinho = ` <div class="cardProdutoCart">
                            <div class="produtoInfo">
                                <img src="${item.imagem}" alt="">
                                <div class="produtoDescricao">
                                    <div>
                                        <h3 class="nomeProduto">${item.nome}</h3>
                                        <p class="codigoBarra">${item.codigo_barras}</p>
                                    </div>
                                    <p class="valorProduto">${valorReal}</p>
                                </div>
                            </div>
                            <button onclick="removeItem(${index})" title="Remover Item" class="btnRemoveItem">-</button>
                          </div>`
    listaCompraBox.insertAdjacentHTML('beforeend', cardCarrinho);
  })
}

function validaCarrinho(carrinho) {
  if (carrinho.length > 0) {
    renderizaCarrinho(carrinho);
    imgCarrinhoVazio.classList.add('hide');

  }else {
    listaCompraBox.innerHTML = `<img id="carrinhoVazio" src="assets/carrinhoVazio.svg" alt="">`;
  }
}

function calcularTotal(produtos) {
  let total = 0;
  let valorCarrinho;
  let valorReal = '';

  produtos.map( produto => {
    total = total + produto.valor;
  })
  
  valorCarrinho = String(total.toFixed(2));
  valorReal = 'R$ ' + valorCarrinho.replace('.', ',');

  totalCarrinho.innerText = `${valorReal}`;
}

function comprar(){
  let carrinhoFinal = JSON.parse(localStorage.getItem('carrinho'));

  if (carrinhoFinal && carrinhoFinal.length > 0) {
    listaCompraBox.innerHTML = '';
    carrinhoCliente = [];
    localStorage.removeItem('carrinho');
    calcularTotal([]);
    listaCompraBox.innerHTML = `<img id="carrinhoVazio" src="assets/carrinhoVazio.svg" alt="">`;
    setTimeout(() => {alert('Sua compra foi finalizada com sucesso!')}, 200)
  } else {
    alert('Adicione produtos no carrinho!');
  }
}

