import StaticPageTemplate from "../../../Components/StaticPageTemplate/StaticPageTemplate"

function ServiceCharter() {
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
        children: ["Carta de Serviços"],
      },
      {
        tag: "p",
        props: { className: "text" },
        children: [
          "Brasil. Defensoria Pública do Estado de Santa Catarina."
        ],
    },
    {
      tag: "p",
      props: { className: "text" },
      children: [
        "Carta de Serviços da Defensoria Pública do Estado de Santa Catarina."
      ],
    },
    {
        tag: "p",
        props: { className: "text" },
        children: [
        "Florianópolis, Edição 2020. "
        ],
    },
    {
        tag: "button",
        props: {
            onClick: () => window.open("/files/CartadeServiosDPESC2020revisado.pdf", "_blank"),
            className: "button"
        },
        children: ["Visualizar arquivo"]
    }
  ],
}
  

return (
    <>
    <StaticPageTemplate content={content} />
    </>
)
}

export default ServiceCharter