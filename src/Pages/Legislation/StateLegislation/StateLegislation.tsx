import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate';

function StateLegislation() {
  const content = {
    tag: "div",
    props: {
      className: "container",
    },
    children: [
      {
        tag: "h1",
        props: { className: "title" },
        children: ["Legislação Estadual"],
      },
      {
        tag: "h2",
        props: { className: "subtitle" },
        children: ["Constituição do Estado de Santa Catarina"],
      },

      {
        tag: "a",
        props: {
          href: "https://leis.alesc.sc.gov.br/html/2012/575_2012_Lei_complementar.html#:~:text=Art.,nos%20termos%20desta%20Lei%20Complementar.",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "link subtitle",
        },
        children: ["Lei Complementar nº 575/2012"],
      },
      {
        tag: "ul",
        props: { className: "unordered-list" },
        children: [
          {
            tag: "li",
            props: { className: "line" },
            children: [
              {
                tag: "strong",
                children: [""],
              },
              "Cria a Defensoria Pública do Estado de Santa Catarina, dispõe sobre sua organização e funcionamento e estabelece outras providências.",
            ],
          },
        ],
      },

      {
        tag: "a",
        props: {
          href: "https://leis.alesc.sc.gov.br/html/2018/717_2018_lei_complementar.html#:~:text=Institui%20o%20Plano%20de%20Cargos,Catarina%20e%20adota%20outras%20provid%C3%AAncias.&text=Art.",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "link subtitle",
        },
        children: ["Lei Complementar nº 717/2018"],
      },
      {
        tag: "ul",
        props: { className: "unordered-list" },
        children: [
          {
            tag: "li",
            props: { className: "line" },
            children: [
              {
                tag: "strong",
                children: [""],
              },
              "Institui o Plano de Cargos, Carreira e Vencimentos dos servidores da Defensoria Pública do Estado de Santa Catarina e adota outras providências.",
            ],
          },
        ],
      },

      {
        tag: "a",
        props: {
          href: "https://leis.alesc.sc.gov.br/html/2022/804_2022_lei_complementar.html",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "link subtitle",
        },
        children: ["Lei Complementar nº 804/2022"],
      },
      {
        tag: "ul",
        props: { className: "unordered-list" },
        children: [
          {
            tag: "li",
            props: { className: "line" },
            children: [
              {
                tag: "strong",
                children: [""],
              },
              "Cria 25 (vinte e cinco) cargos de provimento efetivo de Defensor Público no âmbito da Defensoria Pública do Estado de Santa Catarina, altera disposições da Lei Complementar nº 575, de 2012, e adota outras providências.",
            ],
          },
        ],
      },

      {
        tag: "a",
        props: {
          href: "https://leis.alesc.sc.gov.br/html/2022/805_2022_lei_complementar.html",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "link subtitle",
        },
        children: ["Lei Complementar nº 805/2022"],
      },
      {
        tag: "ul",
        props: { className: "unordered-list" },
        children: [
          {
            tag: "li",
            props: { className: "line" },
            children: [
              {
                tag: "strong",
                children: [""],
              },
              "Institui a Política de Atendimento Integrado da Defensoria Pública do Estado, altera a Lei Complementar nº 575, de 2012, que dispõe sobre a organização da DPE, bem como reajusta o subsídio mensal dos membros da carreira de defensor público, o piso salarial dos servidores da Defensoria Pública do Estado e estabelece outras providências.",
            ],
          },
        ],
      },

      {
        tag: "a",
        props: {
          href: "https://leisestaduais.com.br/sc/lei-ordinaria-n-6745-1985-santa-catarina-dispoe-sobre-o-estatuto-dos-servidores-publicos-civis-do-estado-de-santa-catarina",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "link subtitle",
        },
        children: ["Lei Estadual nº 6745/1985"],
      },
      {
        tag: "ul",
        props: { className: "unordered-list" },
        children: [
          {
            tag: "li",
            props: { className: "line" },
            children: [
              {
                tag: "strong",
                children: [""],
              },
              "Dispõe sobre o Estatuto dos Servidores Civis do Estado.",
            ],
          },
        ],
      },
    ],
  };

  return <StaticPageTemplate content={content} toPrint={true} />;
}

export default StateLegislation;
