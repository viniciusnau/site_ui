import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'

function ResponsibilitiesSuperiorCouncil() {
  const content = {
    tag: "div",
    props: {
      className: "container",
      style: { textAlign: "initial", lineHeight: 1.5 }
    },
    children: [
      {
        tag: "h1",
        props: { className: "title", style: {textAlign: "initial"}},
        children: ["Regimento Interno do Conselho Superior"],
      },
      {
        tag: "p",
        props: { className: "text" },
        children: [
          "O Conselho Superior da Defensoria Pública do Estado de Santa Catarina, no uso de suas atribuições legais, conforme previsão contida no artigo 16, inciso I, da Lei Complementar Estadual no 575, de 2 de agosto de 2012, e nos termos da decisão proferida na sessão ordinária ocorrida em 1o de dezembro de 2017, RESOLVE aprovar o Regimento Interno do Conselho Superior da Defensoria Pública do Estado de Santa Catarina, nos termos que seguem no arquivo anexo abaixo:"
        ],
    },
    {
        tag: "button",
        props: {
            onClick: () => window.open("/files/Regimento_Interno_do_Conselho_Superior.pdf", "_blank"),
            className: "button"
        },
        children: ["Visualizar arquivo"]
    }
]}

return (
    <>
    <StaticPageTemplate content={content}  toPrint={true}/>
    </>
)
}

export default ResponsibilitiesSuperiorCouncil