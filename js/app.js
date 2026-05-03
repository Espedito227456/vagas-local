// Atualizar header conforme login
function atualizarHeader() {
  const nav = document.getElementById('nav');
  const user = Auth.getCurrentUser();
  
  if (!nav) return;
  
  if (user) {
    let link = '';
    if (user.tipo === 'empresa') link = 'empresa/dashboard.html';
    else if (user.tipo === 'admin') link = 'admin/index.html';
    else link = 'index.html';
    
    nav.innerHTML = `
      <a href="${link}">Minha Conta</a>
      <span style="color: var(--gray); font-size: 0.875rem;">${user.nome}</span>
      <button onclick="logout()" class="btn btn-outline btn-sm">Sair</button>
    `;
  }
}

// Filtrar vagas
function filtrarVagas() {
  const busca = document.getElementById('busca').value.toLowerCase();
  const cidade = document.getElementById('cidade').value.toLowerCase();
  const tipo = document.getElementById('tipoContrato').value;
  const modalidade = document.getElementById('modalidade').value;
  
  let vagas = Storage.getAllVagas().filter(v => v.status === 'ativa');
  
  if (busca) {
    vagas = vagas.filter(v => 
      v.titulo.toLowerCase().includes(busca) || 
      v.descricao.toLowerCase().includes(busca)
    );
  }
  if (cidade) {
    vagas = vagas.filter(v => v.cidade.toLowerCase().includes(cidade));
  }
  if (tipo) vagas = vagas.filter(v => v.tipoContrato === tipo);
  if (modalidade) vagas = vagas.filter(v => v.modalidade === modalidade);
  
  renderizarVagas(vagas);
}

function renderizarVagas(vagas) {
  const container = document.getElementById('vagas-container');
  const semVagas = document.getElementById('sem-vagas');
  
  if (vagas.length === 0) {
    container.innerHTML = '';
    semVagas.classList.remove('hidden');
    return;
  }
  
  semVagas.classList.add('hidden');
  container.innerHTML = vagas.map(vaga => `
    <a href="vaga.html?id=${vaga.id}" class="vaga-card">
      <div class="vaga-header">
        <div>
          <h3 class="vaga-titulo">${vaga.titulo}</h3>
          <p class="vaga-empresa">${vaga.empresaNome}</p>
        </div>
        <span class="vaga-badge badge-${vaga.tipoContrato.toLowerCase()}">${vaga.tipoContrato}</span>
      </div>
      <div class="vaga-info">
        <span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          ${vaga.cidade}, ${vaga.estado}
        </span>
        <span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          ${vaga.modalidade}
        </span>
        ${vaga.salario ? `
        <span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          ${vaga.salario}
        </span>` : ''}
      </div>
      <div class="vaga-footer">
        <span class="vaga-data">${vaga.candidaturas || 0} candidaturas</span>
        <span style="color: var(--primary); font-weight: 600; font-size: 0.875rem;">Ver detalhes →</span>
      </div>
    </a>
  `).join('');
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  atualizarHeader();
  
  // Se estiver na home, carregar vagas, ou descomentar se quiser vagas fantasmas de exemplo
  if (document.getElementById('vagas-container')) {
    filtrarVagas();
  }
});
