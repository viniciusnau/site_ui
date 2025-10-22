import React, { Children } from 'react'
import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate'

function CompositionGeneralOversightOffice() {
    const data={
        tag: "div",
        props: {},
        children: [
            {
                tag: "h1",
                props: { className: "title"},
                children: ["Composição Corregedoria-Geral"]
            },
            {
                tag:"h3",
                props: { className: "subtitle"},
                children:["Corregedora-Geral"]
            },
            {
                tag: "p",
                props: { className: "text" },
                children: ["Michele do Carmo Lamaison"]
            },
            {
            tag: "ul",
            props: { className: "unorderedList",},
            children: [
            {
            tag: "p",
            props: { className: "line" },
            children: [
                { tag: "strong", children: ["Contatos: "] },
                {
                tag: "a",
                props: { href: "mailto:corregedoria@defensoria.sc.gov.br" },
                children: ["corregedoria@defensoria.sc.gov.br"]
                },
                " | 48 3665-6371"
            ]
        }
        ,]},]
    }
  return (
    <StaticPageTemplate content={data} toPrint={true}/>
  )
}

export default CompositionGeneralOversightOffice