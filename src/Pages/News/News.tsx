import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { fetchNews } from "../../Services/Slices/NewsSlice";
import Loading from "../../Components/Loading/Loading";
import styles from "./News.module.css";
import { Link } from "react-router-dom";

function News() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: any) => state.newsSlice);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        dispatch<any>(fetchNews("true", currentPage, pageSize));
    }, [dispatch, currentPage]);

    const totalPages = data?.count ? Math.ceil(data.count / pageSize) : 0;

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <Loading size={100} type="spin" label="Carregando notícias..." />;
    if (error) return <p>Erro ao carregar notícias.</p>;
    
    const newsItems = data?.results || [];
    
    if (newsItems.length === 0) return <p>Nenhuma notícia encontrada.</p>;

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("pt-BR");
    };

    return (
        <div className={styles.newsContainer}>
            <h1 className={styles.pageTitle}>Notícias</h1>

            <div className={styles.newsGrid}>
                {newsItems.map((item: any) => (
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

            {data && data.count > 0 && (
                <div className={styles.paginationContainer}>
                    <div className={styles.paginationInfo}>
                       
                    </div>
                    
                    <Pagination 
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        
                        size="large"
                        showFirstButton
                        showLastButton
                        sx={{
                        '& .MuiPaginationItem-root': {
                        color: '#2e7d32', 
                        border: '1px solid #4caf50',
                        '&:hover': {
                            backgroundColor: '#e8f5e9',
                        },
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: '#4caf50', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#388e3c', 
                        },
                        },
                        '& .MuiPaginationItem-root.Mui-disabled': {
                        color: '#a5d6a7',
                        }
                    }}
                    />
                </div>
            )}
        </div>
    );
}

export default News;