import React from "react";
import styles from "./StaticPageTemplate.module.css"

type StaticNode = {
  tag: keyof HTMLElementTagNameMap | string;
  props?: Record<string, any>;
  children?: (string | StaticNode)[];
};

interface StaticPageProps {
  content: StaticNode;
  toPrint?: boolean;
}

const defaultClassMap: Record<string, string | undefined> = {
  div: styles.container,
  h1: styles.title,
  h2: styles.subtitle,
  h3: styles.subtitle,
  h4: styles.subtitle,
  p: styles.text,
  ol: styles.orderedList,
  ul: styles.unorderedList,
  a: `${styles.subtitle} ${styles.link}`,
  button: styles.button,
  'ta-imprimir': styles.imprimir,
  'button-imprimir': styles.btndownload,
  'ta-quebra': styles.quebra
};


const renderNode = (node: StaticNode | string): React.ReactNode => {
  if (typeof node === "string") return node;

  const { tag, props = {}, children = [] } = node;

  const defaultClass = defaultClassMap[tag] ?? "";
  const customClass = props.className ?? "";

  const className = `${defaultClass} ${customClass}`.trim();

  return React.createElement(
    tag,
    { ...props, className },
    ...children.map((child, index) => (
      <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
    ))
  );
};

const imprimirNode: StaticNode = {
  tag: "ta-imprimir",
  props: {
    className: "imprimir",
  },
  children: [
    {
      tag: "ta-quebra",
      props: { className: "quebra" },
    },
    {
      tag: "button-imprimir",
      props: {
        onClick: () =>  window.print(),
        className: "btndownload",
      },
      children: ["Imprimir"],
    },
  ],
};

const StaticPageTemplate: React.FC<StaticPageProps> = ({ content, toPrint = false }) => {
  const extendedContent: StaticNode = {
    ...content,
    children: [
      ...(content.children || []),
      ...(toPrint ? [imprimirNode] : []),
    ],
  };

  return <div id="print-area" className={styles.staticPage}>{renderNode(extendedContent)}</div>;
};

export default StaticPageTemplate;
