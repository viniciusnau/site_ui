import React from 'react'
import styles from './DutiesOfDefensoria.module.css'
import CardButton from '../../../Components/CardButton/CardButton'

function DutiesOfDefensoria() {
    const data =[
        {
            title: "Controle - Atribuições - Atualizada até Del. 103-2023 e Man. 234-2023",
            content: [{
                date: "29/11/2023",
                download: true,
                file: {
                    url: "/Control.xlsx",
                    name: "controle_atribuicoes.xlsx",
                },
            }],
        },
    ]
  return (
    <div className={styles.container}>
        <div className={styles.cardsContainer}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Downloads</h1>
            </div>
            <CardButton cards={data}/>
        </div>
    </div>
  )
}

export default DutiesOfDefensoria