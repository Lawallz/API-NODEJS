const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CRUD User
async function getAllUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
}

async function getUserById(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json(user);
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password }
  });
  res.json(user);
}

async function updateUser(req, res) {
  const { name, email, password } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: { name, email, password }
  });
  res.json(user);
}

async function deleteUser(req, res) {
  await prisma.user.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.json({ message: 'Usuário deletado' });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
