import React, { useState } from "react";
import style from "./TableTabs.module.css";

type uniqueTabProps = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  hasButton?: {
    hasButtonIcon: React.ReactNode;
    hasButtonTitle: string;
    onClick?: () => void;
  };
};

type TabsProps = {
  tabs: uniqueTabProps[];
  defaultActiveTab?: string;
  customStyles?: { [key: string]: string };
};

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActiveTab, customStyles = {} }) => {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id || ""
  );
  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const getClass = (base: string) =>
    `${style[base] || ''} ${customStyles[base] || ''}`.trim();

  return (
    <>
      <div className={style.container}>
        {activeTabData?.hasButton && (
          <div className={style.hasButtonContainer}>
            <button
              className={style.hasButton}
              onClick={activeTabData.hasButton.onClick}
            >
              <span className={style.hasButtonIcon}>
                {activeTabData.hasButton.hasButtonIcon}
              </span>
              <p className={style.hasButtonTitle}>
                {activeTabData.hasButton.hasButtonTitle}
              </p>
            </button>
          </div>
        )}
        <div className={style.header}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${style.button} ${
                activeTab === tab.id ? style.buttonActive : ""
              }`}
            >
              {tab.icon && (
                <span
                  className={`${style.icon} ${
                    activeTab === tab.id ? style.titleActive : ""
                  }`}
                >
                  {tab.icon}
                </span>
              )}
              <p
                className={`${style.title} ${
                  activeTab === tab.id ? style.titleActive : ""
                }`}
              >
                {tab.label}
              </p>
            </button>
          ))}
        </div>
        <div className={`${style.content} ${getClass('contentTabs')}`}>{activeTabData?.content}</div>
      </div>
    </>
  );
};

export default Tabs;
