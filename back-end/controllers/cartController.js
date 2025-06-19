const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllCarts(req, res) {
  const carts = await prisma.cart.findMany();
  res.json(carts);
}

async function getCartById(req, res) {
  const cart = await prisma.cart.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json(cart);
}

async function createCart(req, res) {
  const { userId, product, quantity } = req.body;
  const cart = await prisma.cart.create({
    data: { userId, product, quantity }
  });
  res.json(cart);
}

async function updateCart(req, res) {
  const { userId, product, quantity } = req.body;
  const cart = await prisma.cart.update({
    where: { id: parseInt(req.params.id) },
    data: { userId, product, quantity }
  });
  res.json(cart);
}

async function deleteCart(req, res) {
  await prisma.cart.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.json({ message: 'Carrinho deletado' });
}

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
};
