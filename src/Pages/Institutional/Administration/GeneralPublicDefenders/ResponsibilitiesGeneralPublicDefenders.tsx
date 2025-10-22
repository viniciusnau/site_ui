import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'

function ResponsibilitiesGeneralPublicDefenders() {
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
        children: ["Atribuições Administração Superior"],
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
        children: ["Do Defensor Público-Geral"],
      },
      {
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "1.5em", marginTop: "1em" }
        },
        children: ["Art. 9º O Defensor Público-Geral será nomeado pelo Chefe do Poder Executivo, dentre membros estáveis da carreira e maiores de 35 (trinta e cinco) anos, escolhidos em lista tríplice formada pelo voto direto, secreto, plurinominal e obrigatório de seus membros, para mandato de 2 (dois) anos, permitida 1 (uma) recondução."]
      },

      ...["§ 1º O Conselho Superior da Defensoria Pública editará as normas regulamentando a eleição para a escolha do Defensor Público-Geral.",
        "§ 2º Caso o Chefe do Poder Executivo não efetive a nomeação do Defensor Público-Geral nos 15 (quinze) dias que se seguirem ao recebimento da lista tríplice, será investido automaticamente no cargo o Defensor Público mais votado para exercício do mandato.",
        "§ 3º O Defensor Público nomeado para o cargo de Defensor Público-Geral perceberá seu subsídio acrescido de gratificação pelo exercício do cargo, pessoal e transitória, no percentual de 30% (trinta por cento) sobre o subsídio pago ao Defensor Público da primeira categoria.",
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
        children: ["Art. 10. São atribuições do Defensor Público-Geral, dentre outras:"]
      },

      ...[
        "I - dirigir a Defensoria Pública, superintender e coordenar suas atividades e orientar-lhe a atuação;",
        "II - representar a Defensoria Pública judicial e extrajudicialmente;",
        "III - velar pelo cumprimento das finalidades da Instituição;",
        "IV - integrar, como membro nato, e presidir o Conselho Superior da Defensoria Pública;",
        "V - submeter ao Conselho Superior proposta de criação ou de alteração do Regimento Interno da Defensoria Pública;",
        "VI - autorizar os afastamentos dos membros da Defensoria Pública;",
        "VII - estabelecer a lotação e a distribuição dos membros e dos servidores da Defensoria Pública;",
        "VIII - dirimir conflitos de atribuições entre membros da Defensoria Pública, com recurso para seu Conselho Superior;",
        "IX - proferir decisões nas sindicâncias e processos administrativos disciplinares promovidos pela Corregedoria-Geral da Defensoria Pública;",
        "X - instaurar processo disciplinar contra membros e servidores da Defensoria Pública, por recomendação de seu Conselho Superior;",
        "XI - abrir concursos públicos para ingresso na carreira da Defensoria Pública;",
        "XII - determinar correições extraordinárias;",
        "XIII - praticar atos de gestão administrativa, financeira e de pessoal;",
        "XIV - convocar o Conselho Superior da Defensoria Pública;",
        "XV - designar membro da Defensoria Pública para exercício de suas atribuições em órgão de atuação diverso do de sua lotação ou, em caráter excepcional, perante Juízos, Tribunais ou Ofícios diferentes dos estabelecidos para cada categoria;",
        "XVI - requerer a qualquer autoridade pública e seus agentes certidões, exames, perícias, vistorias, diligências, processos, documentos, informações, esclarecimentos e demais providências necessárias à atuação da Defensoria Pública;",
        "XVII - aplicar a pena de remoção compulsória, aprovada pelo voto de 2/3 (dois terços) do Conselho Superior da Defensoria Pública, assegurada ampla defesa;",
        "XVIII - delegar atribuições à autoridade que lhe seja subordinada, na forma desta Lei Complementar;",
        "XIX - requerer força policial para assegurar a incolumidade física dos membros da Defensoria Pública, quando estes se encontrarem ameaçados em razão do desempenho de suas atribuições institucionais; e",
        "XX - apresentar plano de atuação da Defensoria Pública ao Conselho Superior.",
      ].map(item => ({
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "3em", marginBottom: "0.4em" }
        },
        children: [item]
      })),

      {
        tag: "h4",
        props: { className: "subtitle", style: { paddingLeft: "1em", marginTop: "1.5em" } },
        children: ["Subseção II"],
      },
      {
        tag: "h4",
        props: { className: "subtitle", style: { paddingLeft: "2em", marginTop: "1.5em" } },
        children: ["Do Subdefensor Público-Geral"],
      },

      ...[
        "Art. 11. O Subdefensor Público-Geral será nomeado pelo Defensor Público-Geral dentre integrantes estáveis da carreira e maiores de 35 (trinta e cinco) anos e o substituirá em suas faltas, licenças, férias e impedimentos.",
        "§ 1º O Subdefensor Público-Geral terá suas atribuições definidas no Regimento Interno da Defensoria Pública.",
        "§ 2º O Defensor Público nomeado para o cargo de Subdefensor Público-Geral perceberá seu subsídio acrescido de gratificação pelo exercício do cargo, pessoal e transitória, no percentual de 25% (vinte e cinco por cento) sobre o subsídio pago ao Defensor Público da primeira categoria.",
      ].map(item => ({
        tag: "p",
        props: {
          className: "text",
          style: { paddingLeft: "3em", marginBottom: "0.5em" }
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

export default ResponsibilitiesGeneralPublicDefenders
