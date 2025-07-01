const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../front-end')));

// importação dos controllers
const userController = require('./controllers/userController');
const cartController = require('./controllers/cartController');

// Rotas Usuário
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Rotas Carrinho
app.get('/carrinho', cartController.getCart);
app.post('/carrinho', cartController.addToCart);
app.put('/carrinho/:id', cartController.updateCart);
app.delete('/carrinho/:id', cartController.deleteCart);
app.delete('/carrinho', cartController.clearCart); // Rota para limpar todo o carrinho

// Rotas adicionais 
app.get('/carts', cartController.getCart);
app.post('/carts', cartController.addToCart);

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});