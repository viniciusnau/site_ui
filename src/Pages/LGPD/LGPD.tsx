import StaticPageTemplate from '../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './LGPD.module.css'


function LGPD() {
const content = {
  tag: "div",
  props: {
    className: styles.container,
  },
  children: [
    {
      tag: "h1",
      props: { className: styles.title},
      children: ["LGPD - Lei Geral de Proteção de Dados"],
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: ["A Lei 13.709/2018 - Lei Geral de Proteção de Dados do Brasil (LGPD) dispõe sobre o tratamento de dados pessoais, inclusive nos meios digitais, por pessoa natural ou por pessoa jurídica de direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e de privacidade e o livre desenvolvimento da personalidade da pessoa natural."],
    },  
    {
        tag: "p",
        props: { className: styles.text},
        children: [{tag: "strong", children:["Dados pessoais: "]}, "qualquer informação relacionada à pessoa natural identificada ou identificável."],
    },  
    {
        tag: "p",
        props: { className: styles.text},
        children: [{tag: "strong", children:["Tratamento de dados: "]}, `toda operação realizada com dados pessoais, como as que se referem à coleta, classificação, utilização, acesso, reprodução, processamento, armazenamento, eliminação, controle da informação, entre outros.
O titular de dados pessoais tem direito de obter informações sobre seus dados, na forma da lei.
As solicitações de informações sobre a LGPD podem ser realizados diretamente com o`, {tag: "strong", children:[" Encarregado pelo tratamento de dados pessoais."]}],
    },
    {
        tag: "hr",
        props: {className: styles.hr}
    }, 
    {
        tag: "h3",
        props: {className: styles.subTitle},
        children:["Encarregado"]
    },
    {
        tag: "p",
        props: { className: styles.text},
        children: [`
            Defensor Público Djoni Luiz Gilgen Benedete`,{tag: "p", props:{className: styles.email} ,children: [`encarregado@defensoria.sc.gov.br`]},
            `
            Endereço: Av. Rio Branco, nº 919 - Florianópolis SC - CEP 88015-205 - Ed. Centro Executivo Rio Branco
        `]
    },
    {
        tag: "h3",
        props: {className: styles.subTitle},
        children:["Suplente"]
    },
    {
        tag: "p",
        props: { className: styles.text},
        children: [`
            Felipe Carlos Corrêa`,{tag: "p", props:{className: styles.email} ,children: [`encarregado@defensoria.sc.gov.br`]},
            `
            Endereço: Av. Rio Branco, nº 919 - Florianópolis SC - CEP 88015-205 - Ed. Centro Executivo Rio Branco
        `]
    },
    {
        tag: "hr",
        props: {className: styles.hr}
    },
    {
        tag: "h3",
        props: {className: styles.subTitle},
        children:["Previsão legal"]
    },
    {
        tag: "p",
        props: { className: styles.text},
        children: [`
            Artigo 41, §1º, da LGPD
            "A identidade e as informações de contato do encarregado deverão ser divulgadas publicamente, de forma clara e objetiva, preferencialmente no sítio eletrônico do controlador."
        `]
    },
    {
        tag: "hr",
        props: {className: styles.hr}
    },
    {
        tag: "h3",
        props: {className: styles.subTitle},
        children:["Atribuições"]
    },
    {
        tag: "p",
        props: { className: styles.text},
        children: [`
            Artigo 41, §2º, da LGPD 
        `]
    },
    {
        tag: "ul",
        children:[
            {tag: "li", children: ["aceitar reclamações e comunicações dos titulares, prestar esclarecimentos e adotar providências;"]},
            {tag: "li", children: ["receber comunicações da autoridade nacional e adotar providências;"]},
            {tag: "li", children: ["orientar os funcionários e os contratados da entidade a respeito das práticas a serem tomadas em relação à proteção de dados pessoais; e"]},
            {tag: "li", children: ["executar as demais atribuições determinadas pelo controlador ou estabelecidas em normas complementares.Aviso de Privacidade e Proteção de Dados"]},
        ]
    }, 
    {
        tag: "hr",
        props: {className: styles.hr}
    },
    {
        tag: "h3",
        props: {className: styles.subTitle},
        children:["Aviso de Privacidade e Proteção de Dados"]
    },
    {
        tag: "a",
        props: {className: styles.link, href: "/politica-de-privacidade"},
        children: [`Clique aqui para saber mais sobre a política de privacidade`]
    },
  ],
};

  return (  <>
            <StaticPageTemplate content={content} toPrint={true} />
        </>
  )
}

export default LGPD