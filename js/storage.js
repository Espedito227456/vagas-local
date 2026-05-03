// ===== LOCALSTORAGE HELPERS =====
const Storage = {
  // ========== USUÁRIOS ==========
  getAllUsers() {
    return JSON.parse(localStorage.getItem('vl_users') || '[]');
  },
  
  getUserByEmail(email) {
    return this.getAllUsers().find(u => u.email === email);
  },
  
  getUserById(uid) {
    return this.getAllUsers().find(u => u.uid === uid);
  },
  
  addUser(user) {
    const users = this.getAllUsers();
    users.push(user);
    localStorage.setItem('vl_users', JSON.stringify(users));
  },
  
  updateUser(user) {
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.uid === user.uid);
    if (idx >= 0) {
      users[idx] = user;
      localStorage.setItem('vl_users', JSON.stringify(users));
    }
  },

  // ========== VAGAS ==========
  getAllVagas() {
    return JSON.parse(localStorage.getItem('vl_vagas') || '[]');
  },
  
  getVagaById(id) {
    return this.getAllVagas().find(v => v.id === id);
  },
  
  getVagasByEmpresa(empresaId) {
    return this.getAllVagas().filter(v => v.empresaId === empresaId);
  },
  
  addVaga(vaga) {
    const vagas = this.getAllVagas();
    vagas.push(vaga);
    localStorage.setItem('vl_vagas', JSON.stringify(vagas));
  },
  
  updateVaga(vaga) {
    const vagas = this.getAllVagas();
    const idx = vagas.findIndex(v => v.id === vaga.id);
    if (idx >= 0) {
      vagas[idx] = vaga;
      localStorage.setItem('vl_vagas', JSON.stringify(vagas));
    }
  },

  // ========== CANDIDATURAS ==========
  getAllCandidaturas() {
    return JSON.parse(localStorage.getItem('vl_candidaturas') || '[]');
  },
  
  getCandidaturasByEmpresa(empresaId) {
    const vagasIds = this.getVagasByEmpresa(empresaId).map(v => v.id);
    return this.getAllCandidaturas().filter(c => vagasIds.includes(c.vagaId));
  },
  
  addCandidatura(candidatura) {
    const candidaturas = this.getAllCandidaturas();
    candidaturas.push(candidatura);
    localStorage.setItem('vl_candidaturas', JSON.stringify(candidaturas));
  },

  // ========== ADMIN ==========
  aprovarEmpresa(uid) {
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.uid === uid);
    if (idx >= 0) {
      users[idx].aprovada = true;
      localStorage.setItem('vl_users', JSON.stringify(users));
      return true;
    }
    return false;
  },

  deletarEmpresa(uid) {
    const users = this.getAllUsers();
    const empresa = users.find(u => u.uid === uid);
    
    if (!empresa || empresa.tipo !== 'empresa') {
      return false;
    }

    // Remover usuário
    const usersFiltrados = users.filter(u => u.uid !== uid);
    localStorage.setItem('vl_users', JSON.stringify(usersFiltrados));

    // Remover vagas da empresa
    const vagas = this.getAllVagas();
    const vagasIds = vagas.filter(v => v.empresaId === uid).map(v => v.id);
    const vagasFiltradas = vagas.filter(v => v.empresaId !== uid);
    localStorage.setItem('vl_vagas', JSON.stringify(vagasFiltradas));

    // Remover candidaturas dessas vagas
    const candidaturas = this.getAllCandidaturas();
    const candidaturasFiltradas = candidaturas.filter(c => !vagasIds.includes(c.vagaId));
    localStorage.setItem('vl_candidaturas', JSON.stringify(candidaturasFiltradas));

    return true;
  }
};
