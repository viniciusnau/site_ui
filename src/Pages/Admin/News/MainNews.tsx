import React from "react";
import Tabs from "../../../Components/TableTabs/TableTabs";
import style from "./MainNews.module.css";
import Tag from "./Tabs/TagsTab/Tag";
import News from "./Tabs/NewsTab/News";

function MainNews() {
    const tabs = [
    {
      id: "news",
      label: "Notícias",
      content: <News />,
    },
    {
      id: "tag",
      label: "Tags",
      content: <Tag />,
    },
  ];
  return (
    <Tabs tabs={tabs} defaultActiveTab="news" customStyles={style}></Tabs>
  );
}

export default MainNews;
