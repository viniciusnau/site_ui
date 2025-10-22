import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './WhoCanBeServed.module.css'

function WhoCanBeServed() {
const content = {
  tag: "div",
  props: { className: styles.container },
  children: [
    {
      tag: "h2",
      props: { className: styles.title},
      children: ["Quem pode ser Atendido?"]
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        "A Defensoria Pública presta assistência judicial e extrajudicial gratuita aos necessitados que comprovem insuficiência de recursos."
      ]
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        "São consideradas necessitadas as pessoas que não têm condições de arcar com as despesas de um processo judicial sem que haja prejuízo ao sustento próprio ou de sua família."
      ]
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        "No Regulamento do Conselho Superior constam os critérios de reconhecimento da situação de necessitado. ",
        "Tais resoluções estabelecem que se presume necessitada a pessoa natural que atenda todas as condições abaixo:"
      ]
    },
    {
      tag: "ol",
      props: { className: styles.orderedList},
      children: [
        {
          tag: "li",
          children: [
            {
              tag: "strong",
              children: ["1ª) "]
            },
            "renda familiar mensal não superior a 03 salários mínimos. Se a renda for superior, mas até 04 salários mínimos, também deve estar presente ao menos uma das seguintes situações:",
            {
              tag: "ul",
              props: { className: `${styles.unorderedList} ${styles.styleNone}` },
              children: [
                {
                  tag: "li",
                  props: { className: styles.line},
                  children: ["a) entidade familiar composta por mais de 05 membros;"]
                },
                {
                  tag: "li",
                  props: { className: styles.line},
                  children: ["b) gastos mensais comprovados com tratamento médico por doença grave ou aquisição de medicamento de uso contínuo;"]
                },
                {
                  tag: "li",
                  props: { className: styles.line},
                  children: ["c) entidade familiar composta por pessoa com deficiência ou ou transtorno global de desenvolvimento;"]
                },
                {
                  tag: "li",
                  props: { className: styles.line},
                  children: ["d) entidade familiar composta por idoso ou egresso do sistema prisional, desde que constituída por 4 ou mais membros."]
                }
              ]
            }
          ]
        },
        {
          tag: "li",
          props: { className: styles.line},
          children: [
            {
              tag: "strong",
              children: ["2ª) "]
            },
            "não seja proprietária, titular de aquisição, herdeira, legatária ou usufrutuária de bens móveis, imóveis ou direitos, cujos valores ultrapassem a quantia equivalente a 150 salários mínimos."
          ]
        },
        {
          tag: "li",
          props: { className: styles.line},
          children: [
            {
              tag: "strong",
              children: ["3ª) "]
            },
            "em caso de partilha de bens (em divórcio, inventário, etc.), o valor dos bens não poderá exceder ao limite de 250 salários mínimos."
          ]
        },
        {
          tag: "li",
          props: { className: styles.line},
          children: [
            {
              tag: "strong",
              children: ["4ª) "]
            },
            "não possua recursos financeiros em aplicações ou investimentos em valor superior a 12 salários mínimos."
          ]
        }
      ]
    },
    {
      tag: "p",
      children: [
        {
          tag: "strong",
          props: { className: styles.text},
          children: ["Observações:"]
        }
      ]
    },
    {
      tag: "ul",
      props: { className: `${styles.unorderedList} ${styles.styleNone}` },
      children: [
        {
          tag: "li",
          props: { className: styles.line},
          children: ["* Havendo conflito de interesses entre pessoas de um mesmo grupo familiar (exemplo, entre marido e mulher), a renda mensal e o patrimônio líquido deverão ser considerados individualmente."]
        },
        {
          tag: "li",
          props: { className: styles.line},
          children: ["** Nas ações de usucapião não será considerado como patrimônio familiar o valor do bem usucapido."]
        },
        {
          tag: "li",
          props: { className: styles.line},
          children: ["*** Os critérios acima estabelecidos não excluem a aferição da hipossuficiência no caso concreto, através de manifestação devidamente fundamentada do Defensor Público."]
        }
      ]
    },
    {
      tag: "a",
      props: {
          href: "/regulamento",
          target: "_blank",
          className: styles.link,
      },
      children: ["CLIQUE AQUI PARA VER O REGULAMENTO"]
    },
    {
      tag: "h3",
      props: { className: styles.subtitle},
      children: ["DOCUMENTOS NECESSÁRIOS PARA AVALIAÇÃO ECONÔMICO-FINANCEIRA"]
    },
    {
      tag: "ul",
      props: { className: styles.unorderedList},
      children: [
        { tag: "li",props: { className: styles.line}, children: ["Deve-se comprovar renda e residência."] },
        { tag: "li",props: { className: styles.line}, children: ["São comprovantes de renda: \"contra-cheque\" (holerite), carteira de trabalho, extrato de benefício previdenciário, declaração do empregador ou do sindicato."] },
        { tag: "li",props: { className: styles.line}, children: ["Se não possui nenhum destes documentos, procure um funcionário no órgão, ele saberá orientá-lo como proceder."] },
        { tag: "li",props: { className: styles.line}, children: ["O documento que comprova a residência deve estar, de preferência, no nome da pessoa que procura a Defensoria."] },
        { tag: "li",props: { className: styles.line}, children: ["São preferencialmente aceitos: contas de luz, água, gás e telefone recentes, correspondência recente, contrato ou recibo de aluguel, declaração da associação de moradores, certidão da justiça eleitoral."] }
      ]
    }
  ]
};


  return (  <>
            <StaticPageTemplate content={content} toPrint={true}/>
        </>
  )
}

export default WhoCanBeServed