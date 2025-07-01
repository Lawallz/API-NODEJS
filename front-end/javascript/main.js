function adicionarAoCarrinho(nome, preco) {
  fetch('http://localhost:3000/carrinho', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      product: nome, 
      preco: preco, 
      quantity: 1 //
    })
  })
  .then(response => {
    if (!response.ok) throw new Error();
    return response.json();
  })
  .then(data => {
    alert('Item adicionado ao carrinho!');
  })
  .catch(() => {
    alert('Erro ao adicionar item!');
  });
}

async function carregarUsuarios() {
  const resposta = await fetch('http://localhost:3000/usuarios');
  const usuarios = await resposta.json();

  const tbody = document.querySelector('#tabela-usuarios tbody');
  tbody.innerHTML = '';

  usuarios.forEach(usuario => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario.name}</td>
      <td>${usuario.email}</td>
      <td>
        <button onclick="editarUsuario(${usuario.id}, '${usuario.name}', '${usuario.email}')">Editar</button>
        <button onclick="deletarUsuario(${usuario.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function salvarUsuario(event) {
  event.preventDefault();
  const id = document.getElementById('usuario-id').value;
  const name = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  const dados = { name, email, password };

  const url = id
    ? `http://localhost:3000/usuarios/${id}`
    : 'http://localhost:3000/usuarios';

  const metodo = id ? 'PUT' : 'POST';

  await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  document.getElementById('form-usuario').reset();
  carregarUsuarios();
}

function editarUsuario(id, nome, email) {
  document.getElementById('usuario-id').value = id;
  document.getElementById('nome').value = nome;
  document.getElementById('email').value = email;
}

async function deletarUsuario(id) {
  if (confirm('Tem certeza que deseja excluir esse usuário?')) {
    await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });
    carregarUsuarios();
  }
}

document.getElementById('form-usuario').addEventListener('submit', salvarUsuario);
carregarUsuarios();
