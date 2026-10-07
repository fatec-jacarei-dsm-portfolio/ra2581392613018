// Conteúdo do portfólio. Edite aqui; o HTML é montado por main.js.
// Estrutura conforme as orientações da Fatec Jacareí (DSM):
// apresentação, projetos (acadêmicos / profissionais / pessoais), complementares, vídeos e contatos.
window.PORTFOLIO_DATA = {
  profile: {
    name: "Renan",
    fullName: "Renan Rodrigues Mendonca dos Santos",
    ra: "2581392613018",
    role: "Desenvolvedor de Web Apps",
    intro: "Desenvolvo web apps claros, responsivos e construídos para resolver problemas reais.",
    about:
      "Sou estudante de Desenvolvimento de Software Multiplataforma na Fatec Jacareí. Desde junho de 2023 trabalho na Betinhos Executive Service, onde cuido do site institucional e dos sistemas internos de operação, do formulário web ao painel de gestão.",
    objective:
      "Busco oportunidades para desenvolver aplicações web completas, com atenção a interfaces responsivas, experiência do usuário, qualidade de código e manutenção.",
    interests: [
      "Desenvolvimento web",
      "Apps mobile e desktop",
      "Integração de dados",
      "Automação de processos",
      "UX e produto digital",
    ],
    currentSemester: "2DSM",
  },

  // Categorias exibidas nesta ordem quando o filtro é "Todos".
  categories: [
    { key: "academicos", label: "Acadêmicos", description: "Projetos integradores (ABP) e trabalhos do curso." },
    { key: "profissionais", label: "Profissionais", description: "Entregas reais na Betinhos Executive Service." },
    { key: "pessoais", label: "Pessoais", description: "Experimentos e produtos criados por conta própria." },
  ],

  projects: [
    // ---- Acadêmicos ----
    {
      name: "Scrum Dungeon",
      category: "academicos",
      type: "Projeto Integrador (ABP)",
      semester: "1DSM – 1º Sem. 2026",
      description:
        "RPG educativo criado pela equipe Octopus Code para ensinar Scrum por meio de cinco níveis progressivos, desafios interativos, avaliação de desempenho e certificado digital.",
      contribution:
        "Front-end das telas de login, cadastro e página inicial; desenvolvimento do capítulo 4 e seu minigame; responsividade do mapa, questionário, certificado e demais capítulos; testes de interface e geração do certificado em PDF.",
      technologies: ["HTML", "CSS", "JavaScript", "EJS", "Node.js", "Express", "PostgreSQL"],
      repository: "https://github.com/octopusCode26/scrum-dungeon",
      linkLabel: "Abrir repositório",
      featured: true,
    },

    // ---- Profissionais ----
    {
      name: "Site institucional Betinhos",
      category: "profissionais",
      type: "Profissional",
      semester: "1DSM e 2DSM – 2026",
      period: "Junho de 2023 – atual",
      description:
        "Site institucional da Betinhos Executive Service, empresa de transporte executivo corporativo que atende São José dos Campos, Vale do Paraíba e outros eixos do Sudeste.",
      contribution:
        "Desenvolvedor responsável pela melhoria contínua do site: novas seções, ajustes de conteúdo, desempenho e responsividade, mantendo a experiência digital clara, atual e funcional.",
      technologies: ["React", "Vinext", "Vite", "JavaScript", "CSS"],
      repository: "Repositório privado",
      link: "https://www.betinhos.com.br",
      linkLabel: "Acessar site",
      featured: true,
    },
    {
      name: "Formulário Geral de Serviços",
      category: "profissionais",
      type: "Profissional",
      semester: "1DSM e 2DSM – 2026",
      description:
        "Formulário web embutido no CRM da empresa para cadastro de clientes, passageiros, serviços e veículos, com validações em tempo real e gravação direta no Dataverse.",
      contribution:
        "Desenvolvi a tela em HTML, CSS e JavaScript puro, modelei as tabelas e relacionamentos no Dataverse, escrevi a camada de integração com a Web API e automatizei a compilação e publicação do WebResource.",
      technologies: ["HTML", "CSS", "JavaScript", "Dataverse", "Web API", "Node.js"],
      repository: "Repositório privado",
    },
    {
      name: "App Motoristas",
      category: "profissionais",
      type: "Profissional",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Aplicativo mobile para motoristas registrarem cada etapa do serviço (chegada, embarque, desembarque) e consultarem a agenda do dia, com notificações automáticas para a central.",
      contribution:
        "Projetei telas e fluxo de uso, implementei a lógica em Power Fx, integrei o app ao Dataverse e criei os fluxos de notificação no Power Automate.",
      technologies: ["Power Apps", "Power Fx", "Dataverse", "Power Automate"],
      repository: "Repositório privado",
    },
    {
      name: "Painéis operacionais",
      category: "profissionais",
      type: "Profissional",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Relatórios de faturamento, ocupação da frota e desempenho de atendimento, conectados ao Dataverse e ao SharePoint para apoiar decisões da gestão.",
      contribution:
        "Modelei as fontes de dados e as medidas, e desenhei os painéis com foco em leitura rápida pela diretoria.",
      technologies: ["Power BI", "DAX", "Dataverse", "SharePoint"],
      repository: "Repositório privado",
    },

    // ---- Pessoais ----
    {
      name: "TapFinance",
      category: "pessoais",
      type: "Pessoal · Mobile",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Aplicativo Android, local-first, para registrar receitas e despesas em poucos segundos. Valores em centavos no SQLite, sem conta, backend ou nuvem. APK publicado nas releases do GitHub.",
      contribution:
        "Projeto individual: concepção, design das telas, modelagem do banco local, build Android com Expo e publicação das releases.",
      technologies: ["React Native", "Expo", "TypeScript", "SQLite"],
      repository: "https://github.com/renanrmsantos14/tapfinance",
      featured: true,
    },
    {
      name: "Painel Agentes",
      category: "pessoais",
      type: "Pessoal · Desktop",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Aplicativo desktop para acompanhar e organizar sessões de agentes de IA em um único painel, com versionamento automático de build.",
      contribution:
        "Projeto individual: interface em TypeScript, empacotamento nativo com Tauri e scripts de build, versão e release.",
      technologies: ["TypeScript", "Vite", "Tauri", "Rust"],
      repository: "https://github.com/renanrmsantos14/painel-agentes",
    },
    {
      name: "Site Grupo Mendonça",
      category: "pessoais",
      type: "Pessoal · Web",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Site institucional com catálogo e checkout, servidor Node.js e banco SQLite, com fluxo completo de pedidos, gestão e acompanhamento.",
      contribution:
        "Projeto individual: direção de design, 20 páginas em HTML/CSS, servidor Node.js, testes automatizados e pipeline de build com versionamento.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "SQLite"],
      repository: "https://github.com/renanrmsantos14/site-grupo-mendonca",
    },
    {
      name: "Segmentador Recursivo de Imagens",
      category: "pessoais",
      type: "Pessoal · Web",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Aplicação web que carrega uma imagem e a divide em regiões por similaridade de cores, com tolerância ajustável em tempo real.",
      contribution:
        "Projeto individual: algoritmo de segmentação recursiva, processamento de pixels com Canvas e interface de ajuste.",
      technologies: ["TypeScript", "HTML Canvas", "CSS"],
      repository: "",
    },
  ],

  education: [
    {
      course: "Desenvolvimento de Software Multiplataforma",
      institution: "Fatec Jacareí",
      period: "Ingresso em 2026 · cursando o 2DSM",
    },
  ],

  experience: [
    {
      company: "Betinhos Executive Service",
      role: "Desenvolvedor · TI e Marketing",
      period: "Junho de 2023 – atual",
      focus: "Site institucional, sistemas internos no Power Platform e Dataverse, automações e painéis.",
    },
  ],

  // Cursos e certificações (opcional). Deixe vazio para ocultar o bloco.
  courses: [],

  skills: {
    "Front-end": ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
    "Mobile e desktop": ["React Native", "Expo", "Tauri"],
    "Back-end e dados": ["Node.js", "Express", "SQL", "PostgreSQL", "SQLite", "APIs REST e JSON"],
    "Low-code e nuvem": ["Power Apps", "Power Automate", "Power BI", "Dataverse", "SharePoint"],
    Ferramentas: ["Git e GitHub", "Docker", "npm", "VS Code", "Figma"],
  },

  languages: ["Português – nativo", "Inglês – fluente"],
  interests: ["Desenvolvimento de web apps", "Interfaces acessíveis", "Produto digital", "Automação e dados"],

  videos: [
    { label: "2DSM", url: "", note: "Apresentação dos projetos de 1DSM e 2DSM" },
    { label: "4DSM", url: "", note: "Apresentação dos projetos de 3DSM e 4DSM" },
    { label: "6DSM", url: "", note: "Apresentação dos projetos de 5DSM e 6DSM" },
  ],

  // Apenas redes profissionais, conforme as orientações.
  social: {
    github: "https://github.com/renanrmsantos14",
    linkedin: "https://www.linkedin.com/in/renan-santos-40662738b",
  },
};
