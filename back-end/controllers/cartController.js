const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// lista todos os itens do carrinho
async function getCart(req, res) {
  try {
    const cart = await prisma.cart.findMany(); // todos os registros de cart, retorna o array atraves da findmany
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o carrinho', error }); // retorna um erro do tipo 500 com a mensagem erro ao buscar o cart
  }
}

// Add item ao carrinho
async function addToCart(req, res) {
  const { product, preco, quantity = 1 } = req.body;

  if (!product || typeof preco !== 'number') {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  try {
    const item = await prisma.cart.create({
      data: {
        product,
        preco,
        quantity
      }
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar item', error });
  }
}

// atualiza item do carrinho
async function updateCart(req, res) {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;

  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ message: 'Quantidade inválida' });
  }

  try {
    const itemAtualizado = await prisma.cart.update({
      where: { id },
      data: { quantity }
    });

    res.json(itemAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar quantidade', error });
  }
}

// remove item do carrinho
async function deleteCart(req, res) {
  const id = parseInt(req.params.id);
  
  try {
    await prisma.cart.delete({
      where: { id }
    });
    res.json({ message: 'Item removido do carrinho' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover item', error });
  }
}

// limpa todo o carrinho
async function clearCart(req, res) {
  try {
    await prisma.cart.deleteMany(); // deleta todo o array
    res.json({ message: 'Carrinho limpo' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao limpar carrinho', error });
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteCart,
  clearCart
};