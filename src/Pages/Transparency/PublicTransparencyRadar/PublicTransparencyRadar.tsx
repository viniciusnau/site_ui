import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate';
import image from '../../../Assets/Imagens/selo_defensoria_transparencia.jpg'

function PublicTransparencyRadar() {
  const content = {
    tag: "div",
    props: {
      className: "container",
    },
    children: [
      {
        tag: "h1",
        props: { className: "title" },
        children: ["Radar de Transparência Pública"],
      },
      {
            tag: "p",
            props: { className:"text"},
            children: [
              `O Radar Nacional de Transparência Pública é uma plataforma online que tem como objetivo promover a divulgação dos índices de transparência ativa dos órgãos públicos em todo o país. 
              Esses índices são apurados por meio de um levantamento realizado em pelos Tribunais de Contas, com o apoio dos controladores internos.`,
            ],
          },
      {
        tag: "a",
        props: {
          href: "https://radardatransparencia.atricon.org.br/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "link subtitle",
        },
        children: ["Clique aqui e acesse o Radar da transparência."],
      },
      {
        tag: "a",
        props: { href:"https://radardatransparencia.atricon.org.br/", 
                target: "_blank",
                rel: "noopener noreferrer",
                className: "link subtitle",
                style: {
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "0.5rem"
                }
        },
        children: [        
        {
            tag: "img",
            props: {
                alt:"Defensoria Pública de Santa Catarina recebe selo prata 2023 de qualidade em transparência pública.",
                src: image,
                style: {
                    width: "80%",
                    height: "auto",
                    borderRadius: "0.5rem"
                }
            },
            children: []
        },
        ]},
    ],
  };

  return <StaticPageTemplate content={content} toPrint={true} />;
}

export default PublicTransparencyRadar;
