import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './FederalLegislation.module.css'


function FederalLegislation() {
const content = {
  tag: "div",
  props: {
    className: styles.container,
  },
  children: [
    {
      tag: "h1",
      props: { className: styles.title},
      children: ["Legislação Federal"],
    },
    {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["Constituição Federal"],
    },
    {
        tag: "ul",
        props: { className: styles.unorderedList },
        children: [
          {
            tag: "li",
            props: { className: styles.line },
            children: [
              { tag: "strong", children: [""] },
              {
                tag: "a",
                props: {
                  href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: styles.link,
                },
                children: ["Art. 5º, inciso LXXIV da CF."],
              },
            ],
          },
          {
            tag: "li",
            props: { className: styles.line },
            children: [
              { tag: "strong", children: [""] },
              {
                tag: "a",
                props: {
                  href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: styles.link,
                },
                children: ["Art. 134, CF."],
              },
            ],
          },
          {
            tag: "li",
            props: { className: styles.line },
            children: [
              { tag: "strong", children: [""] },
              {
                tag: "a",
                props: {
                  href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: styles.link,
                },
                children: ["Art. 98 do ADCT, CF"],
              },
            ],
          },
        ],
      },
      
      {
        tag: "a",
        props: {
          className: `${styles.link} ${styles.subtitle}`,
          href: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp80.htm",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        children: ["Lei Complementar nº 80/1994"],
      },
      
    {
    tag: "ul",
    props: { className: styles.unorderedList},
    children: [
        {
            tag: "li",
            props: { className: styles.line},
            children: [
            {
                tag: "strong",
                children: [""]
            },
            "Organiza a Defensoria Pública da União, do Distrito Federal e dos Territórios e prescreve normas gerais para sua organização nos Estados, e dá outras providências."
            ]
        },
    ]},
    {
      tag: "a",
      props: {
        className: `${styles.link} ${styles.subtitle}`,
        href: "https://www.planalto.gov.br/ccivil_03/leis/l1060.htm",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      children: ["Lei nº 1.060/1950"],
    },    
    {
        tag: "ul",
        props: { className: styles.unorderedList},
        children: [
            {
                tag: "li",
                props: { className: styles.line},
                children: [
                {
                    tag: "strong",
                    children: [""]
                },
                "Estabelece normas para a concessão de assistência judiciária aos necessitados."
                ]
            },
    ]},
  ],
};

  return (  <>
            <StaticPageTemplate content={content} toPrint={true} />
        </>
  )
}

export default FederalLegislation