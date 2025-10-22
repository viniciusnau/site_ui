import React from "react";
import ModulesTable from "../../../Components/ModulesTable/ModulesTable";
import style from "./Teste.module.css";
import { Undo2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function Teste() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const categoryId = id ? Number(id) : undefined;

  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleGoBack}>
        <Undo2 size={38} />
      </button>
        <ModulesTable categoryIds={categoryId} />
    </div>
  );
}

export default Teste;
