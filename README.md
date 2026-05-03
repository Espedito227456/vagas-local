# VagasLocal 🏢💼

Plataforma de vagas de emprego focada em conectar talentos locais às empresas da sua cidade/região.

> **Status:** MVP (Minimum Viable Product) - Em desenvolvimento local com LocalStorage

---

## 🎯 Objetivo

Criar um ecossistema de empregos regional onde:
- **Empresas** publicam vagas gratuitamente (após aprovação)
- **Candidatos** encontram oportunidades próximas de casa
- **Admin** modera e aprova empresas para garantir qualidade

---

## 🛠️ Tecnologias Atuais

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript (vanilla) |
| UI | CSS Grid, Flexbox, Mobile-first |
| Armazenamento | LocalStorage (MVP) |
| Ícones | SVG inline (Lucide-style) |

---

## 📁 Estrutura do Projeto
vagas-local/
├── index.html
├── vaga.html
├── login.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── storage.js
│   ├── auth.js
│   ├── vagas.js
│   └── app.js
├── empresa/
│   ├── dashboard.html
│   ├── nova-vaga.html
│   └── candidaturas.html
└── admin/
    └── index.html





🗂️ Mapa Visual
┌─────────────────────────────────────────┐
│           PÁGINAS PÚBLICAS              │
├─────────────────────────────────────────┤
│  index.html  →  Listagem de vagas       │
│  vaga.html   →  Detalhe + candidatura   │
│  login.html  →  Login / Cadastro        │
└─────────────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
┌─────────────────┐  ┌─────────────────┐
│   ÁREA EMPRESA  │  │   ÁREA ADMIN    │
├─────────────────┤  ├─────────────────┤
│ empresa/        │  │ admin/          │
│ ├── dashboard   │  │ └── index.html  │
│ ├── nova-vaga   │  │     (aprovar/   │
│ └── candidaturas│  │      excluir)   │
└─────────────────┘  └─────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│           RECURSOS ESTÁTICOS            │
├─────────────────────────────────────────┤
│  css/style.css  →  Estilos globais      │
│  js/storage.js  →  Banco de dados local │
│  js/auth.js     →  Controle de acesso   │
│  js/vagas.js    →  Dados iniciais       │
│  js/app.js      →  Interatividade       │
└─────────────────────────────────────────┘




📋 Descrição de Cada Arquivo
Arquivo	Responsabilidade	
`index.html`	Hero, filtros, grid de vagas, navegação	
`vaga.html`	Título, descrição, requisitos, formulário de candidatura	
`login.html`	Tabs login/cadastro, formulários por tipo de usuário	
`css/style.css`	Variáveis CSS, layout, responsividade, componentes	
`js/storage.js`	Todas as operações de leitura/escrita no LocalStorage	
`js/auth.js`	Login, logout, verificar sessão atual	
`js/vagas.js`	Cria admin padrão ao carregar (se não existir)	
`js/app.js`	Renderizar vagas, filtros, atualizar header por login	
`empresa/dashboard.html`	Estatísticas, tabela de vagas da empresa, encerrar vaga	
`empresa/nova-vaga.html`	Formulário completo de publicação de vaga	
`empresa/candidaturas.html`	Lista de candidatos, mudar status, modal de detalhes	
`admin/index.html`	Aprovar empresas, excluir empresas, estatísticas gerais



🔗 Fluxo de Navegação
[Visitante]
    │
    ▼
[index.html] ──► [vaga.html] ──► candidatura (sem login)
    │                              │
    ▼                              ▼
[login.html] ◄────────────────── candidatura (com login)
    │
    ├──► [empresa/dashboard.html] ──► [nova-vaga.html]
    │         │
    │         └──► [candidaturas.html]
    │
    └──► [admin/index.html]




🎯 Convenções de Nomenclatura
Elemento	Padrão	Exemplo	
Pastas	minúsculas, hífen	`empresa/`, `nova-vaga.html`	
Arquivos HTML	minúsculas, hífen	`candidaturas.html`	
Arquivos JS	minúsculas, camelCase	`storage.js`, `deletarEmpresa()`	
IDs HTML	minúsculas, hífen	`tabela-pendentes`, `form-candidatura`	
Classes CSS	minúsculas, hífen	`vaga-card`, `btn-primary`	
Variáveis JS	camelCase	`nomeEmpresa`, `totalVagas`	




📦 Para Produção (futuro)
vagas-local/
├── 📁 public/                    # Frontend estático
│   ├── index.html
│   ├── css/
│   └── js/
│
├── 📁 server/                    # Backend Node.js
│   ├── 📄 server.js
│   ├── 📁 routes/
│   ├── 📁 controllers/
│   └── 📁 models/
│
├── 📁 database/                  # Migrations SQL
│   └── 📄 schema.sql
│
├── 📄 package.json
├── 📄 .env
└── 📄 README.md







---

## 🚀 Como Executar Localmente

1. **Clone ou baixe** o projeto
2. **Abra o arquivo** `index.html` em qualquer navegador moderno
   - Não requer servidor web (funciona com duplo clique)
3. **Faça login como admin** para gerenciar:
   - Email: `admin@vagaslocal.com`
   - Senha: `admin123`

---

## 👥 Perfis de Usuário

### 1. Administrador
- Aprova ou rejeita empresas cadastradas
- Exclui empresas, vagas e candidaturas associadas
- Visualiza estatísticas gerais do sistema

### 2. Empresa
- Cadastra-se (fica pendente até aprovação do admin)
- Publica vagas com título, descrição, requisitos, salário, localização
- Gerencia candidaturas recebidas (aprovar, rejeitar, colocar em análise)
- Visualiza estatísticas de suas vagas

### 3. Candidato
- Navega vagas sem login
- Filtra por cidade, tipo de contrato, modalidade
- Candidata-se enviando nome, email, telefone, mensagem e currículo (simulado)
- Não requer cadastro para candidatura

---

## ✨ Funcionalidades Implementadas

| Funcionalidade | Status |
|----------------|--------|
| Cadastro de candidato | ✅ |
| Cadastro de empresa (com aprovação) | ✅ |
| Login com roles (admin/empresa) | ✅ |
| Publicação de vagas | ✅ |
| Filtro de vagas (cidade, contrato, modalidade) | ✅ |
| Candidatura com currículo | ✅ |
| Painel admin (aprovar/excluir empresas) | ✅ |
| Dashboard empresa (estatísticas) | ✅ |
| Gerenciamento de candidaturas (status) | ✅ |
| Responsividade mobile | ✅ |

---

## ⚠️ Limitações Atuais (MVP)

| Limitação | Motivo | Solução Futura |
|-----------|--------|--------------|
| LocalStorage | Sem backend real | Migrar para MySQL/PostgreSQL + Node.js |
| Senhas em texto plano | Sem hash | bcrypt + autenticação JWT |
| Currículo simulado | Sem storage de arquivos | Firebase Storage ou AWS S3 |
| Sem notificações | Sem servidor | Email/SMS com SendGrid/Twilio |
| Sem busca full-text | LocalStorage limitado | Elasticsearch ou PostgreSQL tsvector |
| Dados no navegador | Inseguro para produção | Backend com banco de dados próprio |

---

## 🔮 Roadmap

### Fase 1: Validação (agora)
- [x] MVP funcional com LocalStorage
- [x] Testes com usuários reais (amigos, familiares)
- [ ] Coletar feedback de empresas locais

### Fase 2: Backend Real
- [ ] Migrar para Node.js + Express + MySQL/PostgreSQL
- [ ] Hash de senhas com bcrypt
- [ ] JWT para autenticação segura
- [ ] Upload real de currículos (PDF)

### Fase 3: Escalabilidade
- [ ] Deploy em VPS (DigitalOcean, Hetzner)
- [ ] HTTPS + SSL
- [ ] Rate limiting + proteção CSRF
- [ ] Paginação e cache

### Fase 4: Diferenciais
- [ ] Notificações por email/WhatsApp
- [ ] App mobile (React Native/Flutter)
- [ ] Sistema de indicação premiada
- [ ] Vagas verificadas (selo de empresa visitada)

---

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📝 Licença

MIT License - Livre para uso pessoal e comercial.

---

## 👤 Espedito Marques

Desenvolvido com foco em ajudar comunidades locais a encontrarem oportunidades de emprego.

---

## 📞  (11)959508227

Para dúvidas, sugestões ou parcerias, entre em contato.

---

> **Nota:** Este projeto está em fase MVP. Não use em produção sem migrar para um backend seguro com banco de dados real.
