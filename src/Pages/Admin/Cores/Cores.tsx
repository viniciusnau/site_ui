import React from "react";
import Tabs from "../../../Components/TableTabs/TableTabs";
import style from "./Cores.module.css"
import Nucleos from "./Tabs/nucleos/Nucleos";
import Unidades from "./Tabs/unidades/Unidades";
import AreasDeAtribuicao from "./Tabs/areasDeAtribuicao/AreasDeAtribuicao";
import TiposDeAtendimento from "./Tabs/tiposDeAtendimento/TiposDeAtendimento";

function Cores() {

   const tabs = [
    {
      id: "nucleos",
      label: "Núcleos",
      content: <Nucleos />,
    },
    {
      id: "unidades",
      label: "Unidades",
      content: <Unidades />,
    },
    {
      id: "areasDeAtribuicao",
      label: "Áreas de atribuição",
      content: <AreasDeAtribuicao/>,
    },
    {
      id: "tiposDeAtendimento",
      label: "Tipos de atendimento",
      content: <TiposDeAtendimento/>,
    },
  ];
  return (
    <>
      <Tabs
        tabs={tabs}
        defaultActiveTab="nucleos"
        customStyles={style}
      />
    </>
  );
}

export default Cores;
