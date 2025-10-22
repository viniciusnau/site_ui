import {
  ScrollText,
  Headset,
  BadgeCheck,
  View,
  Scale,
  Speech,
} from "lucide-react";
export const handleTypeService = {
  success: {
    title: "Requisição feita com sucesso!",
    description: "Requisição feita com sucesso!",
    color: "#9fc54d",
  },

  copyMessage: {
    title: "Mensagem copiada com sucesso!",
    description:
      "Cole a mensagem no local onde foi feita a inclusão do novo texto.",
    color: "#9fc54d",
  },

  searchError: {
    title: "Erro ao efetuar a requisição!",
    description:
      "O número de registros retornados pela consulta excede o limite. Por favor, repita a consulta usando mais filtros.",
    color: "#ff6464",
  },

  error: {
    title: "Erro ao efetuar a requisição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  loginError: {
    title: "Erro ao tentar entrar na sessão!",
    description: "Usuário e/ou senha podem estar errados.",
    color: "#ff6464",
  },

  resetError: {
    title: "Erro ao redefinir senha!",
    description: "Confira se o email está correto e tente novamente.",
    color: "#ff6464",
  },

  resetSuccess: {
    title: "Requisição feita com sucesso!",
    description: "Acesse o email para finalizar a troca de senha.",
    color: "#9fc54d",
  },

  saveProfile: {
    title: "Perfil salvo!",
    description: "Alteração feita com sucesso!",
    color: "#9fc54d",
  },

  patchSuccess: {
    title: "Salvo com sucesso!",
    description: "As novas alterações foram salvas!",
    color: "#9fc54d",
  },
  patchError: {
    title: "Ops, algo deu errado!",
    description: "",
    color: "#ff6464",
  },
  
  postSuccess: {
    title: "Criado com sucesso!",
    description: "As informações preenchidas foram salvas!",
    color: "#9fc54d",
  },

  postError:{
    title: "Ops, algo deu errado!",
    description: "Falha ao criar o item!",
    color: "#ff6464",
  },

  noneChange: {
    title: "Erro",
    description: "Nenhuma alteração detectada!",
    color: "#ff6464",
  },

  deleteSuccess: {
    title: "Deletado com sucesso!",
    description: "O item selecionado foi deletado!",
    color: "#9fc54d",
  },

  deleteError: {
    title: "Ops, algo deu errado!",
    description: "Ocorreu um erro ao deletar!",
    color: "#ff6464",
  },

  imageError: {
    title: "Atenção!",
    description: "Aconselhamos que a imagem tenha pelo menos 500x333 pixels.",
    color: "#ff6464",
  },
};

export const ptLocale = {
  months: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],

  weekDays: [
    {
      name: "Domingo",
      short: "D",
      isWeekend: true,
    },
    {
      name: "Segunda-feira",
      short: "S",
    },
    {
      name: "Terça-feira",
      short: "T",
    },
    {
      name: "Quarta-feira",
      short: "Q",
    },
    {
      name: "Quinta-feira",
      short: "Q",
    },
    {
      name: "Sexta-feira",
      short: "S",
    },
    {
      name: "Sábado",
      short: "S",
      isWeekend: true,
    },
  ],

  weekStartingIndex: 0,

  getToday(gregorainTodayObject: any) {
    return gregorainTodayObject;
  },

  toNativeDate(date: any) {
    return new Date(date.year, date.month - 1, date.day);
  },

  getMonthLength(date: any) {
    return new Date(date.year, date.month, 0).getDate();
  },

  transformDigit(digit: any) {
    return digit;
  },

  nextMonth: "Próximo Mês",
  previousMonth: "Mês Anterior",
  openMonthSelector: "Abrir Selecionador de Mês",
  openYearSelector: "Abrir Selecionador de Ano",
  closeMonthSelector: "Fechar Selecionador de Mês",
  closeYearSelector: "Fechar Selecionador de Ano",
  defaultPlaceholder: "Selecionar...",

  from: "de",
  to: "até",

  digitSeparator: ",",

  yearLetterSkip: 0,

  isRtl: false,
};

export const tutorialStyles = {
  options: {
    zIndex: 10000,
    primaryColor: "#2f5141",
    textColor: "#333",
    arrowColor: "#277618",
    backgroundColor: "#fff",
    overlayColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonNext: {
    backgroundColor: "#2f5141",
  },
  buttonBack: {
    color: "#277618",
  },
  buttonClose: {
    display: "none",
  },
  tooltip: {
    borderRadius: "4px",
  },
};

export const menuItems = [
  {
    label: "Institucional",
    path: "/",
    //icon: ScrollText,
    children: [
      {
        label: "Sobre a Defensoria",
        path: "/institucional/sobre-a-defensoria",
      },
      {
        label: "Administração Superior",
        path: "/institucional/administracao-superior",
        children: [
          {
            label: "Defensoria Pública-Geral e Subdefensoria Pública-Geral",
            path: "/institucional/administracao-superior/defensoria-publica-geral-e-subdefensoria-publica-geral",
            children: [
              {
                label: "Composição",
                path: "/institucional/administracao-superior/defensoria-publica-geral-e-subdefensoria-publica-geral/composicao",
              },
              {
                label: "Atribuições",
                path: "/institucional/administracao-superior/defensoria-publica-geral-e-subdefensoria-publica-geral/atribuicoes",
              },
              {
                label: "Regimento",
                path: "/institucional/administracao-superior/defensoria-publica-geral-e-subdefensoria-publica-geral/regimento",
              },
            ],
          },
          {
            label: "Corregedoria-Geral",
            path: "/institucional/administracao-superior/corregedoria-geral",
            children: [
              {
                label: "Composição",
                path: "/institucional/administracao-superior/corregedoria-geral/composicao",
              },
              {
                label: "Atribuições",
                path: "/institucional/administracao-superior/corregedoria-geral/atribuicoes",
              },
              {
                label: "Regimento",
                path: "/institucional/administracao-superior/corregedoria-geral/regimento",
              },
            ],
          },
          {
            label: "Conselho Superior",
            path: "/institucional/administracao-superior/conselho-superior",
            children: [
              {
                label: "Composição",
                path: "/institucional/administracao-superior/conselho-superior/composicao",
              },
              {
                label: "Atribuições",
                path: "/institucional/administracao-superior/conselho-superior/atribuicoes",
              },
              {
                label: "Regimento",
                path: "/institucional/administracao-superior/conselho-superior/regimento",
              },
            ],
          },
          {
            label: "Organograma",
            path: "/institucional/administracao-superior/organograma",
          },
        ],
      },
      {
        label: "Ouvidoria-Geral",
        path: "/institucional/ouvidoria-geral",
        children: [
          {
            label: "Sobre a Ouvidoria",
            path: "/institucional/ouvidoria-geral/sobre-a-ouvidoria",
          },
          {
            label: "Composição",
            path: "/institucional/ouvidoria-geral/composicao",
          },
        ],
      },
      { label: "Áreas de Atuação", path: "/institucional/areas-de-atuacao" },
      { label: "Cecadep", path: "/institucional/cecadep" },
      { label: "Nudeconci", path: "/institucional/nudeconci" },
    ],
  },
  {
    label: "Atendimento",
    path: "/",
    //icon: Headset,
    children: [
      {
        label: "Quem pode ser Atendido?",
        path: "/atendimento/quem-pode-ser-atendido",
      },
      {
        label: "Documentação Necessária",
        path: "/atendimento/documentacao-necessaria",
      },
      {
        label: "Núcleos Especializados",
        path: "/atendimento/nucleos-especializados",
      },
      {
        label: "Núcleos Regionais e Unidades",
        path: "/atendimento/nucleos-regionais-e-unidades",
      },
      {
        label: "Atribuições das Defensorias",
        path: "/atendimento/atribuicoes-das-defensorias",
      },
    ],
  },
  {
    label: "Serviços",
    path: "/",
    //icon: BadgeCheck,
    children: [
      { label: "Cartas de Serviços", path: "/servicos/cartas-de-servicos" },
      { label: "Escala de Custódia", path: "/servicos/escala-de-custodia" },
      { label: "Cartilhas e Revista", path: "/servicos/cartilhas-e-revista" },
      { label: "Concursos Públicos", path: "/servicos/concursos-publicos" },
      { label: "Estágio e Residência", path: "/servicos/estagio-e-residencia" },
      {
        label: "Intranet",
        path: "/servicos/intranet",
        children: [
          {
            label: "Lista de Ramais",
            path: "http://intranet.defensoria.sc.def.br/telefonia-dpesc-2/",
          },
          {
            label: "Fluxo de Compras",
            path: "http://intranet.defensoria.sc.def.br/fluxo-de-compras/",
          },
          {
            label: "Trabalho Remoto",
            path: "http://intranet.defensoria.sc.def.br/trabalho-remoto/",
          },
        ],
      },
    ],
  },
  {
    label: "Transparência",
    path: "/",
    //icon: View,
    children: [
      {
        label: "Portal da Transparência",
        path: "https://www.transparencia.sc.gov.br/",
      },
      {
        label: "Radar da Transparência",
        path: "/transparencia/radar-da-transparencia",
      },
      {
        label: "Editais e Licitações",
        path: "/transparencia/editais-e-licitacoes",
      },
      {
        label: "Relatórios de Atividades",
        path: "/transparencia/relatorios-de-atividades",
      },
      {
        label: "Contratações dos Estagiários",
        path: "/transparencia/contratacoes-dos-estagiarios",
      },
      { label: "Publicações", path: "/transparencia/publicacoes" },
      {
        label: "Diário Oficial",
        path: "https://diariooficial.defensoria.sc.def.br/",
      },
      { label: "Tutela Coletiva", path: "/transparencia/tutela-coletiva" },
    ],
  },
  {
    label: "Legislação",
    path: "/",
    //icon: Scale,
    children: [
      { label: "Legislação Federal", path: "/legislacao/legislacao-federal" },
      { label: "Legislação Estadual", path: "/legislacao/legislacao-estadual" },
      { label: "ATOS", path: "https://atos.defensoria.sc.def.br/" },
    ],
  },
  {
    label: "Comunicação",
    path: "/",
    //icon: Speech,
    children: [
      {
        label: "Assessoria de Comunicação",
        path: "/comunicacao/assessoria-de-comunicacao",
      },
      { label: "Notícias", path: "/comunicacao/noticias" },
      {
        label: "Manual de Identidade Visual",
        path: "/comunicacao/manual-de-identidade-visual",
      },
    ],
  },
];

export const stateItens = [
  { key: "acre", label: "Acre", UF: "AC" },
  { key: "alagoas", label: "Alagoas", UF: "AL" },
  { key: "amapa", label: "Amapá", UF: "AP"},
  { key: "amazonas", label: "Amazonas", UF: "AM" },
  { key: "bahia", label: "Bahia", UF: "BA" },
  { key: "ceara", label: "Ceará", UF: "CE" },
  { key: "espirito_santo", label: "Espírito Santo", UF: "ES" },
  { key: "goias", label: "Goiás", UF: "GO" },
  { key: "maranhao", label: "Maranhão", UF: "MA" },
  { key: "mato_grosso", label: "Mato Grosso", UF: "MT" },
  { key: "mato_grosso_do_sul", label: "Mato Grosso do Sul", UF: "MS" },
  { key: "minas_gerais", label: "Minas Gerais", UF: "MG" },
  { key: "para", label: "Pará", UF: "PA" },
  { key: "paraiba", label: "Paraíba", UF: "PB" },
  { key: "parana", label: "Paraná", UF: "PR" },
  { key: "pernambuco", label: "Pernambuco", UF: "PE" },
  { key: "piaui", label: "Piauí", UF: "PI" },
  { key: "rio_de_janeiro", label: "Rio de Janeiro", UF: "RJ" },
  { key: "rio_grande_do_norte", label: "Rio Grande do Norte", UF: "RN" },
  { key: "rio_grande_do_sul", label: "Rio Grande do Sul", UF: "RS" },
  { key: "rondonia", label: "Rondônia", UF: "RO" },
  { key: "roraima", label: "Roraima", UF: "RR" },
  { key: "santa_catarina", label: "Santa Catarina", UF: "SC" },
  { key: "sao_paulo", label: "São Paulo", UF: "SP" },
  { key: "sergipe", label: "Sergipe", UF: "SE" },
  { key: "tocantins", label: "Tocantins", UF: "TO" },
];

