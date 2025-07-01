// função para adicionar ao carrinho 
async function adicionarAoCarrinho(nome, preco) {
  try {
    const response = await fetch('http://localhost:3000/carrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        product: nome, 
        preco: preco,
        quantity: 1
      })
    });
    
    if (response.ok) {
      // atualiza o contador do carrinho
      atualizarContadorCarrinho();
      alert('Item adicionado ao carrinho!');
    } else {
      alert('Erro ao adicionar item.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao adicionar item.');
  }
}

// atualiza o contador de itens no carrinho
async function atualizarContadorCarrinho() {
  try {
    const response = await fetch('http://localhost:3000/carrinho');
    const itens = await response.json();
    
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
      contador.textContent = itens.length;
    }
  } catch (error) {
    console.error('Erro ao atualizar contador:', error);
  }
}

// Redireciona para a página do carrinho
function irParaCarrinho() {
  window.location.href = 'carrinho.html';
}