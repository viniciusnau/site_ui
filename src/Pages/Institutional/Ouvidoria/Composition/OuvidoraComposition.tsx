import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './OuvidoraComposition.module.css'


function OuvidoraComposition() {
const content = {
  tag: "div",
  props: {
    className: styles.container,
  },
  children: [
    {
      tag: "h1",
      props: { className: styles.title},
      children: ["Ouvidora-Geral"],
    },
    {
      tag: "h3",
      props: { className: styles.subtitle},
      children: ["Maria Aparecida Lucca Caovilla"],
    },
    {
        tag: "p",
        props: { className: styles.text },
        children: [
          "Formada em Direito, Mestre e Doutora em Direito, com área de concentração Direito, Política e Sociedade, professora de graduação e pós-graduação no Curso de Direito da Unochapecó (1994 a 2023), ativista e pesquisadora em direitos humanos. Foi integrante e liderou o movimento pela criação da Defensoria Pública em Santa Catarina de 2005 a 2010."
        ],
    },
    {
      tag: "ul",
      props: { className: styles.unorderedList },
      children: [
         {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong",  children: ["Equipe:"] },
          ]
        },
        {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong",  children: ["Amanda Beatrice Boscarino Farias de Medeiros"] },
            " - Analista jurídico"
          ]
        },
        {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong", children: ["Matheus Guimaraes Trindade"] },
            " - Estagiário de Graduação"
          ]
        },
        {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong", children: ["Gabrielli do Espírito Santo Pires"] },
            " - Residente Judicial"
          ]
        },
        {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong", children: ["Andreza Maria do Carmo"] },
            " - Assistente Social da Defensoria Pública"
          ]
        }
      ]
    },
    {
      tag: "p",
      props: {className: styles.text},
      children: [
        "Atendimento de segunda a sexta, das 13h às 19h, na sala da Ouvidoria, endereço: Av. Rio Branco, 919 - Centro, Florianópolis (Sede da Defensoria Pública na Capital)."
      ]
    },
    {
      tag: "p",
      props: {className: styles.text},
      children: [
        "Entre em contato com a Ouvidoria para enviar sugestões, críticas, elogios, reclamações ou para propor parcerias."
      ]
    },
    {
      tag: "p",
      props: {className: styles.text},
      children: [
        "Meios de comunicação:"
      ]
    },
     {
      tag: "ul",
      props: { className: styles.unorderedList },
      children: [
        {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong",  children: ["Telefone:"] },
            "(48) 3664-2696"
          ]
        },
        {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong", children: ["WhatsApp:"] },
            "(48) 99127-0772"
          ]
        },
        {
          tag: "li",
          props: { className: styles.line },
          children: [
            { tag: "strong", children: ["E-mail:"] },
            " ouvidoria@defensoria.sc.gov.br"
          ]
        },
      ]
    },
    {
      tag: "a",
      props: {className: styles.link, href: "/fale-com-a-ouvidoria"},
      children: ["Clique aqui e fale com a ouvidoria"]
    }
  ],
};

  return (  <>
            <StaticPageTemplate content={content} toPrint={true} />
        </>
  )
}

export default OuvidoraComposition