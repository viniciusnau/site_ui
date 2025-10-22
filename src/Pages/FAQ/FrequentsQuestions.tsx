import React, { useEffect } from "react";
import FAQ from "../../Components/FAQ/FAQ";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import style from "./FrequentsQuestions.module.css";
import { fetchFaq } from "../../Services/Slices/FAQSlice";


function FrequentsQuestions() {
  const dispatch = useDispatch();
  
  const { data, loading, error } = useSelector((state: any) => state.FAQSlice);

  useEffect(() => {
    dispatch<any>(fetchFaq("true"));
  }, [dispatch]);

  if (loading) return <Loading size={100} type="spin" label="Carregando Perguntas..." />;
  if (error) return <p>Erro ao carregar perguntas.</p>;
  if (data.length === 0) return <p>Nenhuma pergunta encontrada.</p>;

    
  
  return (
  
      <div className={style.faqContainer}>
        <div className={style.faqLimitContainer}>
          <FAQ title="Perguntas frequentes" content={data} />
        </div>
      </div>
    
  );
}


export default FrequentsQuestions;
