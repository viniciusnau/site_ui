
import React from 'react';
import StaticPageTemplate from '../../../Components/StaticPageTemplate/StaticPageTemplate';
import image from '../../../Assets/nudeconci_logo.jpg';
import DocumentBrowser from '../../../Components/Search/DocumentBrowser/DocumentBrowser';
import { FilterOption } from '../../../Components/Search/FilterType/FilterTypeSelector'; 
import { IDocument } from '../../../Components/Helper';


const allDocuments: IDocument[] = [
  {
    type: "Material de Apoio",
    title: "GOLPES E FRAUDES NAS RELAÇÕES DE CONSUMO: PREVENÇÃO, DIAGNÓSTICO E SOLUÇÕES",
    date: "03/06/2025",
    downloadLink: "/files/Nudeconci/GOLPES_E_FRAUDES_NAS_RELAOES_DE_CONSUMO__PREVENAO_DIAGNOSTICO_E_SOLUOES_683f2b2b82a59.pdf",
    accessChannelsText: "Acesse nossos canais.",
  },
  {
    type: "Cartilhas",
    title: "CARTILHA MATERIAL ESCOLAR: SEUS DIREITOS",
    date: "03/06/2025",
    downloadLink: "/files/Nudeconci/cartilha_material_escolar_683f2c521e797.pdf",
  },
  {
    type: "Material de Apoio",
    title: "DIREITOS DO CONSUMIDOR PARA CONHECER",
    date: "03/06/2025",
    downloadLink: "/files/Nudeconci/Direitos_do_Consumidor_para_conhecer_683f2cd4087c6.pdf",
  },
  {
    type: "Nota Técnica",
    title: "NOTA TÉCNICA: PUBLICIDADE ABUSIVA NO MERCADO DE FORNECEDORES DE APOSTAS DE QUOTA FIXA",
    date: "03/06/2025",
    downloadLink: "/files/Nudeconci/Nota_Tecnica__Publicidade_Abusiva_no_mercado_de_fornecedores_do_servio_de_apostas_de_quota_fixa_683f2be97912c.pdf",
  },
  {
    type: "Boletins",
    title: "BOLETIM INFORMATIVO - EDIÇÃO 01/2025",
    date: "03/06/2025",
    downloadLink: "/files/Nudeconci/Boletim_12025_683f2ba5748e0.pdf",
  },
  {
    type: "Cartilhas",
    title: "FRAUDES CONTRA PESSOAS IDOSAS",
    date: "03/06/2025",
    downloadLink: "/files/Nudeconci/Fraudes_contra_Pessoas_Idosas_683f2c10b8ad8.pdf",
  },
];


const NudeconciFiltros: FilterOption[] = [
  { label: "Material de Apoio" },
  { label: "Cartilhas" },
  { label: "Nota Técnica" },
  { label: "Boletins" },
];

function Nudeconci() {
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
        children: ["Nudeconci"],
      },
      {
        tag: "div",
        props: {
          style: {
            display: "flex",
            justifyContent: "center"
          }
        },
        children: [
          {
            tag: "img",
            props: {
              src: image,
              alt: "Imagem do Nudeconci",
              style: { width: "20rem", marginBottom: "20px" }
            }
          }
        ]
      },      
      {
        tag: "p",
        children: [
          "Conheça o Núcleo de Defesa do Consumidor da Defensoria Pública do Estado de Santa Catarina."
        ]
      },
      {
        tag: "p",
        children: [
          "Você sabia que a Defensoria Pública do Estado de Santa Catarina conta com uma equipe de apoio especializado que pode te auxiliar a resolver questões de consumo que impactam diretamente o seu dia a dia?"
        ]
      },
      {
        tag: "h2",
        children: ["O que fazemos?"]
      },
      {
        tag: "p",
        children: [
          "Nosso trabalho é garantir que seus direitos sejam respeitados nas diferentes áreas de consumo. Atuamos em três frentes principais:"
        ]
      },
      {
        tag: "ul",
        children: [
          {
            tag: "li",
            children: [
              "Procedimentos Coletivos Extrajudiciais: Antes mesmo de levarmos um caso à Justiça, buscamos soluções que beneficiem vários consumidores ao mesmo tempo, tratando diretamente com empresas ou órgãos responsáveis."
            ]
          },
          {
            tag: "li",
            children: [
              "Ações Coletivas: Quando os direitos de um grupo de pessoas são violados, lutamos na Justiça para garantir que todos os prejudicados sejam reparados. Defendemos, por exemplo, consumidores que foram vítimas de cobranças abusivas, falhas na prestação de serviços ou produtos com defeito."
            ]
          },
          {
            tag: "li",
            children: [
              "Educação em Direitos: nosso compromisso vai além da resolução de problemas. Queremos que você conheça seus direitos e saiba como agir diante de uma situação de abuso. Por isso, investimos em campanhas educativas e orientações para o público."
            ]
          }
        ]
      },
      {
        tag: "h2",
        children: ["Por que isso é importante para você?"]
      },
      {
        tag: "p",
        children: [
          "No mundo de hoje, todos somos consumidores. Seja na compra de um produto, assinatura de um serviço, ou até mesmo na contratação de plataformas digitais, estamos constantemente expostos às relações de consumo. O Núcleo de Direito do Consumidor atua para garantir que essas relações sejam justas, equilibradas e seguras, protegendo você de práticas abusivas e assegurando o respeito aos seus direitos."
        ]
      },
      {
        tag: "h2",
        children: ["Participe, faça sua voz ser ouvida!"]
      },
      {
        tag: "p",
        children: [
          "Você sabia que pode ajudar a transformar a realidade de muitos outros consumidores? Ao trazer sua sugestão, dúvida ou compartilhar seu caso, você fortalece nossa missão de garantir um mercado mais justo. Estamos aqui para ouvir você! Quer saber mais sobre seus direitos? Acompanhe as redes sociais da Defensoria Pública, faça perguntas e relate situações abusivas. Um esclarecimento sobre uma dúvida sua, pode ser útil para outros consumidores. Um relato ou denúncia seu pode ajudar muita gente."
        ]
      },
      {
        tag: "h2",
        children: ["Contato"]
      },
      {
        tag: "ul",
        props: { className: "unorderedList" },
        children: [
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Endereço: "] },
              "Av. Rio Branco, 919, 9º andar, Centro, Florianópolis/SC, CEP 88015-200."
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Email: "] },
              {
                tag: "a",
                props: { href: "mailto:nudeconci@defensoria.sc.def.br" },
                children: ["nudeconci@defensoria.sc.def.br"]
              }
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Telefone/Whatsapp: "] },
              "48-99135-7453"
            ]
          },
          {
            tag: "p",
            props: { className: "line" },
            children: [
              { tag: "strong", children: ["Coordenador: "] },
              "Defensor Público Elcio Guerra Junior."
            ]
          }
        ]
      }
    ]
  };

  return (
    <>
      <StaticPageTemplate content={content} toPrint={false} />
            <DocumentBrowser documents={allDocuments} filterOptions={NudeconciFiltros} /> 
    </>
  );
}

export default Nudeconci;