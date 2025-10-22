import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosters } from "../../Services/Slices/PostersSlice";
import Loading from "../../Components/Loading/Loading";
import styles from "./MainPostersPage.module.css";
import { Link } from "react-router-dom";

function Posters() {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state: any) => state.postersSlice);

    useEffect(() => {
        dispatch<any>(fetchPosters());
    }, [dispatch]);

    if (loading) return <Loading size={100} type="spin" label="Carregando cartilhas..." />;
    if (error) return <p>Erro ao carregar cartilha.</p>;
    if (data.length === 0) return <p>Nenhuma cartilha encontrada.</p>;

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("pt-BR");
    };

    return (
        <div className={styles.newsContainer}>
            <h1 className={styles.pageTitle}>Cartilhas</h1>

            {data.length > 0 ? (
                <div className={styles.newsGrid}>
                    {data.map((item: any) => (
                        <Link
                            key={item.id}
                            to={`/servicos/cartilhas-e-revista/${item.slug}`}
                            className={styles.newsCard}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className={styles.thumbnail}
                            />
                            <div className={styles.newsContent}>
                                <h2 className={styles.title}>{item.title}</h2>
                                <p className={styles.date}>{formatDate(item.published_at)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>Nenhuma cartilha encontrada.</p>
            )}
        </div>
    );
}

export default Posters;
