// Conteúdo do portfólio. Edite aqui; o HTML é montado por main.js.
// Estrutura conforme as orientações da Fatec Jacareí (DSM):
// apresentação, projetos (acadêmicos / profissionais / pessoais), complementares, vídeos e contatos.
window.PORTFOLIO_DATA = {
  profile: {
    name: "Renan",
    displayName: "Renan Santos",
    fullName: "Renan Rodrigues Mendonca dos Santos",
    ra: "2581392613018",
    role: "Desenvolvedor de Web Apps",
    intro:
      "Desenvolvo web apps claros e responsivos para resolver problemas reais. Em produção na Betinhos Executive Service desde 2023.",
    // Card "Com o que eu trabalho" do topo.
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Power Platform", "Dataverse"],
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
    // Semestre atual é calculado por data a partir do ingresso (main.js).
    entry: { year: 2026, term: 1 },
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
      name: "GreenER",
      category: "academicos",
      type: "Projeto Integrador (ABP)",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Plataforma de GreenOps da equipe Green Stack que estima o consumo energético e as emissões de CO₂e de aplicações a partir de métricas de CPU, RAM, disco e rede e da intensidade de carbono da matriz elétrica regional.",
      contribution:
        "Criei a base do front-end em React e TypeScript (estrutura, rotas e cliente HTTP), as telas de filtros por serviço, região e período e de comparação entre 2 e 5 serviços, e a exibição da última coleta nos indicadores; no back-end, os endpoints de serviços e coletas e o tratamento de localização ausente; no banco, o schema, o seed e os repositórios com SQL parametrizado; também configurei o deploy no Render, os templates de issue e PR e parte da documentação das sprints e diagramas UML.",
      problem: "Equipes de desenvolvimento não sabem quanta energia suas aplicações consomem nem quanto CO₂e elas geram.",
      result: "Plataforma publicada no Render que estima consumo e emissões por serviço, região e período, com comparação entre serviços.",
      status: "Publicado",
      technologies: ["React", "TypeScript", "Vite", "Node.js", "PostgreSQL", "Docker", "Render"],
      repository: "https://github.com/greenstackfatec-tech/greener",
      linkLabel: "Abrir repositório",
    },
    {
      name: "Scrum Dungeon",
      category: "academicos",
      type: "Projeto Integrador (ABP)",
      semester: "1DSM – 1º Sem. 2026",
      description:
        "RPG educativo criado pela equipe Octopus Code para ensinar Scrum por meio de cinco níveis progressivos, desafios interativos, avaliação de desempenho e certificado digital.",
      contribution:
        "Front-end das telas de login, cadastro e página inicial; desenvolvimento do capítulo 4 e seu minigame; responsividade do mapa, questionário, certificado e demais capítulos; testes de interface e geração do certificado em PDF.",
      problem: "Aprender Scrum só pela teoria é abstrato e pouco envolvente para quem está começando.",
      result: "RPG jogável com cinco níveis, avaliação de desempenho e certificado digital em PDF ao final.",
      technologies: ["HTML", "CSS", "JavaScript", "EJS", "Node.js", "Express", "PostgreSQL"],
      repository: "https://github.com/octopusCode26/scrum-dungeon",
      linkLabel: "Abrir repositório",
    },

    // ---- Profissionais ----
    {
      name: "Sistema Betinhos",
      category: "profissionais",
      case: true,
      type: "Profissional",
      semester: "1DSM e 2DSM – 2026",
      period: "Junho de 2026 – atual · 9 apps e 8 pacotes",
      description:
        "Sistema interno da Betinhos Executive Service, usado por clientes, operação, financeiro, frota, RH e motoristas.",
      problem:
        "A empresa rodava em WhatsApp, planilhas e conferência manual, com retrabalho e pouco registro do que era feito.",
      contribution:
        "Desenhei e desenvolvi o sistema de ponta a ponta: telas em React e TypeScript, modelagem e regras no Dataverse, plugins em C#, Workers na Cloudflare e deploy automático com migrations de schema.",
      result: "Operação, financeiro, frota e RH passaram a trabalhar num sistema só, com menos retrabalho e tudo registrado.",
      status: "Em produção",
      solved: [
        ["Faturamento", "O faturamento dependia de planilhas e de idas e voltas com o cliente.", "O cliente valida os serviços ao longo do mês, sem esperar o fechamento."],
        ["Despesas", "As despesas de viagem dependiam de lançamento e conferência manual.", "As compras entram sozinhas e voltam ao motorista quando precisam de correção."],
        ["Multas e folha", "Multas e descontos eram tratados por mensagem e listas feitas à mão.", "Um processo só, do aviso ao motorista até o desconto em folha."],
        ["Comunicados", "Não havia como comprovar que a equipe recebeu e leu os comunicados.", "Cada comunicado gera um comprovante de leitura e assinatura."],
        ["Serviço em campo", "Sem internet, o registro do serviço podia se perder.", "O app guarda tudo e envia quando a conexão volta."],
        ["Acessos", "Todo mundo no escritório via e alterava todos os dados.", "Cada área vê e altera só o que é dela."],
      ],
      technologies: ["React", "TypeScript", "Vite", "Dataverse", "C#", "Cloudflare Workers", "Power Automate"],
      repository: "Uso interno da empresa",
    },
    {
      name: "Site institucional Betinhos",
      category: "profissionais",
      case: true,
      type: "Profissional",
      semester: "1DSM e 2DSM – 2026",
      period: "Junho de 2023 – atual",
      description:
        "Site institucional da Betinhos Executive Service, empresa de transporte executivo corporativo que atende São José dos Campos, Vale do Paraíba e outros eixos do Sudeste.",
      contribution:
        "Desenvolvedor responsável pela melhoria contínua do site: novas seções, ajustes de conteúdo, desempenho e responsividade, mantendo a experiência digital clara, atual e funcional.",
      problem: "A empresa precisa de uma presença digital clara e atual para atender clientes corporativos.",
      result: "Site no ar em betinhos.com.br, com evolução contínua de seções, desempenho e responsividade.",
      status: "Em produção",
      technologies: ["React", "Vinext", "Vite", "JavaScript", "CSS"],
      repository: "Repositório privado",
      link: "https://www.betinhos.com.br",
      linkLabel: "Acessar site",
    },
    // ---- Pessoais ----
    {
      name: "Site Grupo Mendonça",
      category: "pessoais",
      type: "Freelance · Web",
      semester: "2DSM – 2º Sem. 2026",
      description:
        "Site do Grupo Mendonça, de São Paulo, que faz coffee break para empresas e eventos, encomendas de bolos e salgados e atendimento com café em velórios.",
      contribution:
        "Projeto individual, sob contrato: direção de design, as páginas do site, a vitrine, o formulário de pedido e a publicação na Cloudflare.",
      problem: "O grupo dependia de conversa no WhatsApp para mostrar o que faz e receber pedidos, sem um lugar que explicasse os serviços.",
      result: "Site no ar com a vitrine de encomendas e o orçamento de coffee break em poucos passos. Cada pedido chega à equipe na hora, e o WhatsApp está a um toque em todas as páginas.",
      status: "Em produção",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Cloudflare Pages"],
      repository: "Repositório privado",
      link: "https://www.grupomzcoffee.com.br",
      linkLabel: "Acessar site",
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
      problem: "Separar regiões de uma imagem por cor à mão é lento e impreciso.",
      result: "Segmentação recursiva no próprio navegador, com tolerância ajustável em tempo real.",
      technologies: ["TypeScript", "HTML Canvas", "CSS"],
      repository: "Repositório privado",
    },
  ],

  education: [
    {
      course: "Desenvolvimento de Software Multiplataforma",
      institution: "Fatec Jacareí",
      period: "Ingresso em 2026",
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
