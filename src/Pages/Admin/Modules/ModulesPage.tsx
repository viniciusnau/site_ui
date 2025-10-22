import React from 'react'
import Tabs from "../../../Components/TableTabs/TableTabs";
import Category from "./Category/Category";
import Subcategory from "./Subcategory/Subcategory";
import Records from "./Records/Records"

function ModulesPage() {
    const tabs = [
    {
      id: "category",
      label: "Categorias",
      content: <Category />,
    },
    {
      id: "sub_category",
      label: "Sub Categorias",
      content: <Subcategory />,
    },
    {
        id: "records",
        label: "Cadastros",
        content: <Records/>
    }
  ];


  return (
    <>
    <Tabs tabs={tabs} defaultActiveTab="category"></Tabs>
    </>
  );
}

export default ModulesPage