import React from 'react'
import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'

function RegulationsGeneralOversightOffice() {
    const data ={
        tag: "div",
        props: {},
        children: [
            {
                tag: "h1",
                props: {},
                children: ["Regimento Interno da Corregedoria-Geral"]
            },
            {
                tag: "p",
                props: {},
                children: [`
O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, conforme previsão contida no artigo 16, inciso I, da Lei Complementar Estadual nº 575, de 2 de agosto de 2012, e nos termos da decisão proferida na 67ª Sessão Ordinária, ocorrida em 13 de janeiro de 2017, DELIBERA pela alteração da Resolução CDPESC nº 23, de 14 de maio de 2014, que passa a vigorar com a redação consolidada constante desta deliberação.
`]
            },
            {
                tag: "button",
                props: {
                    onClick: () => window.open("/files/regimento.pdf", "_blank"),
                    className: "button"
                },
                children: ["Visualizar arquivo"]
            }
        ]
    }
  return (
    <StaticPageTemplate content={data} toPrint={true}/>
  )
}

export default RegulationsGeneralOversightOffice