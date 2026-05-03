const Auth = {
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('vl_user') || 'null');
  },
  
  setCurrentUser(user) {
    sessionStorage.setItem('vl_user', JSON.stringify(user));
  },
  
  logout() {
    sessionStorage.removeItem('vl_user');
    window.location.href = '../index.html';
  }
};

function logout() {
  Auth.logout();
}

function fazerLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;
  
  const user = Storage.getUserByEmail(email);
  
  if (!user || user.senha !== senha) {
    mostrarMensagem('Email ou senha incorretos', 'error');
    return;
  }
  
  if (user.tipo === 'empresa' && !user.aprovada) {
    mostrarMensagem('Sua empresa ainda não foi aprovada pelo administrador. Aguarde!', 'error');
    return;
  }
  
  Auth.setCurrentUser(user);
  
  // Redirecionar conforme tipo
  if (user.tipo === 'admin') window.location.href = 'admin/index.html';
  else if (user.tipo === 'empresa') window.location.href = 'empresa/dashboard.html';
  else window.location.href = 'index.html';
}

function fazerCadastro(e) {
  e.preventDefault();
  
  const tipo = document.getElementById('cad-tipo').value;
  
  // Validação básica
  const email = document.getElementById('cad-email').value;
  if (Storage.getUserByEmail(email)) {
    mostrarMensagem('Este email já está cadastrado', 'error');
    return;
  }
  
  const user = {
    uid: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    nome: document.getElementById('cad-nome').value,
    email: email,
    senha: document.getElementById('cad-senha').value,
    cidade: document.getElementById('cad-cidade').value,
    estado: document.getElementById('cad-estado').value.toUpperCase(),
    tipo: tipo,
    aprovada: tipo !== 'empresa', // Apenas empresa precisa de aprovação
    criadoEm: new Date().toISOString()
  };
  
  if (tipo === 'empresa') {
    user.nomeEmpresa = document.getElementById('cad-nome-empresa').value;
    user.cnpj = document.getElementById('cad-cnpj').value;
  }
  
  Storage.addUser(user);
  mostrarMensagem('✅ Cadastro realizado com sucesso! Faça login.', 'success');
  
  // Limpar formulário e mostrar login
  document.getElementById('form-cadastro').reset();
  toggleEmpresaFields(); // Resetar campos da empresa
  
  // Trocar para aba de login após 1.5 segundos
  setTimeout(() => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.getElementById('form-cadastro').classList.add('hidden');
    document.getElementById('form-login').classList.remove('hidden');
  }, 1500);
}

function mostrarMensagem(msg, tipo) {
  const div = document.getElementById('auth-mensagem');
  div.innerHTML = `<div class="alert alert-${tipo} mt-4">${msg}</div>`;
  
  // Limpar mensagem após 5 segundos
  setTimeout(() => {
    div.innerHTML = '';
  }, 5000);
}
