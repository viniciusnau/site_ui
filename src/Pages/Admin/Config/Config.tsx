import React from "react";
import Tabs from "../../../Components/TableTabs/TableTabs";
import { User, Share2, Globe, Mail } from "lucide-react";
import style from "./Config.module.css";
import MeuPerfil from "./Tabs/MeuPerfil/MeuPerfil";
import InformacoesDoWebsite from "./Tabs/InformacoesDoWebsite/InformacoesDoWebsite";
import EnvioDeEmailsDoWebsite from "./Tabs/EnvioDeEmailsDoWebsite/EnvioDeEmailsDoWebsite";
import LinksParaRedesSociais from "./Tabs/LinksParaRedesSociais/LinksParaRedesSociais";

function Config() {
  const configTabs = [
    {
      id: "meuPerfil",
      label: "Meu Perfil",
      icon: <User />,
      content: <MeuPerfil />,
    },
    {
      id: "informacoesDoWebsite",
      label: "Informações do Website",
      icon: <Globe />,
      content: <InformacoesDoWebsite />,
    },
    {
      id: "linksParaRedesSociais",
      label: "Links para Redes Sociais",
      icon: <Share2 />,
      content: <LinksParaRedesSociais/>,
    },
    {
      id: "envioDeEmailsDoWebsite",
      label: "Envio de E-mails do Website",
      icon: <Mail />,
      content: <EnvioDeEmailsDoWebsite/>,
    },
  ];
  return (
    <>
      <Tabs
        tabs={configTabs}
        defaultActiveTab="meuPerfil"
        customStyles={style}
      />
    </>
  );
}

export default Config;
