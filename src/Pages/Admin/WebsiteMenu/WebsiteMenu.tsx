import React from "react";
import Tabs from "../../../Components/TableTabs/TableTabs";
import Banner from "./Tabs/Banner/Banner";
import Container from "./Tabs/Container/Container";
import ServiceButtonsAdmin from "./Tabs/ServiceButtons/ServiceButtonsAdmin";
import QuickAccessButtonsAdmin from "./Tabs/QuickAccessButtons/QuickAccessButtonsAdmin";
import MainHeaderAdminPage from "./Tabs/MainHeaderAdminPage/MainHeaderAdminPage";
function MainNews() {
  const tabs = [
    { id: "banner", label: "Banner", content: <Banner /> },
    { id: "container", label: "Containers", content: <Container /> },
    {
      id: "serviceButtons",
      label: "Botões de Atendimento",
      content: <ServiceButtonsAdmin />,
    },
    {
      id: "quickAccessButtons",
      label: "Botões de Acesso rápido",
      content: <QuickAccessButtonsAdmin />,
    },
    { id: "header", label: "Cabeçalho", content: <MainHeaderAdminPage /> },
  ];
  return <Tabs tabs={tabs} defaultActiveTab="banner"></Tabs>;
}
export default MainNews;
