import React from 'react'
import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'


function ResponsibilitiesGeneralOversightOffice() {
  const content = {
    tag: "div",
    props: {
      className: "container",
      style: { textAlign: "initial", lineHeight: 1.5 }
    },
    children: [
        {
            tag: "h1",
            props: { className: "title" },
            children: ["Atribuições Corregedoria-Geral"],
        },
        {
            tag: "p",
            props: { className: "text" },
            children: [
            "A Corregedoria-Geral, um dos órgãos da Administração Superior, é encarregada de orientar e fiscalizar a atividade funcional e a conduta dos membros e dos servidores da Instituição."
            ],
        },
        {
            tag: "p",
            props: { className: "text" },
            children: [
            "À Corregedoria-Geral da Defensoria Pública compete:"
            ],
        },
        {
            tag: "ul",
            children: [
                {
                tag: "li",
                children: ["Apresentar ao Defensor Público-Geral, no mês de janeiro de cada ano, relatório das atividades desenvolvidas no ano anterior;"]
                },
                {
                tag: "li",
                children: ["Receber e processar as representações contra os membros da Defensoria Pública, encaminhando-as com parecer ao Conselho Superior;"]
                },
                {
                tag: "li",
                children: ["Propor a instauração de processo disciplinar contra membros da Defensoria Pública e seus servidores;"]
                },
                {
                tag: "li",
                children: ["Acompanhar o estágio probatório dos membros da Defensoria Pública;"]
                },
                {
                tag: "li",
                children: ["Propor a exoneração de membros da Defensoria Pública que não cumprirem as condições do estágio probatório;"]
                },
                {
                tag: "li",
                children: ["Baixar normas, no limite de suas atribuições, com vistas à regularidade e ao aperfeiçoamento das atividades da Defensoria Pública, resguardada a independência funcional de seus membros;"]
                },
                {
                tag: "li",
                children: ["Manter atualizados os assentamentos funcionais e os dados estatísticos de atuação dos membros da Defensoria Pública, para efeito de aferição de merecimento;"]
                },
                {
                tag: "li",
                children: ["Expedir recomendações aos membros da Defensoria Pública sobre matéria afeta à competência da Corregedoria-Geral da Defensoria Pública;"]
                },
                {
                tag: "li",
                children: ["Desempenhar outras atribuições previstas em lei ou no Regimento Interno da Defensoria Pública."]
                }
            ]
        }  
    ]
  }

  return (
    <>
      <StaticPageTemplate content={content} toPrint={true} />
    </>
  )
}

export default ResponsibilitiesGeneralOversightOffice