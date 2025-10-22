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
        props: { className: "title" },
        children: ["Atribuições Conselho Superior"],
      },
      {
        tag: "p",
        props: { className: "text" },
        children: [
          "De acordo com a LC 575-2012, são atribuições da Defensoria Pública-Geral e da Subdefensoria Pública-Geral:"
        ],
      },
      {
        tag: "h4",
        props: { className: "subtitle" },
        children: ["Do Conselho Superior"],
      },
      {
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "1.5em", marginTop: "1em" }
        },
        children: ["Art. 15. O Conselho Superior da Defensoria Pública tem a seguinte composição:"]
      },
      ...[
        "I - membros natos:",
        "a) Defensor Público-Geral;",
        "b) Subdefensor Público-Geral;",
        "c) Corregedor-Geral; e",
        "d) Ouvidor-Geral; e",
        "II - membros eleitos: 5 (cinco) Defensores Públicos.",
        "§ 1º O Conselho Superior é presidido pelo Defensor Público-Geral, que terá voto de qualidade, exceto em matéria disciplinar.",
        "§ 2º Os membros referidos no inciso II do caput deste artigo serão eleitos dentre os representantes estáveis da carreira de Defensor Público, por voto direto, plurinominal, obrigatório e secreto de seus membros.",
        "§ 3º As eleições serão realizadas em conformidade com as instruções baixadas pelo Conselho Superior da Defensoria Pública.",
        "§ 4º Os membros do Conselho Superior são eleitos para mandato de 2 (dois) anos, mediante voto nominal, direto e secreto, permitida 1 (uma) reeleição.",
        "§ 5º São suplentes dos membros eleitos de que trata o caput deste artigo os demais votados, em ordem decrescente.",
        "§ 6º São elegíveis os membros estáveis da Defensoria Pública que não estejam afastados da carreira.",
        "§ 7º O presidente da associação estadual dos Defensores Públicos terá assento e voz nas reuniões do Conselho Superior."
      ].map(item => ({
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "3em", marginBottom: "0.4em" }
        },
        children: [item]
      })),
      {
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "1.5em", marginTop: "1em" }
        },
        children: ["Art. 16. Compete ao Conselho Superior exercer atividades consultivas, normativas e decisórias e especialmente:"]
      },
      ...[
        "I - exercer o poder normativo no âmbito da Defensoria Pública;",
        "II - opinar, por solicitação do Defensor Público-Geral, sobre matéria pertinente à autonomia funcional e administrativa da Defensoria Pública;",
        "III - elaborar lista tríplice destinada à promoção por merecimento;",
        "IV - aprovar a lista de antiguidade dos membros da Defensoria Pública e decidir sobre as reclamações a ela concernentes;",
        "V - recomendar ao Defensor Público-Geral a instauração de processo disciplinar contra membros e servidores da Defensoria Pública;",
        "VI - conhecer e julgar recurso contra decisão em processo administrativo disciplinar ou conflitos de atribuições entre os membros da Defensoria Pública;",
        "VII - decidir sobre pedido de revisão de processo administrativo disciplinar;",
        "VIII - decidir acerca da remoção voluntária dos integrantes da carreira da Defensoria Pública;",
        "IX - decidir sobre a avaliação do estágio probatório dos membros da Defensoria Pública, submetendo sua decisão à homologação do Defensor Público-Geral;",
        "X - decidir acerca da destituição do Corregedor-Geral, por voto de 2/3 (dois terços) de seus membros, assegurada ampla defesa;",
        "XI - deliberar sobre a organização de concurso para ingresso na carreira e designar os representantes da Defensoria Pública que integrarão a Comissão de Concurso;",
        "XII - organizar os concursos para provimento dos cargos da carreira de Defensor Público e editar os respectivos regulamentos;",
        "XIII - recomendar correições extraordinárias;",
        "XIV - indicar 3 (três) nomes dos membros da carreira, integrantes da primeira categoria, para que o Defensor Público-Geral nomeie, dentre estes, o Corregedor-Geral da Defensoria Pública;",
        "XV - editar as normas que regulamentam a eleição para Defensor Público-Geral;",
        "XVI - apreciar a proposta de criação ou de alteração do Regimento Interno da Defensoria Pública, submetida pelo Defensor Público-Geral; e",
        "XVII - decidir sobre o plano de atuação da Defensoria Pública, elaborado pelo Defensor Público-Geral."
      ].map(item => ({
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "3em", marginBottom: "0.4em" }
        },
        children: [item]
      })),
      ...[
        "§ 1º Caberá ao Conselho Superior aprovar o plano de atuação da Defensoria Pública, cujo projeto será precedido de ampla divulgação.",
        "§ 2º As decisões do Conselho Superior serão motivadas e publicadas e suas sessões deverão ser públicas, salvo nas hipóteses legais de sigilo, e realizadas, no mínimo, bimestralmente, podendo uma sessão ser convocada por qualquer conselheiro, caso não seja realizada dentro deste prazo.",
        "XVIII – decidir sobre a abrangência das regiões administrativas nas quais deverão atuar os Defensores Públicos Substitutos, proposta no plano de atuação de que trata o inciso XVII deste artigo. (Incluído pela LC 690, de 2017)."
      ].map(item => ({
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "3em", marginBottom: "0.4em" }
        },
        children: [item]
      }))
    ]
  }

  return (
    <>
      <StaticPageTemplate content={content} toPrint={true} />
    </>
  )
}

export default ResponsibilitiesSuperiorCouncil