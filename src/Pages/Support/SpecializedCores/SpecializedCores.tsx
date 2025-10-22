import React from 'react'
import CardButton from '../../../Components/CardButton/CardButton';
import styles from './SpecializedCores.module.css'

function SpecializedCores() {  
    const data = [
        {
        title: "NIJID – Núcleo da Infância e Juventude, Direitos da Pessoa Idosa e da Pessoa com Deficiência",
        content: [{ 
            description: `Coordenadora: Mariana Carvalho dos Santos Macêdo Email: nijid@defensoria.sc.def.br   Critica-se muito algumas das previsões contidas no Estatuto da Criança e do Adolescente – ECA (Lei nº 8.069/90), como se não tivessem alcançado o seu escopo, mas deixa-se de considerar a... `, 
            seeMore: true, 
            link:"/nucleo-da-infancia-e-juventude-direitos-da-pessoa-idosa-e-da-pessoa-com-deficiencia" },
        ],
        },
        {
        title: "NUCIDH – Núcleo de Cidadania, Igualdade, Diversidade, Direitos Humanos e Coletivos",
        content: [{ 
            description: `Coordenadora: Defensora Pública Ana Paula Berlatto Fão Fischer Email: nucidh@defensoria.sc.def.br   Os direitos humanos consistem em um conjunto de direitos considerados imprescindíveis para uma vida digna, pautada na liberdade e igualdade. A Defensoria Pública tem como... `, 
            seeMore: true, 
            link:"/nucleo-de-cidadania-igualdade-diversidade-direitos-humanos-e-coletivos" }],
        },
        {
        title: "NUDECONCI – Núcleo Especializado de Defesa do Consumidor e Apoio Cível",
        content: [{ 
            description: `   Conheça o Núcleo de Defesa do Consumidor da Defensoria Pública do Estado de Santa Catarina Você sabia que a Defensoria Pública do Estado de Santa Catariana conta com uma equipe de apoio especializado que pode te auxiliar a resolver questões de consumo que impactam diretamente o seu... `, 
            seeMore: true, 
            link:"/nucleo-especializado-de-defesa-do-consumidor-e-apoio-civel" }],
        },
        {
        title: "NUDEM – Núcleo de Promoção e Defesa dos Direitos das Mulheres",
        content: [{ 
            description: `Coordenadora: Defensora pública Anne Teive Auras Email: nudem@defensoria.sc.def.br   Mais da metade da população brasileira é composta por mulheres. Apesar disso, em termos de exercício de direitos, as mulheres brasileiras podem ser consideradas minoria: vivem constantes... `, 
            seeMore: true, 
            link:"/nucleo-de-promocao-e-defesa-dos-direitos-das-mulheres" }],
        },
        {
        title: "NUHAB - Núcleo de Habitação, Moradia e Direito à Cidade",
        content: [{ 
            description: `Coordenador: Defensor Público Marcelo Scherer da Silva Email: nuhab@defensoria.sc.def.br   O Brasil é palco de muitas desigualdades, milhões de brasileiros têm seu direito à moradia violado, estimando-seum déficit habitacional de mais de 7,8 milhões de moradias (dados do... `, 
            seeMore: true, 
            link:"/nucleo-de-habitacao-moradia-e-direito-a-cidade" }],
        },
        {
        title: "NUPEP – Núcleo Especializado de Política Criminal e Execução Penal",
        content: [{ 
            description: `Coordenador: Defensor Público Renê Beckmann Johann Júnior E-mail: nupep@defensoria.sc.def.br   A população carcerária brasileira é formada em sua maioria por jovens, com baixa taxa de escolaridade e provenientes de família de baixa renda. Conforme relatório do Banco Nacional de... `, 
            seeMore: true, 
            link:"/nucleo-especializado-de-politica-criminal-e-execucao-penal" }],
        },
    ];

  return (<>
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Núcleos Especializados</h1>
                </div>
                <CardButton cards={data}/>
            </div>
        </div>
    </>
  )
}

export default SpecializedCores