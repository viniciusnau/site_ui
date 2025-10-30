import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./NewsCard.module.css";
import { fetchNews } from "../../Services/Slices/NewsSlice";
import Loading from "../Loading/Loading";

const NewsCard: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: any) => state.newsSlice);

  useEffect(() => {
    dispatch<any>(fetchNews("true", 1, 20)); 
  }, [dispatch]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR");
  };

  if (loading)
    return <Loading size={100} type="spin" label="Carregando notícias..." />;
  if (error) return <p>Erro ao carregar notícias.</p>;
  
  const newsItems = data?.results || []; 
  
  if (newsItems.length === 0) return <p>Nenhuma notícia encontrada.</p>;

  const mainNews = newsItems.find((item: any) => item.highlight === "main");
  const secondaryNews = newsItems.filter((item: any) => 
    item.highlight === "secondary");

  return (
    <div className={styles.newsContainer}>
      {!mainNews && secondaryNews.length === 0 && (
        <div className={styles.newsContent}>
          <p>Nenhuma notícia em destaque!</p>
        </div>
      )}
      {mainNews && (
        <Link
          to={`/comunicacao/noticias/${mainNews.slug}`}
          className={`${styles.newsCard} ${styles.mainNews}`}
        >
          <img
            src={mainNews.thumbnail}
            alt={mainNews.title}
            className={styles.thumbnail}
          />
          <div className={styles.newsContent}>
            <h2 className={styles.title}>{mainNews.title}</h2>
            <p className={styles.date}>{formatDate(mainNews.published_at)}</p>
          </div>
        </Link>
      )}

      {secondaryNews.length > 0 && (
        <div className={styles.secondaryContainer}>
          {secondaryNews.map((item: any) => (
            <Link
              key={item.id}
              to={`/comunicacao/noticias/${item.slug}`}
              className={`${styles.newsCard} ${styles.secondaryNews}`}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.thumbnail}
                />
                <div className={styles.dateContainer}>
                  <p className={styles.date}>{formatDate(item.published_at)}</p>
                </div>
              </div>

              <div className={styles.newsContent}>
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsCard;