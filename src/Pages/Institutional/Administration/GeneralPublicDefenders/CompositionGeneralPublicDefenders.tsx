import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'


function CompositionGeneralPublicDefenders() {
const content = {
  tag: "div",
  props: {
    className: "container",
    style: {textAlign: "initial", lineHeight: 1.5,}
  },
  children: [
    {
        tag: "h1",
        props: { className: "title"},
        children: ["Composição Administração Superior"],
    },
    {
        tag: "h2",
        props: { className: "subtitle"},
        children: ["ÓRGÃOS DA ADMINISTRAÇÃO SUPERIOR  (EQUIPE)"],
    },
    {
        tag: "h3",
        props: { className: "subtitle"},
        children: [" Defensor Público-Geral "],
    },
    {
        tag: "p",
        props: { className: "text" },
        children: [
            "Ronaldo Francisco"
        ],
    },
    {
        tag: "h3",
        props: { className: "subtitle"},
        children: [" Subdefensor Público-Geral "],
    },
    {
        tag: "p",
        props: { className: "text" },
        children: [
            "Thiago Burlani Neves"
        ],
    },
    {
        tag: "h3",
        props: { className: "subtitle"},
        children: ["Chefia de Gabinete - DPE/AGAB"],
    },
    {
        tag: "ul",
        props: { className: "unorderedList",},
        children: [
        {
            tag: "p",
            props: { className: "line" },
            children: [
            { tag: "strong",  children: ["Chefe de Gabinete: "] },
            " Defensor Público Tiago Queiroz da Costa"
            ]
        },
        {
            tag: "p",
            props: { className: "line" },
            children: [
                { tag: "strong", children: ["Contatos: "] },
                {
                tag: "a",
                props: { href: "mailto:gabinete@defensoria.sc.def.br" },
                children: ["gabinete@defensoria.sc.def.br"]
                },
                " | 48 3665-6371"
            ]
        },
      ]
    },

    {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Assessoria Administrativa e de Pessoal - DPE/ASSAP"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList"},
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Assessora: "] },
              "Defensora Pública Lucia Maria Menegaz"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:assap@defensoria.sc.def.br" },
                children: ["assap@defensoria.sc.def.br"]
              }, " | 48 3665-7576",
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Assessoria de Projetos Especiais - DPE/ASSEPE"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Assessor: "] },
              "Defensor Público Edison Marconi Dittrich Schmitt"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:assepe@defensoria.sc.def.br" },
                children: ["assepe@defensoria.sc.def.br"]
              },
              " | 48 3665-6346"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Assessoria de Tecnologia e Inovação - DPE/ASSETI"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Assessor: "] },
              "Defensor Público Djoni Luiz Gilgen Benedete"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:asseti@defensoria.sc.def.br" },
                children: ["asseti@defensoria.sc.def.br"]
              },
              " | 47 3481-2195"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Assessoria Jurídica - ASSEJUR - DPE/ASSEJUR"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Assessor Jurídico: "] },
              "Defensor Público Cassio Kury Lopes"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:assejur@defensoria.sc.def.br" },
                children: ["assejur@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:cassiolopes@defensoria.sc.def.br" },
                children: ["cassiolopes@defensoria.sc.def.br"]
              },
              " | Telefone: 48 3665-6587"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Assessoria de Comunicação - DPE/ASCOM"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Assessora: "] },
              "Mariana Paniz"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:marianapaniz@defensoria.sc.def.br" },
                children: ["marianapaniz@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:ascom@defensoria.sc.def.br" },
                children: ["ascom@defensoria.sc.def.br"]
              },
              " | 48 3665-6725"
            ]
          }
        ]
      },
    {
        tag: "h2",
        props: { className: "subtitle", style: {marginTop : "3rem"}},
        children: [" ÓRGÃOS AUXILIARES ",],
    },    
    {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Diretoria Geral Administrativa - DPE/DIAD"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Diretora: "] },
              "Fabíola Rossi Menegotto"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:diad@defensoria.sc.def.br" },
                children: ["diad@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:fabiolamenegotto@defensoria.sc.dev.br" },
                children: ["fabiolamenegotto@defensoria.sc.dev.br"]
              },
              " | 48 3665-7560"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Diretoria de Controle Interno - DPE/DCI"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Diretora: "] },
              "Patrícia Daufenbach Pereira"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:dci@defensoria.sc.def.br" },
                children: ["dci@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:patriciapereira@defensoria.sc.def.br" },
                children: ["patriciapereira@defensoria.sc.def.br"]
              },
              " | 48 3665-7573"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Gerência de Gestão e Desenvolvimento de Pessoas - DPE/GEPES"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Gerente: "] },
              "Patricia de Aguiar"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:gepes@defensoria.sc.def.br" },
                children: ["gepes@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:patriciaaguiar@defensoria.sc.def.br" },
                children: ["patriciaaguiar@defensoria.sc.def.br"]
              },
              " | 48 3665-5707"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Gerência de Finanças e Contabilidade - DPE/GEFIC"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Gerente: "] },
              "Taynara Souza Goulart"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:gefic@defensoria.sc.def.br" },
                children: ["gefic@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:taynaragoulart@defensoria.sc.def.br" },
                children: ["taynaragoulart@defensoria.sc.def.br"]
              },
              " | 48 3665-6377"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Gerência de Tecnologia da Informação - DPE/GETI"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Gerente: "] },
              "Felipe Carlos Corrêa"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:getig@defensoria.sc.def.br" },
                children: ["getig@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:felipecorrea@defensoria.sc.def.br" },
                children: ["felipecorrea@defensoria.sc.def.br"]
              },
              " | 48 3665-6384 / 3665-6576"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Gerência de Apoio Judiciário - DPE/GEAJU"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList",  },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Gerente: "] },
              "Ana Carolina Holske Maciel"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:geaju@defensoria.sc.def.br" },
                children: ["geaju@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:anaholske@defensoria.sc.def.br" },
                children: ["anaholske@defensoria.sc.def.br"]
              },
              " | 48 3665-6379"
            ]
          }
        ]
      },
      {
        tag: "h3",
        props: { className: "subtitle" },
        children: ["Gerência de Contratos - DPE/GECON"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList" },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Gerente: "] },
              "Kerly Mayara Amorim Borges"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Contatos: "] },
              {
                tag: "a",
                props: { href: "mailto:gecon@defensoria.sc.def.br" },
                children: ["gecon@defensoria.sc.def.br"]
              },
              ", ",
              {
                tag: "a",
                props: { href: "mailto:kerlyborges@defensoria.sc.def.br" },
                children: ["kerlyborges@defensoria.sc.def.br"]
              },
              " | 48 3665-7578"
            ]
          }
        ]
      },      
  ],
};

  return (  <>
            <StaticPageTemplate content={content}  toPrint={true}/>
        </>
  )
}

export default CompositionGeneralPublicDefenders