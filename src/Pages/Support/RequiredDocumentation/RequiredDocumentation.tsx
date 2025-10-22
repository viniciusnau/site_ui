import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './RequiredDocumentation.module.css'


function RequiredDocumentation() {
const content = {
  tag: "div",
  props: {
    className: styles.container,
  },
  children: [
    {
      tag: "h1",
      props: { className: styles.title},
      children: ["Documentação Necessária"],
    },
    {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["Para ser atendido na Defensoria Pública é necessário comparecer com os documentos abaixo listados. Essa é a documentação básica, que será avaliada inicialmente:"],
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
                 children: ["1. "]
               },
               "Certidão de Nascimento ou Casamento (caso o usuário seja divorciado ou separado judicialmente, deverá apresentar a certidão de casamento com a averbação);",
             ]
           },
           {
             tag: "li",
             props: { className: styles.line},
             children: [
               {
                 tag: "strong",
                 children: ["2. "]
               },
               "RG, CPF e Carteira de Trabalho (trazer mesmo sem estar assinada);"
             ]
           },
           {
             tag: "li",
             props: { className: styles.line},
             children: [
               {
                 tag: "strong",
                 children: ["3. "]
               },
               "Comprovante de Rendimentos de todas as pessoas que moram no ambiente familiar do requerente"
             ]
            },
            {
             tag: "li",
             props: { className: styles.line},
             children: [
               {
                 tag: "strong",
                 children: ["3.1. "]
               },
               "São documentos hábeis para comprovação de renda: ",
                {
                    tag: "ul",
                    props: { className: `${styles.unorderedList}` },
                    children: [
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Contracheque;"]
                        },
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Carteira Profissional;"]
                        },
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Declaração de próprio punho do empregador ou do sindicato profissional, devidamente subscrita;"]
                        },
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Comprovante/extrato de eventual benefício previdenciário."]
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
                 children: ["3.2. "]
               },
               "Caso seja desempregado ou trabalhe como autônomo, extrato da conta bancária dos últimos 3 meses;"
             ]
           },
            {
             tag: "li",
             props: { className: styles.line},
             children: [
               {
                 tag: "strong",
                 children: ["3.3. "]
               },
               "Caso o assistido faça a declaração de Imposto de Renda, trazer cópia da última declaração."
             ]
           },
           {
             tag: "li",
             props: { className: styles.line},
             children: [
               {
                 tag: "strong",
                 children: ["4. "]
               },
               "Comprovante de residência em seu nome."
             ]
           },
           {
             tag: "li",
             props: { className: styles.line},
             children: [
               {
                 tag: "strong",
                 children: ["4.1. "]
               },
               "São documentos hábeis a comprovação do domicílio, à escolha do assistido: ", 
               {
                    tag: "ul",
                    props: { className: `${styles.unorderedList}` },
                    children: [
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Contas emitidas por concessionários de serviços públicos, datadas de até três meses;"]
                        },
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Qualquer correspondência de empresas privadas e/ou órgãos públicos, datada de até três meses;"]
                        },
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Declaração da Associação de Moradores, datada de até três meses;"]
                        },
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Contrato de aluguel vigente;"]
                        },
                        {
                            tag: "li",
                            props: { className: styles.line},
                            children: ["Declaração, com cópia de identidade do declarante, desde que acompanhada de um dos documentos previstos nas alíneas anteriores exigidos pelo defensor público, que avaliará os casos excepcionais, decidindo sobre a viabilidade do atendimento."]
                        }
                    ]
                }
             ]
            },
            {
                tag: "h4",
                props: { className: styles.subtitle},
                children: ["Obs.: Outros documentos não informados na lista acima podem ser solicitados pelo defensor público. Após a triagem e conforme o caso específico de cada pessoa, serão solicitados documentos específicos."],
            },
         ]
       },
  ],
};

  return (  <>
            <StaticPageTemplate content={content} toPrint={true}/>
        </>
  )
}

export default RequiredDocumentation