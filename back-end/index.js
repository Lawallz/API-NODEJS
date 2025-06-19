const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const userController = require('./controllers/userController');
const cartController = require('./controllers/cartController');

// Rotas Usuário
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Rotas Carrinho
app.get('/carts', cartController.getAllCarts);
app.get('/carts/:id', cartController.getCartById);
app.post('/carts', cartController.createCart);
app.put('/carts/:id', cartController.updateCart);
app.delete('/carts/:id', cartController.deleteCart);

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
