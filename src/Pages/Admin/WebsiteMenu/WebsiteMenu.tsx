import React from "react";
import Tabs from "../../../Components/TableTabs/TableTabs";
import Banner from "./Tabs/Banner/Banner";
import Container from "./Tabs/Container/Container";
import ServiceButtonsAdmin from "./Tabs/ServiceButtons/ServiceButtonsAdmin";
import QuickAccessButtonsAdmin from "./Tabs/QuickAccessButtons/QuickAccessButtonsAdmin";

function MainNews() {
  const tabs = [
    {
      id: "banner",
      label: "Banner",
      content: <Banner />,
    },
    {
      id: "container",
      label: "Containers",
      content: <Container />,
    },
    {
      id: "serviceButtons",
      label: "Botões de Atendimento",
      content: <ServiceButtonsAdmin/>,
    },
    {
      id: "quickAccessButtons",
      label: "Botões de Acesso rápido",
      content: <QuickAccessButtonsAdmin/>,
    },
  ];
  return <Tabs tabs={tabs} defaultActiveTab="banner"></Tabs>;
}

export default MainNews;
