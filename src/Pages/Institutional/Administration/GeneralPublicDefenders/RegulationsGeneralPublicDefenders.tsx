import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'

function RegulationsGeneralPublicDefenders() {
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
        children: ["Regimento Interno da Administração"],
      },
      {
        tag: "p",
        props: { className: "text" },
        children: [
          "O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais e nos termos do poder normativo que lhe foi conferido pelo artigo 134 da Constituição Federal, pelo artigo 97-A, incisos II e VII, e artigo 102, ambos da Lei Complementar Federal nº. 80, de 12 de janeiro de 1994, pelo artigo 6º incisos II, IV e VII, artigo 10, inciso V, e artigo 16, inciso XVI, ambos da Lei Complementar Estadual nº. 575 de 2 de agosto 2012, tendo em vista a decisão proferida na 92ª sessão extraordinária, ocorrida em 13 de setembro de 2018, RESOLVE aprovar o Regimento Interno da Defensoria Pública do Estado de Santa Catarina, nos seguintes termos do arquivo anexo a seguir:"
        ],
    },
    {
        tag: "button",
        props: {
            onClick: () => window.open("/files/Resoluao0952018RegimentoInternodaDPESC.pdf", "_blank"),
            className: "button"
        },
        children: ["Visualizar arquivo"]
    }
  ],
}
  

return (
    <>
    <StaticPageTemplate content={content} toPrint={true}/>
    </>
)
}

export default RegulationsGeneralPublicDefenders