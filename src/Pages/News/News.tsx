import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../Services/Slices/NewsSlice";
import { fetchTag } from "../../Services/Slices/TagSlice";
import Loading from "../../Components/Loading/Loading";
import styles from "./News.module.css";
import { Link } from "react-router-dom";

function News() {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state: any) => state.newsSlice);

    useEffect(() => {
        dispatch<any>(fetchNews("true"));
        dispatch<any>(fetchTag());
    }, [dispatch]);

    if (loading) return <Loading size={100} type="spin" label="Carregando notícias..." />;
    if (error) return <p>Erro ao carregar notícias.</p>;
    if (data.length === 0) return <p>Nenhuma notícia encontrada.</p>;

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("pt-BR");
    };

    return (
        <div className={styles.newsContainer}>
            <h1 className={styles.pageTitle}>Notícias</h1>

            {data.length > 0 ? (
                <div className={styles.newsGrid}>
                    {data.map((item: any) => (
                        <Link
                            key={item.id}
                            to={`/comunicacao/noticias/${item.slug}`}
                            className={styles.newsCard}
                        >
                            <img
                                src={item.thumbnail}
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
                <p>Nenhuma notícia encontrada.</p>
            )}
        </div>
    );
}

export default News;
