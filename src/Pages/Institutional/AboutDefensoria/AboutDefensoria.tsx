import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate'
import styles from './AboutDefensoria.module.css'


function AboutDefensoria() {
const content = {
  tag: "div",
  props: {
    className: styles.container,
  },
  children: [
    {
      tag: "h1",
      props: { className: styles.title},
      children: ["SOBRE A DEFENSORIA"],
    },
    {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["O que é? Para quem é?"],
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        `A Defensoria Pública é uma instituição constitucional autônoma, permanente e essencial à função jurisdicional do Estado. Como expressão e instrumento do regime democrático, à Defensoria Pública incumbe a orientação jurídica, a promoção dos direitos humanos e a defesa, em todos os graus, judicial e extrajudicial, dos direitos individuais e coletivos, de forma integral e gratuita, às pessoas em situação de vulnerabilidade.
A instituição tem a função de cumprir o dever do Estado previsto no inciso LXXIV do artigo 5º e no artigo 134 da Constituição Federal, de prestar orientação e assistência jurídica integral e gratuita aos cidadãos e aos grupos hipossuficientes economicamente ou que estejam em situação de vulnerabilidade. 
Os defensores e defensoras públicas são profissionais da área Direito e ingressam na Defensoria Pública com, no mínimo, três anos de experiência, por meio de aprovação em um rigoroso concurso público. 
Por tudo isso, o Defensor Público tem funções e objetivos institucionais mais diversificados, atuando como verdadeiro agente político dinamizador da cidadania e da justiça social, e com isto servindo como verdadeiro instrumento de transformação social.`,
      ],
    },
    {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["Quem tem direito ao atendimento pela Defensoria?"],
    },
    {
      tag: "p",
      props: { className: styles.text},
      children: [
        `Todas as pessoas que não possuem condições financeiras de contratar um advogado e pagar as despesas de um processo judicial, sem prejuízo do seu sustento e de sua família.
Em processos criminais, por força do princípio constitucional da ampla defesa, qualquer pessoa poderá ter sua defesa patrocinada pela Defensoria Pública, independentemente de sua condição econômica.
As pessoas jurídicas em dificuldades financeiras, como as microempresas, também podem utilizar o serviço da Defensoria. Do mesmo modo, as entidades sem fins lucrativos e associações comunitárias, desde que não tenham recursos suficientes para a defesa de seus direitos por meio da contratação de advogado.`,
      ],
    },
     {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["A Defensoria Pública cobra algum valor pelos serviços?"],
    },
     {
      tag: "p",
      props: { className: styles.text},
      children: [
        `Não. O serviço público de assistência jurídica integral prestado pela Defensoria Pública é totalmente gratuito. 
A Defensoria garante os direitos do cidadão que não pode contratar um advogado para a defesa de seus interesses.
HISTÓRICO DA INCLUSÃO DA DEFENSORIA PÚBLICA NA CONSTITUIÇÃO BRASILEIRA 
 
A Defensoria Pública, como instituição pública de matriz constitucional, apenas surgiu com a Constituição da República de 1988. Apesar de prevista na redação originária do art. 134 da Constituição da República de 1988, a maioria dos Estados brasileiros omitiu-se em estruturar a Defensoria Pública de forma a garantir que o direito fundamental de acesso à justiça fosse, efetivamente, assegurado a todas as pessoas necessitadas. Em verdade, o Estado sonegava este direito fundamental para a maioria dos necessitados.
 
Neste cenário, o Constituinte derivado percebeu que, para dar efetividade ao comando constitucional, era necessário fortalecer a Defensoria Pública e desatar as amarras que retardam a sua expansão. Assim que, quando da &#147;Reforma do Judiciário&#148; implementada pela Emenda Constitucional nº 45, de 30 de dezembro de 2004, foi constitucionalizada a autonomia funcional e administrativa da Defensoria Pública, fixando-lhe, ainda, a prerrogativa de iniciativa de sua proposta orçamentária, conforme a redação dada ao § 2º, inserido no artigo 134 da Constituição Federal.
 
Em 04 de junho de 2014 foi promulgada a Emenda Constitucional nº 80, conhecida como PEC da &#147;Defensoria para Todos&#148;, que trouxe nova redação para o caput do artigo 134 da Carta Magna e nele incluiu o § 4º, determinando que seja aplicado à Defensoria Pública, no que couber, as regras da Magistratura, inclusive a inciativa de proposta de lei sobre questões específicas que afetem a organização e autonomia da Instituição (art. 93 e no inciso II do art. 96 da CRFB). Esta emenda, além de reforçar à autonomia da Defensoria Pública e a independência funcional de seus membros, ampliou o seu âmbito de atribuições, nele inserindo a atuação extrajudicial, a defesa dos direitos coletivos e a função de promover os direitos humanos. A referida emenda também determinou que, até o ano de 2.022, os Estados disponibilizem Defensores Públicos em todas as unidades jurisdicionais, de forma proporcional a demanda do serviço. `,
      ],
    },
    {
      tag: "h4",
      props: { className: styles.subtitle},
      children: ["HISTÓRICO DA DEFENSORIA PÚBLICA NO ESTADO DE SANTA CATARINA "],
    },
     {
      tag: "p",
      props: { className: styles.text},
      children: [
        `A Constituição do Estado de Santa Catarina, promulgada em 05 de outubro de 1989, previa, em seu art. 104, que a Defensoria Pública seria exercida pela &#147;Defensoria Dativa e Assistência Judiciária Gratuita&#148;, nos termos de lei complementar. A Lei Complementar Estadual n.º 155 de 15 de abril de 1997 estruturou a Defensoria Dativa estabelecendo que sua organização ficaria a cargo da Ordem dos Advogados do Brasil, Seção de Santa Catarina &#150; OAB/SC. Já a Lei Complementar Estadual n.º 391 de 18 de outubro de 2007 previu que a Defensoria Dativa seria subsidiada por um fundo denominado de &#147;Fundo Especial da Defensoria Dativa &#150; FUNDEFEN&#148;.

No ano de 2006 nasce o Movimento pela Criação da Defensoria Pública no Estado de Santa Catarina, que teve a participação do curso de Direito da Universidade Comunitária da Região de Chapecó (UNOCHAPECÓ), através de Projeto de Extensão Comunitária Jurídica (PecJur), realizado em conjunto com os cursos de Serviço Social e Ciências Econômicas. O Movimento promoveu inúmeros seminários e chegou a protocolar na Assembleia Legislativa Projeto de Lei de Iniciativa Popular, primeiro do Estado, com mais de 50 (cinquenta) mil assinaturas, com o apoio e engajamento de diversas entidades e organismos sociais catarinenses, a exemplo de sindicatos, associações profissionais, entidades religiosas, instituições de ensino e cidadãos catarinenses.
 
O Movimento também mobilizou a Associação Nacional dos Defensores Públicos Federais (ANADEF) e a Associação Nacional dos Defensores Públicos (ANADEP) a ingressarem no Supremo Tribunal Federal com ações diretas para declarar a inconstitucionalidade do modelo catarinense de Defensoria Dativa. As referidas associações propuseram as Ações Diretas de Inconstitucionalidade nºs 3.892 e 4.270, respectivamente, que foram julgadas procedentes pelo Supremo Tribunal Federal, com o efeito de declarar a inconstitucionalidade do modelo de Defensoria Dativa e determinar a estruturação da Defensoria Pública em Santa Catarina de acordo com a Constituição de 1988 e em estrita observância à Lei Complementar federal nº 80/1994 (que estabelece as normas gerais que regem as Defensorias Públicas). Abaixo, cita-se a ementa da referida decisão: &#147;Ementa: Art. 104 da constituição do Estado de Santa Catarina. Lei complementar estadual 155/1997. Convênio com a seccional da Ordem dos Advogados do Brasil (OAB/SC) para prestação de serviço de &#147;defensoria pública dativa&#148;. Inexistência, no Estado de Santa Catarina, de órgão estatal destinado à orientação jurídica e à defesa dos necessitados. Situação institucional que configura severo ataque à dignidade do ser humano. Violação do inc. LXXIV do art. 5º e do art. 134, caput, da redação originária da Constituição de 1988. Ações diretas julgadas procedentes para declarar a inconstitucionalidade do art. 104 da constituição do Estado de Santa Catarina e da lei complementar estadual 155/1997 e admitir a continuidade dos serviços atualmente prestados pelo Estado de Santa Catarina mediante convênio com a OAB/SC pelo prazo máximo de 1 (um) ano da data do julgamento da presente ação, ao fim do qual deverá estar em funcionamento órgão estadual de defensoria pública estruturado de acordo com a Constituição de 1988 e em estrita observância à legislação complementar nacional (LC 80/1994). &#147;(ADI 4270, Relator  Ministro Joaquim Barbosa, Tribunal Pleno, julgado em 14/03/2012). 

Em decorrência desta decisão, foi criada a Defensoria Pública do Estado de Santa Catarina através da aprovação da Emenda Constitucional estadual nº 62/2012, que adequou o art. 104 da Constituição do Estado de Santa Catarina ao art. 134 da Constituição da República, e da aprovação da Lei Complementar Estadual n.º 575, de 02 de agosto de 2012, que dispõe sobre a sua organização e funcionamento no Estado.

A universalização do modelo constitucional de assistência jurídica gratuita para toda a população vulnerável de Santa Catarina depende da criação de mais cargos de Defensora ou Defensor Público.  `,
      ],
    },
  ],
};

  return (  <>
            <StaticPageTemplate content={content}  toPrint={true}/>
        </>
  )
}

export default AboutDefensoria