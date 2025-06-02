document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = e.target.nome.value;
  const email = e.target.email.value;
  const senha = e.target.senha.value;

  try {
    const response = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    } else {
      const error = await response.json();
      alert("Erro: " + error.message);
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro ao cadastrar. Tente novamente.");
  }
});
