import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCards } from "../../Services/Slices/CardsSlice";
import Loading from "../../Components/Loading/Loading";
import CardButton from "../../Components/CardButton/CardButton";
import style from "./Cards.module.css";

function Cards() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: any) => state.cardsSlice);

    useEffect(() => {
        if (id) dispatch<any>(fetchCards(id));
    }, [dispatch, id]);

    if (loading) return <Loading size={100} type="spin" label="Carregando cards..." />;
    if (error) return <p>Erro ao carregar cards.</p>;
    if (!data || !data.registers || data.registers.length === 0)
        return <p>Nenhum registro encontrado.</p>;

    const registers = data.registers.map((reg: any) => ({
        title: reg.title,
        content: [
            {
                description: reg.subtitle,
                seeMore: true,
                link: `/comunicacao/cards/${reg.slug}`,
            },
        ],
    }));

    return (
        <div className={style.container}>
            <h1 className={style.title}>{data.title}</h1>
            <div className={style.registersContainer}>
                <CardButton cards={registers} />
            </div>
        </div>
    );
}

export default Cards;
