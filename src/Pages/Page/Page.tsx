import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchPages } from "../../Services/Slices/PagesSlice";
import styles from "./Page.module.css";
import News from "../News/News";
import Loading from "../../Components/Loading/Loading";
import FrequentsQuestions from "../FAQ/FrequentsQuestions";
import Posters from "../Posters/MainPostersPage";
import UnityAndCores from "../Support/UnityAndCores/UnityAndCores";
import style from "../../Components/Pages/News/NewsPage.module.css";
import DOMPurify from "dompurify";
import Cards from "../Cards/Cards";
import ModulesTable from "../../Components/ModulesTable/ModulesTable";
import {isLoggedIn} from "../../Auth/Auth";

function Page() {
    const dispatch = useDispatch<any>();
    const location = useLocation();

    const { data, loading, error } = useSelector((state: any) => state.pagesSlice);

    useEffect(() => {
        const currentPath = location.pathname;
        dispatch(fetchPages(currentPath));
    }, [dispatch, location.pathname]);

    const notFound = (
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

    if (loading) return <Loading size={100} type="spin" label="Carregando página..." />;
    if (error || !data) return notFound;
    if (data.status !== "published") return notFound;

    if (data.has_news) return <News />;
    if (data.has_faq) return <FrequentsQuestions />;
    if (data.has_posters) return <Posters />;
    if (data.has_cores) return <UnityAndCores />;

    if (data.text && (data.card || data.category)) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{data.title}</h1>

                    <div className={style.textContainer}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(data.text),
                            }}
                        />
                    </div>

                    {data.card && (
                        <div style={{ marginTop: "2rem" }}>
                            <Cards id={data.card} />
                        </div>
                    )}

                    {data.category && (
                        <div style={{ marginTop: "2rem" }}>
                            <ModulesTable categoryIds={[data.category]} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (data.card) return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{data.title}</h1>

                <div style={{ marginTop: "2rem" }}>
                    <Cards id={data.card} />
                </div>

            </div>
        </div>
    );
    if (data.category) return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{data.title}</h1>

                <div style={{ marginTop: "2rem" }}>
                    <ModulesTable categoryIds={[data.category]} />
                </div>

            </div>
        </div>
    );

    if (data.text) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{data.title}</h1>
                    <div className={style.textContainer}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(data.text),
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return notFound;
}

export default Page;
