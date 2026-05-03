// ==============================
// INIT APP (PONTO DE ENTRADA)
// ==============================
(function initApp() {
  initAdmin();
  //initVagasExemplo();
})();


// ==============================
// ADMIN PADRÃO
// ==============================
function initAdmin() {
  const users = Storage.getAllUsers() || [];

  const adminExiste = users.find(
    (u) => u.email === 'admin@vagaslocal.com'
  );

  if (!adminExiste) {
    const admin = {
      uid: 'admin-1',
      nome: 'Administrador',
      email: 'admin@vagaslocal.com',
      senha: 'admin123',
      tipo: 'admin',
      cidade: 'São Paulo',
      estado: 'SP',
      aprovada: true,
      criadoEm: new Date().toISOString(),
    };

    Storage.addUser(admin);
  }
}


// ==============================
// VAGAS DE EXEMPLO
// ==============================

//Descomentar se quiser vagas e empresas de exemplo
/*function initVagasExemplo() {
  const vagasExistentes = Storage.getAllVagas() || [];

  if (vagasExistentes.length === 0) {
    const vagasExemplo = [
      {
        id: 'v1',
        titulo: 'Desenvolvedor Front-end',
        descricao: 'Buscamos desenvolvedor front-end para trabalhar com React e Next.js em projetos desafiadores.',
        requisitos: [
          'HTML/CSS/JavaScript avançado',
          'React.js',
          'Git/GitHub',
          'Inglês intermediário',
        ],
        tipoContrato: 'CLT',
        modalidade: 'Híbrido',
        cidade: 'São Paulo',
        estado: 'SP',
        salario: 'R$ 5.000 - 8.000',
        empresaId: 'emp-1',
        empresaNome: 'Tech Solutions',
        status: 'ativa',
        candidaturas: 3,
        criadaEm: new Date().toISOString(),
        expiraEm: '2026-06-01',
      },
      {
        id: 'v2',
        titulo: 'Assistente Administrativo',
        descricao: 'Vaga para assistente administrativo com experiência em rotinas administrativas.',
        requisitos: [
          'Pacote Office',
          'Organização',
          'Comunicação',
        ],
        tipoContrato: 'CLT',
        modalidade: 'Presencial',
        cidade: 'Campinas',
        estado: 'SP',
        salario: 'R$ 2.500',
        empresaId: 'emp-2',
        empresaNome: 'Admin Corp',
        status: 'ativa',
        candidaturas: 1,
        criadaEm: new Date().toISOString(),
        expiraEm: '2026-06-15',
      },
      {
        id: 'v3',
        titulo: 'Designer Gráfico Freelancer',
        descricao: 'Procuramos designer para projetos pontuais de identidade visual.',
        requisitos: [
          'Photoshop/Illustrator',
          'Criatividade',
          'Portfólio',
        ],
        tipoContrato: 'Freelancer',
        modalidade: 'Remoto',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        salario: 'R$ 50/hora',
        empresaId: 'emp-3',
        empresaNome: 'Criativa Studio',
        status: 'ativa',
        candidaturas: 0,
        criadaEm: new Date().toISOString(),
        expiraEm: '2026-05-30',
      },
    ];

    vagasExemplo.forEach((vaga) => {
      Storage.addVaga(vaga);
    });
  }
}*/


/*
Limpa TUDO e recria só o admin
localStorage.clear();
sessionStorage.clear();
location.reload();
*/
