import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './AboutOuvidoria.module.css'
import image from "../../../../Assets/logos_ouvidoria.jpg"

function AboutOuvidoria() {
const content = {
  tag: "div",
  props: {
    className: styles.container,
  },
  children: [
    {
      tag: "h1",
      props: { className: styles.title},
      children: ["SOBRE A OUVIDORIA"],
    },
    {
        tag: "div",
        props: {className: styles.textAndImage},
        children: [
            {
                tag: "img",
                props: {className: styles.image, src: image}, 
            },
                      {
        tag: "div",
        children: [  
            {
            tag: "h4",
            props: { className: styles.subtitle},
            children: ["O que é a Ouvidoria?"],
            },
            {
            tag: "p",
            props: { className: styles.text},
            children: [
                `A Ouvidoria-Geral é o órgão auxiliar da Defensoria Pública do Estado de Santa Catarina, essencial na promoção da qualidade de serviços prestados à população, bem como no aprimoramento da relação da Instituição com aqueles que dela necessitam. Tem o objetivo buscar a melhoria dos serviços prestados pela Defensoria Pública para a população a partir do diálogo com a sociedade e da escuta de quem é atendido pela instituição.`,
            ],
            },
            {
            tag: "h4",
            props: { className: styles.subtitle},
            children: ["O que faz a Ouvidoria?"],
            },
            {
                tag: "ul",
                props: { className: `${styles.unorderedList}` },
                children: [
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Esclarece dúvidas sobre os serviços prestados pela DPE/SC;"]
                    },
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Recebe sugestões para melhoria da qualidade dos serviços prestados pela DPE/SC;"]
                    },
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Encaminha reclamações e elogios sobre o atendimento prestado pela DPE/SC;"]
                    },
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Atende denúncias de irregularidades ou ilegalidades praticadas na Defensoria Pública ou por seus agentes;"]
                    },
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Estabelece parcerias para concretização de direitos coletivos;"]
                    },
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Amplia o diálogo com movimentos sociais, grupos e organizações da sociedade civil."]
                    }
                ]
            },    
            {
            tag: "h4",
            props: { className: styles.subtitle},
            children: ["Quem pode procurar a Ouvidoria?"],
            },
            {
                tag: "ul",
                props: { className: `${styles.unorderedList} ` },
                children: [
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Todas as pessoas que estejam sendo ou queiram ser atendidas pela DPE/SC. Este atendimento pode ser por meio de orientação sobre direitos, ações judiciais em andamento e procura por agendamento."]
                    },
                    {
                        tag: "li",
                        props: { className: styles.line},
                        children: ["Grupos e organizações da sociedade que queiram estabelecer diálogo, parcerias e defesa de interesses coletivos."]
                    },
                ]
            },]
        }    

        ]
    },
   
    {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["Histórico da Ouvidoria"],
    },
     {
      tag: "p",
      props: { className: styles.text},
      children: [
        `A Ouvidoria constitui-se como órgão auxiliar da Defensoria Pública do Estado, devendo participar do planejamento e acompanhamento da gestão da Instituição, bem como servir de canal regular, e não exclusivo, de comunicação para indivíduos ou coletivos se manifestarem de forma ativa na realização de avaliação dos serviços prestados pela instituição. A função do Ouvidor/a-Geral da Defensoria Pública é desempenhada por cidadãos/ãs não integrantes da carreira, indicados em lista tríplice pela sociedade civil e eleito/a pelo Conselho Superior da Defensoria Pública.`,
      ],
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        `Em 2021, a Defensoria Pública de Santa Catarina deu início ao processo eleitoral para escolha da primeira Ouvidora-Geral de Santa Catarina. Essa eleição contou com a participação de 73 entidades da sociedade civil organizada para a indicação da lista tríplice, entre elas diversos movimentos sociais e sindicais, defensores dos direitos humanos. A professora e Doutora em Direito, Maria Aparecida Lucca Caovilla, foi escolhida e tomou posse oficialmente em sessão solene realizada em 04 de julho de 2022 para um mandato de 2 (dois) anos.`,
      ],
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        `As ouvidoras e ouvidores externos participam do Colégio Nacional de Ouvidores, para onde levam suas experiências e reflexões coletivas.`,
      ],
    },
    {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["Marco Legal da Ouvidoria-Geral da Defensoria Pública do Estado de Santa Catarina"],
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        `A Ouvidoria-Geral da Defensoria Pública do Estado de Santa Catarina tem amparo legal na Lei Complementar Estadual nº 575/2012 (Lei Orgânica da Defensoria Pública do Estado de Santa Catarina). A norma reservou à Ouvidoria a Seção II do Capítulo I, o qual trata justamente da Ouvidoria-Geral. `,
      ],
    },
      {
      tag: "p",
      props: { className: styles.text},
      children: [
        `Estabelece o art. 18 da citada lei:
Art. 18. O Ouvidor-Geral será escolhido pelo Conselho Superior dentre cidadãos de reputação ilibada e tecnicamente capacitados, não integrantes da carreira, indicados em lista tríplice, para mandato de 2 (dois) anos, permitida 1 (uma) recondução. (Redação dada pela LC 630/14).
§ 1º O Conselho Superior editará as normas que regulamentam a forma de elaboração da lista tríplice.
§ 2º O Ouvidor-Geral será nomeado pelo Defensor Público-Geral.
§ 3º O cargo de Ouvidor-Geral será exercido em regime de dedicação exclusiva, vedada qualquer outra atividade remunerada, salvo o magistério. (NR) (Redação dada pela LC 630/14).
Assim, embora se trate de um órgão da Defensoria Pública do Estado de Santa Catarina, a lei estabelece que a pessoa que desempenha as funções da Ouvidoria-Geral não é pessoa integrante da carreira de defensor público.
Logo em seguida, o art. 19 da mesma lei traz as atribuições do órgão auxiliar da Defensoria Pública:
Art. 19. À Ouvidoria-Geral compete:
I - receber e encaminhar ao Corregedor-Geral representação contra membros e servidores da Defensoria Pública, assegurada a defesa preliminar;
II - propor aos órgãos de administração superior da Defensoria Pública medidas e ações que visem à consecução dos princípios institucionais e ao aperfeiçoamento dos serviços prestados;
III - elaborar e divulgar relatório semestral de suas atividades, que conterá também as medidas propostas aos órgãos competentes e a descrição dos resultados obtidos;
IV - participar, com direito a voz, do Conselho Superior da Defensoria Pública;
V - promover atividades de intercâmbio com a sociedade civil;
VI - estabelecer meios de comunicação direta entre a Defensoria Pública e a sociedade para receber sugestões e reclamações, adotando as providências pertinentes e informando o resultado aos interessados;
VII - contribuir para a disseminação das formas de participação popular no acompanhamento e na fiscalização da prestação dos serviços realizados pela Defensoria Pública;
VIII - manter contato permanente com os vários órgãos da Defensoria Pública, estimulando-os a atuar em permanente sintonia com os direitos dos usuários; e
IX - coordenar a realização de pesquisas periódicas e produzir estatísticas referentes ao índice de satisfação dos usuários, divulgando os resultados.
Parágrafo único. As representações podem ser apresentadas por qualquer pessoa, inclusive pelos próprios membros e servidores da Defensoria Pública, de entidade ou órgão público.`,
      ],
    },
    {
      tag: "a",
      props: {className: styles.link, href: "/relatorios-da-ouvidoria-geral"},
      children: ["Relatórios da Ouvidoria Geral"],
    },
    
  ],
};

  return (  <>
            <StaticPageTemplate content={content} toPrint={true} />
        </>
  )
}

export default AboutOuvidoria