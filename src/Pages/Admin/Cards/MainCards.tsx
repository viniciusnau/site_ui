import React from "react";
import Tabs from "../../../Components/TableTabs/TableTabs";
import style from "./MainCards.module.css";
import CardRegister from "./Tabs/CardRegisterTab/CardRegister";
import Cards from "./Tabs/CardsTab/Cards";

function MainCards() {
    const tabs = [
    {
      id: "cards",
      label: "Cards",
      content: <Cards />,
    },
    {
      id: "cardRegister",
      label: "Registros",
      content: <CardRegister />,
    },
  ];
  return (
    <Tabs tabs={tabs} defaultActiveTab="cards" customStyles={style}></Tabs>
  );
}

export default MainCards;
