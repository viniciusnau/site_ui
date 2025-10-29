import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchPages } from "../../Services/Slices/PagesSlice";
import styles from "./Page.module.css";

function Page() {
    const dispatch = useDispatch<any>();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        dispatch(fetchPages(currentPath));
    }, [dispatch, location.pathname]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Página não encontrada!</h1>
                <p className={styles.text}>
                    O caminho que você tentou acessar não está disponível.
                    <br />
                    Volte para a página inicial para continuar.
                </p>
            </div>
        </div>
    );
}

export default Page;
