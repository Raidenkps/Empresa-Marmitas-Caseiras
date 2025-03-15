// Menu Hamburguer
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-list').classList.toggle('active');
});

// Carrinho de Compras
let carrinho = [];
let valorTotal = 0;

document.getElementById('adicionar-carrinho').addEventListener('click', function() {
    const tamanho = document.getElementById('tamanho').value;
    const tipo = document.getElementById('tipo').value;
    const acompanhamentos = [];
    const sobremesas = [];

    // Preços das marmitas
    const precosMarmita = {
        tradicional: { P: 22.99, M: 29.99, G: 39.99 },
        caseirinho: { P: 17.99, M: 22.99, G: 27.99 },
        'dia-a-dia': { P: 14.99, M: 19.99, G: 24.99 }
    };

    // Calcula o valor da marmita
    let valorMarmita = precosMarmita[tipo][tamanho];

    // Acompanhamentos (gratuitos)
    document.querySelectorAll('.acompanhamentos input:checked').forEach(item => {
        acompanhamentos.push(item.name);
    });

    // Sobremesas (com preço)
    document.querySelectorAll('.sobremesas input:checked').forEach(item => {
        const preco = parseFloat(item.getAttribute('data-preco'));
        sobremesas.push({ nome: item.name, preco });
        valorMarmita += preco;
    });

    const pedido = {
        tamanho,
        tipo,
        acompanhamentos,
        sobremesas,
        valor: valorMarmita
    };

    carrinho.push(pedido);
    valorTotal += valorMarmita;
    atualizarCarrinho();
});

function atualizarCarrinho() {
    const resumo = document.getElementById('resumo-carrinho');
    resumo.innerHTML = '';

    carrinho.forEach((pedido, index) => {
        const item = document.createElement('div');
        item.innerHTML = `
            <p>Marmita ${pedido.tipo} (${pedido.tamanho}) - R$${pedido.valor.toFixed(2)}</p>
            <p>Acompanhamentos: ${pedido.acompanhamentos.join(', ')}</p>
            <p>Sobremesas: ${pedido.sobremesas.map(s => s.nome).join(', ')}</p>
            <button onclick="removerPedido(${index})">Remover</button>
        `;
        resumo.appendChild(item);
    });

    document.getElementById('valor-total').textContent = `Total: R$${valorTotal.toFixed(2)}`;
}

function removerPedido(index) {
    valorTotal -= carrinho[index].valor;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Finalizar Pedido
document.getElementById('finalizar-pedido').addEventListener('click', function() {
    alert('Pedido finalizado! Obrigado por comprar conosco.');
    carrinho = [];
    valorTotal = 0;
    atualizarCarrinho();
});