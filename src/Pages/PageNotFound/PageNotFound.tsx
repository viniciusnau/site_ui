import React from 'react'
import styles from './PageNotFound.module.css'

function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Página não encontrada!</h1>
        <p className={styles.text}>O caminho que você tentou acessar não está disponível.<br/>
        Volte para a página inicial para continuar.</p>
      </div>
    </div>
  )
}

export default PageNotFound