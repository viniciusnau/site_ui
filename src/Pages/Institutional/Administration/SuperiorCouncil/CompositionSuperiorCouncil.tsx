import StaticPageTemplate from '../../../../Components/StaticPageTemplate/StaticPageTemplate';

function CompositionSuperiorCouncil() {
    const content = {
        tag: "div",
        props: {
            className: "container",
            style: { textAlign: "initial", lineHeight: 1.5 }
        },
        children: [
            {
                tag: "h1",
                props: { className: "title" },
                children: ["Composição Conselho Superior"],
            },
            {
                tag: "h2",
                props: { className: "subtitle" },
                children: ["COMPOSIÇÃO DO CONSELHO SUPERIOR - 2024-2026"],
            },
            {
                tag: "h3",
                props: { className: "subtitle" },
                children: ["Membros/as Natos/as"],
            },
            {
                tag: "ul",
                props: { className: "unorderedList" },
                children: [
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensor Público-Geral: "] },
                            "Ronaldo Francisco"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Subdefensor Público-Geral: "] },
                            "Thiago Burlani Neves"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Corregedora-Geral: "] },
                            "Michele do Carmo Lamaison"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Ouvidora-Geral: "] },
                            "Maria Aparecida Lucca Caovilla"
                        ]
                    },
                ]
            },
            {
                tag: "h3",
                props: { className: "subtitle" },
                children: ["Membros/as Eleitos/as"],
            },
            {
                tag: "ul",
                props: { className: "unorderedList" },
                children: [
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensora Pública: "] },
                            "Juliane Schlichting"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensora Pública: "] },
                            "Suzi Comelli Boing"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensor Público: "] },
                            "Pedro Ramos Lyra da Silva"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensor Público: "] },
                            "Daniel Deggau Bastos"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensor Público: "] },
                            "Jorge Calil Canut Neto"
                        ]
                    },
                ]
            },
            {
                tag: "h3",
                props: { className: "subtitle" },
                children: ["Presidente da Entidade de Classe - ADEPESC"],
            },
            {
                tag: "ul",
                props: { className: "unorderedList" },
                children: [
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensor Público: "] },
                            "João Joffily Coutinho"
                        ]
                    },
                ]
            },
            {
                tag: "h3",
                props: { className: "subtitle" },
                children: ["Membros/as Eleitos/as Suplentes"],
            },
            {
                tag: "ul",
                props: { className: "unorderedList" },
                children: [
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensora Pública: "] },
                            "Fernanda Menezes"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensor Público: "] },
                            "Anderson de Oliveira Euriques"
                        ]
                    },
                    {
                        tag: "p",
                        props: { className: "line" },
                        children: [
                            { tag: "strong", children: ["Defensor Pública: "] }, // Note: changed "Defensor Pública" to match existing text
                            "Alessandro Cantelli de Souza"
                        ]
                    },
                ]
            },
            {
                tag: "p",
                props: { className: "text" },
                children: [
                    { tag: "strong", children: ["Contato: "] },
                    {
                        tag: "a",
                        props: { href: "mailto:conselhosuperior@defensoria.sc.gov.br" },
                        children: ["conselhosuperior@defensoria.sc.gov.br"]
                    }
                ],
            },
        ],
    };

    return (
        <>
            <StaticPageTemplate content={content}  toPrint={true}/>
        </>
    );
}

export default CompositionSuperiorCouncil;